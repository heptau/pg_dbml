# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2026-06-25

### Fixed
- Default value formatting: PostgreSQL identifier quotes around function names (e.g. `"session_user"()`) are now stripped, producing clean output like `session_user()`
- Redundant type casts in default values are now removed globally (e.g. `('now'::text)::timestamp(6) with time zone` → `'now'`), including multi-word types like `timestamp with time zone`
- Outer parentheses wrapping a single value after cast stripping are also removed

## [1.1.0] - 2026-04-17

### Changed
- Restructured project layout for clarity
- Optimized SQL introspection engine

## [1.0.2] - 2024-12-XX

### Fixed
- Ensured deterministic output order in DBML generation (tables and columns now always sorted by schema/table name and ordinal position)

## [1.0.1] - 2024-12-XX

### Added
- `--quiet` / `-q` flag to suppress success message
- `--dry-run` flag to preview output without writing a file
- Tests for new flags and error handling

### Fixed
- Added `--no-psqlrc` option to psql calls to avoid interference from user config files (contributed by [@aleszeleny](https://github.com/aleszeleny) in [#1](https://github.com/heptau/pg_dbml/pull/1))

## [1.0.0] - 2024-12-XX

### Added
- Initial release
- Single-query PostgreSQL introspection engine (`pg_dbml.sql`)
- Bash CLI wrapper with connection string and flag-based modes
- DBML output covering tables, columns, data types, constraints, indexes, foreign keys, and comments
- Homebrew distribution via tap

[1.1.1]: https://github.com/heptau/pg_dbml/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/heptau/pg_dbml/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/heptau/pg_dbml/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/heptau/pg_dbml/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/heptau/pg_dbml/releases/tag/v1.0.0
