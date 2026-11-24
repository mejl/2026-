set -e
cd "$(dirname "$0")"
OLD=/home/user/2026-/Where-He-Walks-Music-Video-HQ.mp4
mkdir -p fn && rm -f fn/*.mp4
python3 - <<'PY' > fn/list.txt
import json,os
d=json.load(open('data.json')); nf=int(d['total']*30); n=(nf+149)//150
for s in range(n):
    f=f'seg_N{s:03d}.mp4'
    print(f if os.path.exists(f) else f'OLD {s}')
PY
: > fn/parts.txt
while read a b; do
  if [ "$a" = OLD ]; then
    ffmpeg -nostdin -y -loglevel error -ss $(python3 -c "print($b*5)") -t 5 -i "$OLD" -an -vf "scale=1920:1080:flags=lanczos,fps=30" -c:v libx264 -preset veryfast -crf 16 -pix_fmt yuv420p fn/o_$b.mp4
    echo "file 'o_$b.mp4'" >> fn/parts.txt
  else
    ffmpeg -nostdin -y -loglevel error -i "$a" -c copy fn/c_$a
    echo "file 'c_$a'" >> fn/parts.txt
  fi
done < fn/list.txt
ffmpeg -nostdin -y -loglevel error -f concat -safe 0 -i fn/parts.txt -c copy fn/video_now.mp4
ffmpeg -nostdin -y -loglevel error -i fn/video_now.mp4 -i song.m4a -map 0:v -map 1:a -c:v libx264 -preset medium -b:v 700k -maxrate 1300k -bufsize 2600k -pix_fmt yuv420p -c:a aac -b:a 128k -shortest -movflags +faststart fn/full_now.mp4
ls -la fn/full_now.mp4; ffprobe -v error -show_entries format=duration -of csv=p=0 fn/full_now.mp4; echo FULLNOWDONE
