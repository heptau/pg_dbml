#!/usr/bin/env bash
set -euo pipefail
# =============================================================================
# release.sh — Release pg_dbml locally or to GitHub
#
# Usage:
#   scripts/release.sh --local    Build and verify artifacts (no git, no push)
#   scripts/release.sh --github   Full release: tag, push, GitHub release, Homebrew tap
#
# Environment variables:
#   HOMEBREW_TAP_REPO     GitHub repo of the Homebrew tap (default: heptau/homebrew-tap)
#   HOMEBREW_TAP_FORMULA  Path to formula inside the tap   (default: Formula/pg-dbml.rb)
# =============================================================================

MODE="${1:-}"
if [[ "$MODE" != "--local" && "$MODE" != "--github" ]]; then
	echo "Usage: $0 [--local|--github]"
	echo ""
	echo "  --local   Build artifacts and verify — no git operations, no push"
	echo "  --github  Full release: tag, push, GitHub release, update Homebrew tap"
	exit 1
fi

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR/.."

HOMEBREW_TAP_REPO="${HOMEBREW_TAP_REPO:-heptau/homebrew-tap}"
HOMEBREW_TAP_FORMULA="${HOMEBREW_TAP_FORMULA:-Formula/pg-dbml.rb}"

VERSION=$(./pg_dbml --version)

echo "pg_dbml release — v${VERSION} (${MODE})"
echo ""

# ── Tests ────────────────────────────────────────────────────────────────────
echo "==> Running tests..."
scripts/test.sh
echo ""

# ── Build artifacts ──────────────────────────────────────────────────────────
echo "==> Building artifacts..."
scripts/build_release.sh
echo ""

ARCHIVE="dist/pg_dbml-${VERSION}.tar.gz"
FORMULA="dist/pg-dbml.rb"

# ── Verify ───────────────────────────────────────────────────────────────────
echo "==> Verifying artifacts..."
[[ -f "$ARCHIVE" ]] || { echo "Error: archive not found: $ARCHIVE"; exit 1; }
[[ -f "$FORMULA" ]] || { echo "Error: formula not found: $FORMULA"; exit 1; }
tar -tzf "$ARCHIVE" | grep -q "pg_dbml"     || { echo "Error: pg_dbml missing from archive"; exit 1; }
tar -tzf "$ARCHIVE" | grep -q "pg_dbml.sql" || { echo "Error: pg_dbml.sql missing from archive"; exit 1; }
grep -q "version \"${VERSION}\"" "$FORMULA" || { echo "Error: version mismatch in formula"; exit 1; }
echo "    Archive : $ARCHIVE"
echo "    Formula : $FORMULA"
echo ""

# ── Local mode — done here ───────────────────────────────────────────────────
if [[ "$MODE" == "--local" ]]; then
	echo "Local release ready. Inspect artifacts in dist/ before running:"
	echo "  make release"
	exit 0
fi

# ── GitHub mode ──────────────────────────────────────────────────────────────

# Guard: check for uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
	echo "Error: uncommitted changes present. Commit or stash before releasing."
	exit 1
fi

# Tag
echo "==> Tagging v${VERSION}..."
if git tag -l "v${VERSION}" | grep -q .; then
	echo "    Tag v${VERSION} already exists locally — skipping tag creation."
else
	git tag -a "v${VERSION}" -m "pg_dbml v${VERSION}"
fi
git push origin "v${VERSION}"
echo ""

# Extract release notes for this version from CHANGELOG.md
NOTES=$(awk "/^## \[${VERSION}\]/{found=1; next} found && /^## \[/{exit} found && NF{print}" CHANGELOG.md || true)
[[ -z "$NOTES" ]] && NOTES="Release v${VERSION}"

# GitHub release
echo "==> Creating GitHub release v${VERSION}..."
gh release create "v${VERSION}" \
	--title "pg_dbml v${VERSION}" \
	--notes "$NOTES" \
	"$ARCHIVE"
echo ""

# Homebrew tap update via GitHub API (no local clone needed)
echo "==> Updating Homebrew tap (${HOMEBREW_TAP_REPO} / ${HOMEBREW_TAP_FORMULA})..."
CURRENT_SHA=$(gh api "repos/${HOMEBREW_TAP_REPO}/contents/${HOMEBREW_TAP_FORMULA}" \
	--jq '.sha' 2>/dev/null || true)
CONTENT=$(base64 < "$FORMULA" | tr -d '\n')

if [[ -n "$CURRENT_SHA" ]]; then
	gh api "repos/${HOMEBREW_TAP_REPO}/contents/${HOMEBREW_TAP_FORMULA}" \
		--method PUT \
		-f message="pg_dbml v${VERSION}" \
		-f content="${CONTENT}" \
		-f sha="${CURRENT_SHA}"
else
	gh api "repos/${HOMEBREW_TAP_REPO}/contents/${HOMEBREW_TAP_FORMULA}" \
		--method PUT \
		-f message="pg_dbml v${VERSION}" \
		-f content="${CONTENT}"
fi
echo "    Formula updated in ${HOMEBREW_TAP_REPO}."
echo ""

echo "======================================================================"
echo "  Released : pg_dbml v${VERSION}"
echo "  GitHub   : https://github.com/heptau/pg_dbml/releases/tag/v${VERSION}"
echo "  Homebrew : brew upgrade heptau/tap/pg-dbml"
echo "======================================================================"
