set -e
cd "$(dirname "$0")"
python3 build.py
rm -f tmp_N*.mp4
for k in 0 1 2 3; do python3 render_n.py $k 4 & done; wait
ls seg_N*.mp4 | sort | sed "s/.*/file '&'/" > parts_N.txt
ffmpeg -y -loglevel error -f concat -safe 0 -i parts_N.txt -c copy video_N.mp4
# <=30 MB for chat, and a high-bitrate file (<=98 MB) for YouTube/repo
ffmpeg -y -loglevel error -i video_N.mp4 -i song.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -b:v 720k -maxrate 1400k -bufsize 2800k -pix_fmt yuv420p -c:a aac -b:a 128k -shortest final_small.mp4 &
ffmpeg -y -loglevel error -i video_N.mp4 -i song.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -b:v 2850k -maxrate 4200k -bufsize 8400k -pix_fmt yuv420p -c:a aac -b:a 160k -shortest final_hq.mp4 &
wait
ls -la final_small.mp4 final_hq.mp4; echo ALLNDONE
