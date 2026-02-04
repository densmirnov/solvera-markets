#!/usr/bin/env sh
set -eu

CONTRACT_LINES_MIN=${CONTRACT_LINES_MIN:-80}
CONTRACT_STATEMENTS_MIN=${CONTRACT_STATEMENTS_MIN:-80}
CONTRACT_BRANCHES_MIN=${CONTRACT_BRANCHES_MIN:-55}
CONTRACT_FUNCS_MIN=${CONTRACT_FUNCS_MIN:-70}

output=$(forge coverage --report summary --root contracts)

printf "%s\n" "$output"

total_line=$(printf "%s\n" "$output" | rg "^\| Total" | tail -n 1)

parse_percent() {
  echo "$1" | awk '{print $1}' | tr -d '%'
}

lines=$(parse_percent "$(printf "%s" "$total_line" | awk -F'|' '{print $3}')")
statements=$(parse_percent "$(printf "%s" "$total_line" | awk -F'|' '{print $4}')")
branches=$(parse_percent "$(printf "%s" "$total_line" | awk -F'|' '{print $5}')")
funcs=$(parse_percent "$(printf "%s" "$total_line" | awk -F'|' '{print $6}')")

check_min() {
  metric="$1"
  value="$2"
  min="$3"
  awk -v value="$value" -v min="$min" 'BEGIN { if (value + 0 < min + 0) exit 1 }' || {
    echo "coverage failure: $metric $value < $min"
    exit 1
  }
}

check_min "lines" "$lines" "$CONTRACT_LINES_MIN"
check_min "statements" "$statements" "$CONTRACT_STATEMENTS_MIN"
check_min "branches" "$branches" "$CONTRACT_BRANCHES_MIN"
check_min "functions" "$funcs" "$CONTRACT_FUNCS_MIN"

echo "coverage thresholds met"
