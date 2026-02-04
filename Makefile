.PHONY: check fmt lint test validate fix coverage audit

check: validate fmt lint test coverage audit

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

audit:
	@./scripts/audit.sh

fix: fmt lint
