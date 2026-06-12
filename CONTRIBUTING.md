# Contributing

Thanks for your interest in contributing to `pg_dbml`!

## Getting Started

```bash
git clone https://github.com/heptau/pg_dbml.git
cd pg_dbml
chmod +x pg_dbml scripts/*.sh
```

Make sure `psql` (PostgreSQL client) is installed and available in your PATH.

## Development

Run tests before submitting changes:

```bash
make test
```

The project structure:
- `pg_dbml` - Bash CLI wrapper (argument parsing, db connection)
- `pg_dbml.sql` - Core SQL introspection engine
- `scripts/` - Build and test scripts
- `docs/` - Website and documentation

## Submitting Changes

1. Create a branch: `git checkout -b feature/your-feature`
2. Make changes and run `make test`
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: ...` for new features
   - `fix: ...` for bug fixes
   - `docs: ...` for documentation
   - `chore: ...` for maintenance
4. Push and open a Pull Request

## Release Process

Releases are managed by the maintainers via `make release`:
- Bump the version in `pg_dbml`
- Update `CHANGELOG.md` or release notes
- Run `make release` to tag, build, and publish

## License

By contributing, you agree that your contributions will be licensed under the MIT License. See `LICENSE`.
