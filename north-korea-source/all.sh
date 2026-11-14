set -e
cd /tmp/claude-0/-home-user-2026-/5931cad5-a3b8-5fc3-8a5f-fc256652b892/scratchpad/mv5
rm -f tmp_*.mp4
for k in 0 1 2 3; do python3 render.py h $k 4 & done; wait
ls seg_h*.mp4 | sort | sed "s/.*/file '&'/" > parts.txt
ffmpeg -y -loglevel error -f concat -safe 0 -i parts.txt -c copy video.mp4
ffmpeg -y -loglevel error -i video.mp4 -i song.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -b:v 880k -maxrate 1500k -bufsize 3000k -pix_fmt yuv420p -c:a aac -b:a 160k -shortest out.mp4
ffmpeg -y -loglevel error -i video.mp4 -i song.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -crf 19 -maxrate 3000k -bufsize 6000k -pix_fmt yuv420p -c:a aac -b:a 192k -shortest out_hq.mp4
ls -la out*.mp4; echo ALLDONE
