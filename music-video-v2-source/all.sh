set -e
cd /tmp/claude-0/-home-user-2026-/5931cad5-a3b8-5fc3-8a5f-fc256652b892/scratchpad/mv2
rm -f part*.mp4 tmp*.mp4; for k in 0 1 2 3; do python3 render.py $k 4 & done; wait
ls seg*.mp4 | sort | sed "s/.*/file '&'/" > parts.txt; wc -l parts.txt
ffmpeg -y -loglevel error -f concat -safe 0 -i parts.txt -c copy video.mp4
ffmpeg -y -loglevel error -i video.mp4 -i song.m4a -map 0:v -map 1:a -c:v libx264 -preset veryslow -b:v 1000k -maxrate 1600k -bufsize 3200k -pix_fmt yuv420p -c:a aac -b:a 160k -shortest ../Christian-Timeline-Music-Video-v2.mp4
ffmpeg -y -loglevel error -i video.mp4 -i song.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -crf 20 -maxrate 3500k -bufsize 7000k -pix_fmt yuv420p -c:a aac -b:a 192k -shortest ../Christian-Timeline-Music-Video-v2-HQ.mp4
ls -la ../Christian-Timeline-Music-Video-v2*.mp4; echo ALLDONE
