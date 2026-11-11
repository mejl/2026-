set -e
cd /tmp/claude-0/-home-user-2026-/5931cad5-a3b8-5fc3-8a5f-fc256652b892/scratchpad/mv3
rm -f tmp_*.mp4
for v in h v; do
  for k in 0 1 2 3; do python3 render.py $v $k 4 & done; wait
  ls seg_$v*.mp4 | sort | sed "s/.*/file '&'/" > parts_$v.txt
  ffmpeg -y -loglevel error -f concat -safe 0 -i parts_$v.txt -c copy video_$v.mp4
done
ffmpeg -y -loglevel error -i video_h.mp4 -i song.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -crf 19 -maxrate 2500k -bufsize 5000k -pix_fmt yuv420p -c:a aac -b:a 192k -shortest ../Israel-Edit-YouTube-16x9.mp4
ffmpeg -y -loglevel error -i video_v.mp4 -i song.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -crf 19 -maxrate 2500k -bufsize 5000k -pix_fmt yuv420p -c:a aac -b:a 192k -shortest ../Israel-Edit-TikTok-9x16.mp4
ls -la ../Israel-Edit-*.mp4; echo ALLDONE
