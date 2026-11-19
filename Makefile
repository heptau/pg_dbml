SHELL := /usr/bin/env bash
CURRENT_VERSION := $(shell ./pg_dbml --version)

.PHONY: help test build release-local release

help:
	@echo "pg_dbml v$(CURRENT_VERSION)"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "  test             Run tests"
	@echo "  build            Build release artifacts (archive + Homebrew formula)"
	@echo "  release-local    Test, build, verify artifacts — no git, no push"
	@echo "  release          Full release: test, build, tag, push, GitHub, Homebrew tap"
	@echo "                   Optional: make release VERSION=x.y.z (bumps pg_dbml and commits)"

test:
	@scripts/test.sh

build:
	@scripts/build_release.sh

release-local:
	@scripts/release.sh --local

release:
	@scripts/release.sh --github $(VERSION)

.DEFAULT_GOAL := help
