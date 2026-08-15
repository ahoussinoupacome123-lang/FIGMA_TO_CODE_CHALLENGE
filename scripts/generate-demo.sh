#!/usr/bin/env bash
set -euo pipefail
OUT=public/demo.mp4
DURATION=6
SIZE=1280x720
FONT_BOLD=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf
FONT_REG=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install it (e.g. sudo apt install ffmpeg) and re-run this script."
  exit 2
fi

mkdir -p public

ffmpeg -y -f lavfi -i "color=c=0b1220:s=${SIZE}:d=${DURATION}" \
  -vf "drawtext=fontfile=${FONT_BOLD}:text='HemoLink Demo':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=h/2-50, drawtext=fontfile=${FONT_REG}:text='Eligibility → Search → Map':fontcolor=white:fontsize=28:x=(w-text_w)/2:y=h/2+10" \
  -c:v libx264 -pix_fmt yuv420p "$OUT"

echo "Generated $OUT"
