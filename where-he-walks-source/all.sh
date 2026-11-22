set -e
cd "$(dirname "$0")"
python3 build.py
rm -f tmp_*.mp4
for k in 0 1 2 3; do python3 render.py h $k 4 & done; wait
ls seg_h*.mp4 | sort | sed "s/.*/file '&'/" > parts.txt
ffmpeg -y -loglevel error -f concat -safe 0 -i parts.txt -c copy video.mp4
ffmpeg -y -loglevel error -i video.mp4 -i song.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -b:v 700k -maxrate 1300k -bufsize 2600k -pix_fmt yuv420p -c:a aac -b:a 128k -shortest out.mp4
ffmpeg -y -loglevel error -i video.mp4 -i song.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -crf 19 -maxrate 4000k -bufsize 8000k -pix_fmt yuv420p -c:a aac -b:a 192k -shortest out_hq.mp4
ls -la out*.mp4; echo ALLDONE
