#!/usr/bin/env bash
# Subsets the TTF originals in assets-src/fonts/ into the WOFF2 files the site ships from
# app/fonts/ (loaded by app/fonts.ts). Latin + Latin Extended for all faces, which covers
# Albanian (ë, ç) and English; IBM Plex Mono additionally keeps Cyrillic because it is the
# one face used for Macedonian mono text. OpenType features (kerning, ligatures, variable
# axes) are kept. Re-run after replacing an original or adding a language.
#   bash scripts/build-fonts.sh
# Needs python3; installs fonttools + brotli into .venv-fonts/ (gitignored) on first run.
set -euo pipefail
cd "$(dirname "$0")/.."
VENV=".venv-fonts"
if [ ! -x "$VENV/bin/pyftsubset" ]; then
  python3 -m venv "$VENV"
  "$VENV/bin/pip" install --quiet --disable-pip-version-check fonttools brotli
fi
LATIN="U+0000-00FF,U+0100-024F,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1E00-1EFF,U+2000-206F,U+20A0-20CF,U+2122,U+2190-2199,U+2212,U+2215,U+FEFF,U+FFFD"
CYRILLIC="U+0400-04FF,U+2116"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
subset() { # name unicodes [instancer axis limits...]
  local name="$1" unicodes="$2"; shift 2
  local src="assets-src/fonts/$name.ttf"
  if [ $# -gt 0 ]; then # variable font: drop the axes/ranges the site never uses first
    "$VENV/bin/fonttools" varLib.instancer "$src" "$@" -o "$TMP/$name.ttf" >/dev/null 2>&1
    src="$TMP/$name.ttf"
  fi
  "$VENV/bin/pyftsubset" "$src" --output-file="app/fonts/$name.woff2" \
    --flavor=woff2 --layout-features='*' --unicodes="$unicodes" --no-hinting --name-IDs='*' 2>/dev/null
  printf '%-28s %5d KB -> %4d KB\n' "$name" $(( $(stat -f %z "assets-src/fonts/$name.ttf") / 1024 )) $(( $(stat -f %z "app/fonts/$name.woff2") / 1024 ))
}
# The site uses weights 400-600 only (font-medium / font-semibold) and italics only in the
# display face. Fraunces keeps its optical-size axis; SOFT (0) and WONK (1) are pinned to their defaults, so nothing changes visually.
subset Fraunces-Variable        "$LATIN" wght=400:600 SOFT=0 WONK=1
subset Fraunces-Italic-Variable "$LATIN" wght=400:600 SOFT=0 WONK=1
subset WorkSans-Variable        "$LATIN" wght=400:600
for f in IBMPlexMono-Regular IBMPlexMono-Medium IBMPlexMono-SemiBold; do subset "$f" "$LATIN,$CYRILLIC"; done
rm -f app/fonts/WorkSans-Italic-Variable.woff2
