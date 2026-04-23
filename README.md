# pg_dbml

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CLI Tool](https://img.shields.io/badge/Interface-CLI%20Wrapper-green.svg)](pg_dbml)

A powerful command-line utility built around PostgreSQL introspection. `pg_dbml` extracts the complete database schema and exports it directly into the standardized DBML (Database Markup Language) format.

This tool leverages PostgreSQL's system catalogs and metadata to perform deep, pure SQL introspection, while providing a user-friendly CLI wrapper for execution.

## 💡 Why use DBML for AI & LLMs?

Database schemas are often complex to parse. Directly querying a live production database for schema knowledge is slow, resource-intensive, and requires intricate SQL expertise. DBML solves this by providing a human-readable, declarative, and highly structured blueprint of your data.

**Benefit for AI:** By consuming a DBML file, Large Language Models (LLMs) like Claude or ChatGPT can rapidly and cost-effectively familiarize themselves with your data model. They can instantly understand relationships, table structures, and constraints without needing to run time-consuming queries against the live database. It transforms complex relational metadata into highly token-efficient text.

## ✨ Features

*   **CLI Driven:** Simple, single-command interface for schema export (`pg_dbml`).
*   **Pure SQL Foundation:** Zero dependencies on Node.js or third-party parsers. The core logic is a highly optimized SQL query (`pg_dbml.sql`).
*   **Complete Schema Extraction:** Captures schemas, table definitions, column names, data types, and nullability constraints.
*   **Constraint Mapping:** Automatically detects and maps Primary Keys (PK), Unique constraints, and Foreign Key relationships.
*   **Metadata Richness:** Includes table and column comments retrieved directly from PostgreSQL metadata (crucial for AI context).

## 🚀 Installation

### Option A: macOS / Linux via Homebrew (Recommended)

The easiest and most reliable way to install `pg_dbml` is using Homebrew. This automatically handles the `psql` dependencies and correctly sets up the path for the underlying SQL files.

```bash
# Install the tool
brew install heptau/tap/pg-dbml
```

### Option B: Manual Installation

If you prefer not to use Homebrew, you can install the script manually.

1. Clone the repository:
```bash
git clone https://github.com/heptau/pg_dbml.git
cd pg_dbml
```

2. Make the script executable:
```bash
chmod +x pg_dbml
```

3. *Optional:* Symlink it to your path so you can use it anywhere (ensure `pg_dbml.sql` stays in the same directory):
```bash
ln -s $(pwd)/pg_dbml /usr/local/bin/pg_dbml
```

*Note: Manual installation requires `psql` (PostgreSQL client) to be installed and available in your system PATH.*

## ⚙️ Usage

The primary way to use this project is via the `pg_dbml` command-line script.

**Basic Execution:**
If you want to export the schema from a database named `my_production_db` running on your local machine:

```bash
pg_dbml -d my_production_db -o schema.dbml
```

**Using a Connection String:**
You can also pass a standard PostgreSQL connection URI:

```bash
pg_dbml postgresql://postgres:password@localhost:5432/my_production_db
```

**Arguments Reference:**

| Argument | Short | Description | Required | Default |
| :--- | :---: | :--- | :---: | :--- |
| `--dbname` | `-d` | Name of the target database. | Yes* | N/A |
| `--host` | `-h` | PostgreSQL host address. | No | `localhost` |
| `--port` | `-p` | PostgreSQL port. | No | `5432` |
| `--user` | `-U` | Database user name. | No | `postgres` |
| `--output` | `-o` | Path where the `.dbml` file will be saved. | No | `[DBNAME].dbml` |
| `--quiet` | `-q` | Suppress success message. | No | |
| `--dry-run` | | Preview output without writing file. | No | |
| `--version`| `-v` | Show script version. | No | |
| `--help` | | Show help message. | No | |

*\* Required unless provided via a connection string.*

**Examples:**

```bash
pg_dbml -d mydb
pg_dbml -d mydb -q
pg_dbml postgresql://postgres:password@localhost:5432/mydb --dry-run
```

## 📚 Technical Architecture

The architecture consists of two files to maximize developer experience and maintainability:

1.  **`pg_dbml` (Bash orchestrator):** Parses command-line arguments, safely handles database connections via `psql`, and writes the final stream to the DBML file.
2.  **`pg_dbml.sql` (Core Engine):** A complex, pure SQL query that queries PostgreSQL's internal `pg_catalog` and `information_schema` tables. By keeping this in a separate file, contributors benefit from full syntax highlighting and standard SQL debugging.

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
