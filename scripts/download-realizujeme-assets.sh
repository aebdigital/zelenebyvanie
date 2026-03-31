#!/bin/zsh

set -uo pipefail

manifest="/tmp/realizujeme-downloads.tsv"
failures="/tmp/realizujeme-downloads-failed.tsv"

rm -f "${failures}"

while IFS=$'\t' read -r url file; do
  [[ -z "${url}" || -z "${file}" ]] && continue
  mkdir -p "$(dirname "$file")"
  if [[ -f "${file}" ]]; then
    continue
  fi

  if ! curl -A "Mozilla/5.0" -Ls --connect-timeout 5 --max-time 20 --retry 3 --retry-delay 1 "${url}" -o "${file}"; then
    printf '%s\t%s\n' "${url}" "${file}" >> "${failures}"
  fi

  sleep 0.2
done < "${manifest}"

if [[ -f "${failures}" ]]; then
  echo "Failed downloads:"
  wc -l "${failures}"
  exit 1
fi
