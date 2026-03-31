#!/bin/zsh
set -euo pipefail

ROOT_DIR="${0:A:h:h}"
SNAPSHOT_DIR="$ROOT_DIR/_snapshot/rentals"
PUBLIC_DIR="$ROOT_DIR/public/site/rentals"
OUT_FILE="$ROOT_DIR/_snapshot/rental-gallery-paths.tsv"

: > "$OUT_FILE"

for html in "$SNAPSHOT_DIR"/*.html; do
  slug="${html:t:r}"
  target_dir="$PUBLIC_DIR/$slug"
  mkdir -p "$target_dir"

  urls=("${(@f)$(rg -o 'data-pswp-src="[^"]+"' "$html" | sed 's/data-pswp-src="//; s/"$//' | awk '!seen[$0]++')}")

  index=1
  for url in "${urls[@]}"; do
    clean_url="${url%%\?*}"
    ext="${clean_url##*.}"
    filename=$(printf "%02d.%s" "$index" "$ext")
    curl -Ls "$url" -o "$target_dir/$filename"
    printf "%s\t/site/rentals/%s/%s\n" "$slug" "$slug" "$filename" >> "$OUT_FILE"
    index=$((index + 1))
  done
done

echo "Saved gallery paths to $OUT_FILE"
