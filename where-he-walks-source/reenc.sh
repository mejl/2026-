cd "$(dirname "$0")"
DN="hqdn3d=2.2:1.6:4.5:3.5"
# flat, <=30 MB
ffmpeg -y -loglevel error -i video_L2.mp4 -i song.m4a -map "[v]" -map 1:a -filter_complex "[0:v]$DN[v]" -c:v libx264 -preset slow -b:v 700k -maxrate 1300k -bufsize 2600k -pix_fmt yuv420p -c:a aac -b:a 128k -shortest flat_small2.mp4 &
# flat HQ (<=98 MB)
ffmpeg -y -loglevel error -i video_L2.mp4 -i song.m4a -map "[v]" -map 1:a -filter_complex "[0:v]$DN[v]" -c:v libx264 -preset slow -b:v 2800k -maxrate 4200k -bufsize 8400k -pix_fmt yuv420p -c:a aac -b:a 160k -shortest flat_hq2.mp4 &
wait
# red-cyan anaglyph (<=30 MB)
ffmpeg -y -loglevel error -i video_L.mp4 -i video_R.mp4 -i song.m4a -filter_complex "[0:v]$DN[l];[1:v]$DN[r];[l][r]hstack=inputs=2,stereo3d=sbsl:arcd[v]" -map "[v]" -map 2:a -c:v libx264 -preset slow -b:v 690k -maxrate 1200k -bufsize 2400k -pix_fmt yuv420p -c:a aac -b:a 128k -shortest ana2.mp4 &
# half side-by-side (<=30 MB)
ffmpeg -y -loglevel error -i video_L.mp4 -i video_R.mp4 -i song.m4a -filter_complex "[0:v]$DN,scale=960:1080[l];[1:v]$DN,scale=960:1080[r];[l][r]hstack=inputs=2[v]" -map "[v]" -map 2:a -c:v libx264 -preset slow -b:v 680k -maxrate 1200k -bufsize 2400k -pix_fmt yuv420p -c:a aac -b:a 128k -shortest hsbs2.mp4 &
wait
# full side-by-side (<=98 MB)
ffmpeg -y -loglevel error -i video_L.mp4 -i video_R.mp4 -i song.m4a -filter_complex "[0:v]$DN[l];[1:v]$DN[r];[l][r]hstack=inputs=2[v]" -map "[v]" -map 2:a -c:v libx264 -preset slow -b:v 2800k -maxrate 4200k -bufsize 8400k -pix_fmt yuv420p -c:a aac -b:a 160k -shortest fsbs2.mp4
ls -la flat_small2.mp4 flat_hq2.mp4 ana2.mp4 hsbs2.mp4 fsbs2.mp4; echo REENCDONE
