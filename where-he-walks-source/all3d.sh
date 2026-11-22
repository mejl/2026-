set -e
cd "$(dirname "$0")"
python3 build.py
rm -f tmp_*.mp4
for k in 0 1 2 3; do python3 render3d.py $k 4 & done; wait
for e in L R; do
  ls seg_${e}*.mp4 | sort | sed "s/.*/file '&'/" > parts_$e.txt
  ffmpeg -y -loglevel error -f concat -safe 0 -i parts_$e.txt -c copy video_$e.mp4
done
# 2D version = left eye + song
ffmpeg -y -loglevel error -i video_L.mp4 -i song.m4a -map 0:v -map 1:a -c:v libx264 -preset slow -b:v 700k -maxrate 1300k -bufsize 2600k -pix_fmt yuv420p -c:a aac -b:a 128k -shortest out2d.mp4
# red-cyan anaglyph (dubois), full 1920x1080: stack eyes side by side at full res then convert
ffmpeg -y -loglevel error -i video_L.mp4 -i video_R.mp4 -filter_complex "[0:v][1:v]hstack=inputs=2,stereo3d=sbsl:arcd[v]" -i song.m4a -map "[v]" -map 2:a -c:v libx264 -preset slow -b:v 850k -maxrate 1500k -bufsize 3000k -pix_fmt yuv420p -c:a aac -b:a 128k -shortest out_anaglyph.mp4
# half side-by-side (3D TVs / most players): each eye squeezed to 960x1080
ffmpeg -y -loglevel error -i video_L.mp4 -i video_R.mp4 -filter_complex "[0:v]scale=960:1080[l];[1:v]scale=960:1080[r];[l][r]hstack=inputs=2[v]" -i song.m4a -map "[v]" -map 2:a -c:v libx264 -preset slow -b:v 800k -maxrate 1400k -bufsize 2800k -pix_fmt yuv420p -c:a aac -b:a 128k -shortest out_hsbs.mp4
# full side-by-side 3840x1080 high quality
ffmpeg -y -loglevel error -i video_L.mp4 -i video_R.mp4 -filter_complex "[0:v][1:v]hstack=inputs=2[v]" -i song.m4a -map "[v]" -map 2:a -c:v libx264 -preset slow -b:v 2600k -maxrate 3600k -bufsize 7200k -pix_fmt yuv420p -c:a aac -b:a 160k -shortest out_fsbs.mp4
ls -la out*.mp4; echo ALL3DDONE
