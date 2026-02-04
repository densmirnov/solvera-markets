.PHONY: check fmt lint test validate fix coverage

check: validate fmt lint test coverage

validate:
	@./scripts/validate-structure.sh

fmt:
	@./scripts/fmt.sh

lint:
	@./scripts/lint.sh

test:
	@./scripts/test.sh

coverage:
	@./scripts/coverage.sh

fix: fmt lint
