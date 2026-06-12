SHELL := /usr/bin/env bash
VERSION := $(shell ./pg_dbml --version)

.PHONY: help test build release

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help      Show this help"
	@echo "  test      Run tests"
	@echo "  build     Build release artifacts (archive + Homebrew formula)"
	@echo "  release   Run tests, build artifacts, tag, and publish to GitHub + Homebrew tap"

test:
	@scripts/test.sh

build:
	@scripts/build_release.sh

release: test build
	@echo ""
	@echo "Creating git tag v$(VERSION)..."
	git tag -a "v$(VERSION)" -m "pg_dbml v$(VERSION)"
	git push origin "v$(VERSION)"
	@echo ""
	@echo "Creating GitHub release..."
	gh release create "v$(VERSION)" \
		--title "pg_dbml v$(VERSION)" \
		--notes-file /dev/stdin \
		dist/pg_dbml-$(VERSION).tar.gz < /dev/null
	@echo ""
	@echo "Updating Homebrew tap..."
	cp dist/pg-dbml.rb /tmp/pg-dbml.rb
	@echo "Done! Remember to push the formula to your Homebrew tap repository."
	@echo "  cp dist/pg-dbml.rb /path/to/homebrew-tap/Formula/pg-dbml.rb"
	@echo "  cd /path/to/homebrew-tap && git add . && git commit -m \"pg_dbml v$(VERSION)\" && git push"

.DEFAULT_GOAL := help