.PHONY: check fmt lint test validate fix

check: validate fmt lint test

validate:
	@./scripts/validate-structure.sh

fmt:
	@./scripts/fmt.sh

lint:
	@./scripts/lint.sh

test:
	@./scripts/test.sh

fix: fmt lint
