# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2026-11-19

### Added
- `-n`/`--schema` exports only the given schemas (repeatable or comma-separated); relationships leading outside them are omitted
- `--partitions hide|show` — partitions are hidden by default, so a partitioned table appears once instead of next to every partition. `show` restores the old listing
- `pg_dbml.sql` takes the same settings as the psql variables `pg_dbml_schemas` and `pg_dbml_partitions`; with none set, `psql -f pg_dbml.sql` still exports the whole database. The CLI now runs the file with `-f` instead of `-c`
- Partitioned tables are exported. Only ordinary tables were read from the catalog, so the partitioned parent was missing while its partitions were present
- `postgres://` is accepted as a connection string scheme alongside `postgresql://`
- Tests for the CLI error paths: a failed export leaves no file behind, an unknown option and a missing option argument are reported, and `--version` works without `psql`

### Fixed
- Indexes on an expression were dropped (`lower(email)`) or, when mixed with plain columns, emitted with the plain columns only. Expression keys are now written as DBML backtick expressions
- `INCLUDE` columns of a covering index were listed among the key columns as well as in the note
- Index column names that need quoting (`"Full Name"`) were emitted bare, which is a parse error
- A default cast to a schema-qualified type lost only the schema — `'happy'::app.mood` came out as `` `'happy'.mood` ``
- A negative numeric default, which Postgres stores as `'-1'::integer`, was emitted as the string `'-1'`
- The expression of a generated column was emitted as its default
- Foreign keys of a partitioned table were emitted once per partition, and a foreign key pointing at a partitioned table produced a `Ref` to a table that was not in the output. Two constraints over the same columns are emitted once, as the DBML parser rejects the repeat
- Tables in temporary schemas (`pg_temp_N`) of other sessions are no longer exported
- A failed export left an empty output file behind and truncated an existing one. The output is now written to a temporary file and moved into place on success
- An unknown option was taken for a database name, and an option without its argument died with an unbound variable error. Both now print an error and exit with `2`
- `--version` and `--help` no longer require `psql` to be installed — `make` and the release scripts call `--version`
- The default output file name ignored `PGDATABASE` and `PGUSER`, and failed where `USER` is not set
- `pg_dbml.sql` next to the script now takes precedence over a file of the same name in the current directory
- `pg_dbml.sql` was not found when the script was run through a symlink, as the manual installation in the README suggests

### Documentation
- README and `llms.txt` state the minimum versions: PostgreSQL server 12, `psql` 11

## [1.1.3] - 2026-08-04

### Added
- Tests asserting that column types are mapped to DBML short names, that expression defaults are backticked and that notes escape apostrophes with a backslash. When `dbml2sql` is on `PATH`, the generated file is additionally validated against the reference DBML parser (skipped when it is not installed)

### Fixed
- Date/time types with a precision modifier kept their full SQL spelling — `timestamp(0) without time zone` instead of `timestamp(0)`, `timestamp(3) with time zone` instead of `timestamptz(3)`, and the same for `time(p)` / `timetz(p)`. The type-name mapping matched the unmodified spellings only, so any modifier broke it and the long name was emitted as a quoted type. All four are now mapped with the modifier preserved
- Type-name mapping is now anchored to the start of the type name, so a type whose name merely contains a mapped word is left alone (`information_schema.character_data` was rewritten to `information_schema.char_data`)
- Defaults that are SQL expressions are now emitted as DBML backtick expressions (``default: `now()` ``). DBML allows a bare default only for a number, `true`/`false`/`null` or a string literal, so every function-call default (`nextval(...)`, `CURRENT_TIMESTAMP`, `timezone('UTC', now())`, …) made the whole file unparseable — a real schema produced dozens of `'default' must be an enum value, a string literal, number literal, function expression, true, false or null` errors. Literals are still emitted bare
- Notes now escape apostrophes DBML-style with a backslash (`client\'s`) instead of doubling them SQL-style, which was a parse error, and escape literal backslashes in comment text, which were previously swallowed together with the character after them
- Defaults no longer have their double quotes doubled, which corrupted values that legitimately contain one (a `jsonb` default `'["string", "numeric"]'` came out as `'[""string"", ""numeric""]'`)

## [1.1.2] - 2026-07-30

### Changed
- Connection handling now mirrors `psql` itself: `-h`, `-p`, `-U`, `-d` and a `postgresql://` connection string are forwarded to `psql` only when actually provided, so `psql` defaults and standard environment variables (`PGHOST`, `PGPORT`, `PGUSER`, `PGDATABASE`, …) are respected (contributed by [@aleszeleny](https://github.com/aleszeleny) in [#2](https://github.com/heptau/pg_dbml/pull/2))
- Running `pg_dbml` without arguments is now valid — it connects using `psql` defaults instead of printing usage and exiting with `1`
- The output file name falls back to the current user name when no database name can be determined
- Enabled `set -euo pipefail` and made all optional variable expansions explicit
- Replaced the "no args exits non-zero" test with a failed-export test (`-d template0`) that asserts a non-zero exit code

### Fixed
- A failed `psql` export now propagates its exit code instead of reporting success
- Positional database name (`pg_dbml mydb`, the form documented in `--help`) works again — a regression since 1.0.1, where the argument parser matched only `-*` and looped forever on a bare database name. The name is now passed to `psql` as a separate `-d` argument instead of the single string `"-d mydb"`, which `psql` read as a database named `" mydb"` with a leading space
- Positional database name is again used for the default output file name (`mydb.dbml` instead of falling back to the user name)
- Added regression tests for both, using a `psql` stub on `PATH` so they need no database
- Documentation no longer advertises hardcoded `localhost` / `5432` / `postgres` connection defaults, which stopped being true in this release — `--help`, `README.md`, the website parameter table and `docs/llms.txt` now document the `psql` fallback and the `PGHOST`/`PGPORT`/`PGUSER`/`PGDATABASE` environment variables instead
- Website hero example used the non-existent flags `--db-host` and `--db-name`; corrected to `--host` and `--dbname`
- `docs/index.html` declares `lang="en"` but its inline fallback text was Czech; the static markup is now English, matching the declared language and the `en` default of the language switcher (the Czech version is still served through the switcher as before)

## [1.1.1] - 2026-06-25

### Added
- `scripts/release.sh` with `--local` and `--github` modes; `--github` tags, publishes the GitHub release with notes extracted from this file, and updates the Homebrew tap via the GitHub API
- `make release-local` target for a full dry run (test, build, verify artifacts) without touching git or publishing anything
- GitHub Actions CI workflow running the test suite against a PostgreSQL service, plus a build status badge in `README.md`
- `CHANGELOG.md`, `SECURITY.md`, `docs/.well-known/security.txt`, `docs/humans.txt`, `docs/llms.txt`
- Website SEO and metadata: `og:title`/`og:description`, image `alt` texts, `theme-color`, apple-touch-icon (`docs/apple-icon.png`, also registered in `docs/manifest.json`), and FAQPage + HowTo JSON-LD structured data
- Expanded test suite from 6 to 19 tests

### Changed
- `make release` now delegates to `scripts/release.sh --github` instead of inlining the tag/publish steps; `make help` prints the current version
- Extended the `SoftwareApplication` JSON-LD with `url`, `keywords`, `license`, and `codeRepository`, and dropped the hardcoded `softwareVersion`
- Corrected the website `<html lang>` from `cs` to `en` and refreshed `docs/sitemap.xml`

### Fixed
- Default value formatting: PostgreSQL identifier quotes around function names (e.g. `"session_user"()`) are now stripped, producing clean output like `session_user()`
- Redundant type casts in default values are now removed globally (e.g. `('now'::text)::timestamp(6) with time zone` → `'now'`), including multi-word types like `timestamp with time zone`
- Outer parentheses wrapping a single value after cast stripping are also removed

## [1.1.0] - 2026-06-12

### Added
- Makefile with `help`, `test`, `build`, and `release` targets
- `AGENTS.md` (AI agent conventions) and `CONTRIBUTING.md`
- Development section in `README.md` covering the Makefile workflow

### Changed
- Moved `test.sh` and `build_release.sh` from the project root / `deploy/` into `scripts/`
- Shortened verbose PostgreSQL type names in DBML output (`character varying` → `varchar`, `timestamp with time zone` → `timestamptz`, `boolean` → `bool`, `integer` → `int`, etc.)
- Removed redundant double quotes around identifiers in DBML output
- Extracted primary key, unique, and foreign key lookups into pre-aggregated CTEs, replacing correlated subqueries with LEFT JOINs
- Guarded empty table/column comments with `NULLIF` trimming

### Fixed
- Stripped unnecessary type casts from column default values

## [1.0.2] - 2026-05-07

### Fixed
- Ensured deterministic output order in DBML generation (tables and columns now always sorted by schema/table name and ordinal position)

## [1.0.1] - 2026-04-24

### Added
- `--quiet` / `-q` flag to suppress success message
- `--dry-run` flag to preview output without writing a file
- Tests for new flags and error handling

### Fixed
- Added `--no-psqlrc` option to psql calls to avoid interference from user config files (contributed by [@aleszeleny](https://github.com/aleszeleny) in [#1](https://github.com/heptau/pg_dbml/pull/1))

## [1.0.0] - 2026-04-18

### Added
- Initial release
- Single-query PostgreSQL introspection engine (`pg_dbml.sql`)
- Bash CLI wrapper with connection string and flag-based modes
- DBML output covering tables, columns, data types, constraints, indexes, foreign keys, and comments
- Homebrew distribution via tap

[1.2.0]: https://github.com/heptau/pg_dbml/compare/v1.1.3...v1.2.0
[1.1.3]: https://github.com/heptau/pg_dbml/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/heptau/pg_dbml/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/heptau/pg_dbml/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/heptau/pg_dbml/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/heptau/pg_dbml/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/heptau/pg_dbml/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/heptau/pg_dbml/releases/tag/v1.0.0
