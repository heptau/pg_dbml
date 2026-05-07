WITH
tables AS (
	SELECT
		n.nspname AS schema_name,
		c.relname AS table_name,
		c.oid AS table_oid,
		obj_description(c.oid) AS table_comment
	FROM pg_class AS c
	JOIN pg_namespace AS n ON n.oid = c.relnamespace
	WHERE c.relkind = 'r'
	  AND n.nspname NOT IN ('pg_catalog', 'information_schema')
	  AND n.nspname !~ '^pg_toast'
),
columns AS (
	SELECT
		t.table_oid,
		a.attname AS column_name,
		a.attnum AS ordinal_position,
		format_type(a.atttypid, a.atttypmod) AS data_type,
		NOT a.attnotnull AS is_nullable,
		pg_get_expr(d.adbin, d.adrelid) AS column_default,
		col_description(t.table_oid, a.attnum) AS column_comment,
		EXISTS (SELECT FROM pg_constraint WHERE conrelid = t.table_oid AND contype = 'p' AND a.attnum = ANY(conkey)) AS is_pk,
		EXISTS (SELECT FROM pg_constraint WHERE conrelid = t.table_oid AND contype = 'u' AND array_length(conkey,1) = 1 AND a.attnum = ANY(conkey)) AS is_unique
	FROM tables AS t
	JOIN pg_attribute AS a ON a.attrelid = t.table_oid
	LEFT JOIN pg_attrdef AS d ON d.adrelid = t.table_oid AND d.adnum = a.attnum
	WHERE a.attnum > 0 AND NOT a.attisdropped
),
columns_dbml AS (
	SELECT
		table_oid,
		string_agg(
			format('  "%I" %s%s',
				column_name,
				CASE WHEN data_type ~ ' ' THEN format('"%s"', data_type) ELSE data_type END,
				CASE WHEN is_pk OR NOT is_nullable OR is_unique OR column_default IS NOT NULL OR column_comment IS NOT NULL
					THEN
						' [' ||
						trim(trailing ', ' FROM concat_ws(', ',
							CASE WHEN is_pk THEN 'pk' END,
							CASE WHEN is_unique THEN 'unique' END,
							CASE WHEN NOT is_nullable THEN 'not null' END,
							CASE WHEN column_default IS NOT NULL
								THEN format('default: %s', replace(column_default, '"', '""'))
							END,
							CASE WHEN column_comment IS NOT NULL
								THEN format('note: %s',
									CASE WHEN column_comment ~ E'[\n\r]'
										THEN format('''''''%s''''''', replace(column_comment, '''', ''''''))
										ELSE format('''%s''', replace(column_comment, '''', ''''''))
									  END)
							  END
						))
						|| ']'
					ELSE ''
				END
			),
			E'\n'
			ORDER BY is_pk DESC, ordinal_position
		) AS columns_block
	FROM columns
	GROUP BY table_oid
),
indexes AS (
	SELECT
		t.table_oid,
		i.relname AS index_name,
		ix.indisprimary,
		ix.indisunique,
		am.amname AS index_type,
		string_agg(a.attname, ', ' ORDER BY array_position(ix.indkey, a.attnum)) AS columns_list,
		CASE WHEN ix.indnkeyatts < array_length(ix.indkey, 1)
			THEN string_agg(a.attname, ', ') FILTER (WHERE array_position(ix.indkey, a.attnum) >= ix.indnkeyatts)
			ELSE NULL
		END AS include_columns
	FROM tables AS t
	JOIN pg_index AS ix ON ix.indrelid = t.table_oid
	JOIN pg_class AS i ON i.oid = ix.indexrelid
	JOIN pg_am AS am ON am.oid = i.relam
	JOIN pg_attribute AS a ON a.attrelid = t.table_oid AND a.attnum = ANY(ix.indkey)
	WHERE NOT ix.indisprimary OR array_length(ix.indkey, 1) > 1
	GROUP BY t.table_oid, i.relname, ix.indisprimary, ix.indisunique, am.amname, ix.indnkeyatts, ix.indkey
),
indexes_dbml AS (
	SELECT
		table_oid,
		format(E'\n  Indexes {\n    %s\n  }',
			string_agg(
				format('%s [%s]',
					CASE WHEN columns_list ~ ',' THEN format('(%s)', columns_list) ELSE columns_list END,
					trim(trailing ', ' FROM concat_ws(', ',
						CASE WHEN indisprimary THEN 'pk' END,
						format('type: %s', index_type),
						CASE WHEN indisunique AND NOT indisprimary THEN 'unique' END,
						format('name: "%s"', index_name),
						CASE WHEN include_columns IS NOT NULL
							 THEN format('note: ''INCLUDE (%s)''', include_columns)
						END
					))
				),
				E'\n    '
				ORDER BY indisprimary DESC, indisunique DESC, index_name
			)
		) AS indexes_block
	FROM indexes
	GROUP BY table_oid
),
foreign_keys AS (
	SELECT
		format(
			'Ref %I: "%I"."%I".%s > "%I"."%I".%s',
			con.conname,
			ns1.nspname, cl1.relname,
			CASE WHEN array_length(con.conkey, 1) = 1
				 THEN (SELECT quote_ident(attname) FROM pg_attribute WHERE attrelid = con.conrelid AND attnum = con.conkey[1])
				 ELSE '(' || (SELECT string_agg(quote_ident(attname), ', ') FROM pg_attribute WHERE attrelid = con.conrelid AND attnum = ANY(conkey)) || ')'
			END,
			ns2.nspname, cl2.relname,
			CASE WHEN array_length(con.confkey,1) = 1
				 THEN (SELECT quote_ident(attname) FROM pg_attribute WHERE attrelid = con.confrelid AND attnum = con.confkey[1])
				 ELSE '(' || (SELECT string_agg(quote_ident(attname), ', ') FROM pg_attribute WHERE attrelid = con.confrelid AND attnum = ANY(confkey)) || ')'
			END
		) AS ref_line,
		ns1.nspname AS schema_name,
		cl1.relname AS table_name,
		con.conname AS constraint_name
	FROM pg_constraint AS con
	JOIN pg_class AS cl1 ON cl1.oid = con.conrelid
	JOIN pg_namespace AS ns1 ON ns1.oid = cl1.relnamespace
	JOIN pg_class AS cl2 ON cl2.oid = con.confrelid
	JOIN pg_namespace AS ns2 ON ns2.oid = cl2.relnamespace
	WHERE con.contype = 'f'
	  AND ns1.nspname NOT IN ('pg_catalog', 'information_schema')
	  AND ns2.nspname NOT IN ('pg_catalog', 'information_schema')
)
SELECT
	string_agg(
		format(E'Table "%I"."%I" {\n%s%s%s\n}',
			t.schema_name,
			t.table_name,
			c.columns_block,
			COALESCE(i.indexes_block, ''),
			CASE WHEN t.table_comment IS NOT NULL
				THEN format(E'\n  Note: %s',
					CASE WHEN t.table_comment ~ E'[\n\r]'
						THEN format('''''''%s''''''', replace(t.table_comment, '''', ''''''))
						ELSE format('''%s''', replace(t.table_comment, '''', ''''''))
					END)
				ELSE ''
			END
		),
		E'\n\n'
		ORDER BY t.schema_name, t.table_name
	) ||
	CASE
		WHEN EXISTS (SELECT FROM foreign_keys)
		THEN E'\n\n' || (SELECT string_agg(ref_line, E'\n' ORDER BY schema_name, table_name, constraint_name) FROM foreign_keys)
		ELSE ''
	END AS dbml_output
FROM tables AS t
JOIN columns_dbml AS c ON c.table_oid = t.table_oid
LEFT JOIN indexes_dbml AS i ON i.table_oid = t.table_oid;
