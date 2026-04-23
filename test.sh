#!/usr/bin/env bash
# =============================================================================
# pg_dbml tests
# =============================================================================

if [[ -t 1 ]] && which tput &>/dev/null && tput colors &>/dev/null; then
	RED=$(tput setaf 1)
	GREEN=$(tput setaf 2)
	NC=$(tput sgr0)
else
	RED=''
	GREEN=''
	NC=''
fi

PASS=0
FAIL=0

test_ok() {
	echo "${GREEN}✓${NC} $1"
	((PASS++))
}

test_fail() {
	echo "${RED}✗${NC} $1"
	((FAIL++))
}

echo "Running pg_dbml tests..."
echo ""

# Test 1: Help works
if ./pg_dbml --help | grep -q "Usage:"; then
	test_ok "Help displays"
else
	test_fail "Help displays"
fi

# Test 2: Version works
if ./pg_dbml --version | grep -q "1.0.0"; then
	test_ok "Version displays"
else
	test_fail "Version displays"
fi

# Test 3: Version short flag
if ./pg_dbml -v | grep -q "1.0.0"; then
	test_ok "Version (-v) displays"
else
	test_fail "Version (-v) displays"
fi

# Test 4: Dry-run without DB outputs something
if ./pg_dbml postgresql://postgres@localhost:50032/clients_and_terminals --dry-run 2>&1 | head -1 | grep -q "Table"; then
	test_ok "Dry-run outputs DBML"
else
	test_fail "Dry-run outputs DBML"
fi

# Test 5: Quiet flag is accepted
if ./pg_dbml --help | grep -q "\-q, --quiet"; then
	test_ok "Quiet flag in help"
else
	test_fail "Quiet flag in help"
fi

# Test 6: Dry-run flag is accepted
if ./pg_dbml --help | grep -q "\-\-dry-run"; then
	test_ok "Dry-run flag in help"
else
	test_fail "Dry-run flag in help"
fi

# Summary
echo ""
echo "Results: ${GREEN}$PASS passed${NC}, ${RED}$FAIL failed${NC}"

if [[ $FAIL -gt 0 ]]; then
	exit 1
fi