# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in `pg_dbml`, please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

Contact: [security@80.cz](mailto:security@80.cz)

You can also refer to the machine-readable security policy at:
[https://pg_dbml.80.cz/.well-known/security.txt](https://pg_dbml.80.cz/.well-known/security.txt)

We aim to respond within 5 business days and will coordinate a fix and disclosure timeline with you.

## Scope

`pg_dbml` is a read-only introspection tool — it issues only `SELECT` queries against PostgreSQL system catalogs. It does not write to the database, execute arbitrary SQL from user input, or handle authentication credentials beyond passing them to `psql`.

Relevant areas for security review:
- The Bash CLI (`pg_dbml`) and how it constructs `psql` arguments
- The SQL query (`pg_dbml.sql`) and its interaction with PostgreSQL system catalogs
