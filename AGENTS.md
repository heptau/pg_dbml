# AGENTS.md

This file describes the project structure and conventions for AI agents working on this codebase.

## Structure

```
pg_dbml          CLI orchestrator (Bash)
pg_dbml.sql      Core SQL engine
scripts/         Build and test scripts
  test.sh        Test suite
  build_release.sh  Release archive + Homebrew formula builder
dist/            Build artifacts (archives + formula)
docs/            Website (HTML, JS, CSS)
```

## Workflow

- `make test` - run tests
- `make build` - build release artifacts
- `make release` - full release pipeline
- `make` - show help

## Conventions

- Test files check version output using a regex, not a hardcoded version.
- Release version is read from `pg_dbml` via `--version`.
- All scripts are in `scripts/`.
- SQL engine (pg_dbml.sql) is pure PostgreSQL - no external deps.
- Documentation is in `README.md`, `docs/`, `CONTRIBUTING.md`, and `AGENTS.md`.
