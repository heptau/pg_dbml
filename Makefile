SHELL := /usr/bin/env bash
VERSION := $(shell ./pg_dbml --version)

.PHONY: help test build release-local release

help:
	@echo "pg_dbml v$(VERSION)"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "  test             Run tests"
	@echo "  build            Build release artifacts (archive + Homebrew formula)"
	@echo "  release-local    Test, build, verify artifacts — no git, no push"
	@echo "  release          Full release: test, build, tag, push, GitHub, Homebrew tap"

test:
	@scripts/test.sh

build:
	@scripts/build_release.sh

release-local:
	@scripts/release.sh --local

release:
	@scripts/release.sh --github

.DEFAULT_GOAL := help
