#!/usr/bin/env bash
# =============================================================================
# pg_dbml tests
# =============================================================================

if [[ -t 1 ]] && which tput &>/dev/null && tput colors &>/dev/null; then
	RED=$(tput setaf 1)
	GREEN=$(tput setaf 2)
	YELLOW=$(tput setaf 3)
	NC=$(tput sgr0)
else
	RED=''
	GREEN=''
	YELLOW=''
	NC=''
fi

PASS=0
FAIL=0
SKIP=0

test_ok()   { echo "${GREEN}✓${NC} $1"; ((PASS++)); }
test_fail() { echo "${RED}✗${NC} $1"; ((FAIL++)); }
test_skip() { echo "${YELLOW}⚠${NC} Skipped: $1"; ((SKIP++)); }

echo "Running pg_dbml tests..."
echo ""

# =============================================================================
# CLI — no database required
# =============================================================================
echo "  CLI"

# Help text contains Usage:
if ./pg_dbml --help 2>/dev/null | grep -q "Usage:"; then
	test_ok "  --help displays usage"
else
	test_fail "  --help displays usage"
fi

# --help exits with 0
./pg_dbml --help > /dev/null 2>&1
if [[ $? -eq 0 ]]; then
	test_ok "  --help exits 0"
else
	test_fail "  --help exits 0"
fi

# No args exits with 1
./pg_dbml > /dev/null 2>&1
if [[ $? -ne 0 ]]; then
	test_ok "  No args exits non-zero"
else
	test_fail "  No args exits non-zero"
fi

# --version outputs exact MAJOR.MINOR.PATCH (no trailing text)
if ./pg_dbml --version 2>/dev/null | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
	test_ok "  --version outputs semver"
else
	test_fail "  --version outputs semver"
fi

# Short version flag -v
if ./pg_dbml -v 2>/dev/null | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
	test_ok "  -v outputs semver"
else
	test_fail "  -v outputs semver"
fi

# --version exits with 0
./pg_dbml --version > /dev/null 2>&1
if [[ $? -eq 0 ]]; then
	test_ok "  --version exits 0"
else
	test_fail "  --version exits 0"
fi

# Key flags present in help (use -- to prevent grep treating patterns as options)
HELP_TEXT=$(./pg_dbml --help 2>/dev/null)
for flag in "-q, --quiet" "--dry-run" "--host" "--port" "--user" "--output"; do
	if echo "$HELP_TEXT" | grep -qF -- "$flag"; then
		test_ok "  Help lists $flag"
	else
		test_fail "  Help lists $flag"
	fi
done

# =============================================================================
# DB-dependent tests
# =============================================================================
echo ""
echo "  Database"

TEST_DB_URL="${PG_TEST_URL:-postgresql://postgres@localhost:50032/clients_and_terminals}"

if ! psql "$TEST_DB_URL" -c "SELECT 1" &>/dev/null 2>&1; then
	test_skip "DB tests (no test DB at $TEST_DB_URL)"
else
	# Dry-run outputs DBML to stdout
	if ./pg_dbml "$TEST_DB_URL" --dry-run 2>/dev/null | head -1 | grep -qE '^Table '; then
		test_ok "  Dry-run outputs DBML to stdout"
	else
		test_fail "  Dry-run outputs DBML to stdout"
	fi

	# Dry-run does not create an output file
	TMP_DRYRUN=$(mktemp /tmp/pg_dbml_dry_XXXXXX.dbml)
	rm -f "$TMP_DRYRUN"
	./pg_dbml "$TEST_DB_URL" --dry-run -o "$TMP_DRYRUN" > /dev/null 2>&1
	if [[ ! -f "$TMP_DRYRUN" ]]; then
		test_ok "  Dry-run does not create output file"
	else
		test_fail "  Dry-run does not create output file"
		rm -f "$TMP_DRYRUN"
	fi

	# Output file is created with -o
	TMP_OUT=$(mktemp /tmp/pg_dbml_out_XXXXXX.dbml)
	rm -f "$TMP_OUT"
	./pg_dbml "$TEST_DB_URL" -o "$TMP_OUT" -q > /dev/null 2>&1
	if [[ -f "$TMP_OUT" ]]; then
		test_ok "  Output file is created"
	else
		test_fail "  Output file is created"
	fi

	# Output file is non-empty
	if [[ -s "$TMP_OUT" ]]; then
		test_ok "  Output file is non-empty"
	else
		test_fail "  Output file is non-empty"
	fi

	# Output contains valid DBML Table blocks (schema.table format)
	if grep -qE '^Table [a-z_]+\.[a-z_]+ \{' "$TMP_OUT" 2>/dev/null; then
		test_ok "  Output contains Table schema.name { definitions"
	else
		test_fail "  Output contains Table schema.name { definitions"
	fi

	# Output does not start with blank lines or psql noise
	first_line=$(head -1 "$TMP_OUT")
	if [[ "$first_line" =~ ^Table ]]; then
		test_ok "  Output starts with Table (no leading noise)"
	else
		test_fail "  Output starts with Table (no leading noise) — got: $first_line"
	fi

	rm -f "$TMP_OUT"

	# Quiet flag suppresses stdout
	stdout=$(./pg_dbml "$TEST_DB_URL" -o /tmp/pg_dbml_quiet_$$.dbml -q 2>/dev/null)
	rm -f "/tmp/pg_dbml_quiet_$$.dbml"
	if [[ -z "$stdout" ]]; then
		test_ok "  Quiet mode: no stdout"
	else
		test_fail "  Quiet mode: no stdout"
	fi

	# Without -q, stdout contains success message
	stdout=$(./pg_dbml "$TEST_DB_URL" -o /tmp/pg_dbml_verbose_$$.dbml 2>/dev/null)
	rm -f "/tmp/pg_dbml_verbose_$$.dbml"
	if [[ -n "$stdout" ]]; then
		test_ok "  Without -q: success message on stdout"
	else
		test_fail "  Without -q: success message on stdout"
	fi
fi

# =============================================================================
# Summary
# =============================================================================
echo ""
if [[ $SKIP -gt 0 ]]; then
	echo "Results: ${GREEN}$PASS passed${NC}, ${RED}$FAIL failed${NC}, ${YELLOW}$SKIP skipped${NC}"
else
	echo "Results: ${GREEN}$PASS passed${NC}, ${RED}$FAIL failed${NC}"
fi

if [[ $FAIL -gt 0 ]]; then
	exit 1
fi
