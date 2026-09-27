import json,os,sys,subprocess
from playwright.sync_api import sync_playwright
FPS=24
sch=json.load(open('schedule.json')); total=sch['total']
nf=int(total*FPS); k=int(sys.argv[1]); K=int(sys.argv[2])
a=nf*k//K; b=nf*(k+1)//K
ff=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','image2pipe','-framerate',str(FPS),'-c:v','mjpeg','-i','-',
   '-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p',f'part{k}.mp4'],stdin=subprocess.PIPE)
with sync_playwright() as p:
    br=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    pg=br.new_page(viewport={'width':1280,'height':720})
    pg.goto('file://'+os.path.abspath('film_built.html'))
    cv=pg.locator('canvas')
    for f in range(a,b):
        pg.evaluate(f'renderAt({f/FPS})')
        ff.stdin.write(cv.screenshot(type='jpeg',quality=92))
    br.close()
ff.stdin.close(); ff.wait(); print('part',k,'frames',b-a)
