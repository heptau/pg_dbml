#!/usr/bin/env bash
# =============================================================================
# build_release.sh - Package pg_dbml into an archive and generate Homebrew formula
# =============================================================================

# Ensure the script runs from the project root directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$DIR/.."
cd "$PROJECT_ROOT" || exit 1

echo "🔍 Detecting version from pg_dbml script..."
VERSION=$(./pg_dbml --version)

if [[ -z "$VERSION" ]]; then
	echo "❌ Error: Failed to detect version. Ensure ./pg_dbml --version works."
	exit 1
fi

echo "📦 Building release for version: $VERSION"

mkdir -p dist

ARCHIVE_NAME="pg_dbml-${VERSION}.tar.gz"
ARCHIVE_PATH="dist/${ARCHIVE_NAME}"

# COPYFILE_DISABLE=1 prevents tar from including macOS resource forks (._ files)
# --exclude='.DS_Store' prevents including macOS finder metadata
COPYFILE_DISABLE=1 tar --exclude='.DS_Store' -czf "$ARCHIVE_PATH" pg_dbml pg_dbml.sql

if [ $? -eq 0 ]; then
	echo "✅ Archive created: $ARCHIVE_PATH"
else
	echo "❌ Error: Failed to create archive."
	exit 1
fi

SHA=$(shasum -a 256 "$ARCHIVE_PATH" | awk '{ print $1 }')
echo "🔑 SHA256: $SHA"

FORMULA_PATH="dist/pg-dbml.rb"

# Generate Homebrew formula
cat > "$FORMULA_PATH" <<EOF
class PgDbml < Formula
  desc "Pure SQL exporter from PostgreSQL to DBML"
  homepage "https://github.com/heptau/pg_dbml"
  url "https://github.com/heptau/pg_dbml/releases/download/v${VERSION}/${ARCHIVE_NAME}"
  sha256 "${SHA}"
  version "${VERSION}"

  depends_on "libpq"

  def install
    libexec.install "pg_dbml", "pg_dbml.sql"

    (bin/"pg_dbml").write <<~EOS
      #!/bin/bash
      export PG_DBML_SQL_PATH="#{libexec}/pg_dbml.sql"
      exec "#{libexec}/pg_dbml" "\$@"
    EOS

    chmod "+x", bin/"pg_dbml"
  end

  test do
    system "#{bin}/pg_dbml", "--version"
  end
end
EOF

echo "✅ Homebrew formula generated: $FORMULA_PATH"
echo "=========================================================="
echo "🎯 DONE!"
echo "Before publishing the release, do not forget to update the"
echo "GitHub repository URL in the formula ($FORMULA_PATH)."
echo "=========================================================="
