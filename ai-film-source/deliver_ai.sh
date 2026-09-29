set -e
cd /tmp/claude-0/-home-user-2026-/5931cad5-a3b8-5fc3-8a5f-fc256652b892/scratchpad/aifilm
OUT=${1:-/tmp/claude-0/-home-user-2026-/5931cad5-a3b8-5fc3-8a5f-fc256652b892/scratchpad/AI-Timeline-Movie-1080p.mp4}
N=$(ls part*.mp4 | wc -l); for k in $(seq 0 $((N-1))); do echo "file 'part$k.mp4'"; done > parts.txt
ffmpeg -y -loglevel error -f concat -safe 0 -i parts.txt -c copy video_ai.mp4
ffmpeg -y -loglevel error -i video_ai.mp4 -i mix.wav -map 0:v -map 1:a -c:v libx264 -preset slow -b:v 2500k -maxrate 3500k -bufsize 7000k -c:a aac -b:a 192k -shortest "$OUT"
cd .. && rm -f AI-Part*.mp4 && ffmpeg -y -loglevel error -i "$OUT" -c copy -map 0 -f segment -segment_time 80 -reset_timestamps 1 AI-Part%d.mp4
ls -la "$OUT"; du -m AI-Part*.mp4
