import json,os,sys,subprocess
from playwright.sync_api import sync_playwright
os.chdir(os.path.dirname(os.path.abspath(__file__)))
FPS=24; sch=json.load(open('schedule.json')); total=float(os.environ.get('END',sch['total']))
nf=int(total*FPS); k=int(sys.argv[1]); K=int(sys.argv[2]); a=nf*k//K; b=nf*(k+1)//K
ff=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','image2pipe','-framerate',str(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','fast','-crf','17','-pix_fmt','yuv420p',f'part{k}.mp4'],stdin=subprocess.PIPE)
with sync_playwright() as p:
    br=p.chromium.launch(executable_path='/opt/pw-browsers/chromium'); pg=br.new_page(viewport={'width':1920,'height':1080}); pg.goto('file://'+os.path.abspath('film_ai.html')); cv=pg.locator('canvas'); pg.evaluate(f'renderAt({a/FPS})')
    for f in range(a,b): pg.evaluate(f'renderAt({f/FPS})'); ff.stdin.write(cv.screenshot(type='jpeg',quality=95))
    br.close()
ff.stdin.close(); ff.wait(); print('part',k,'frames',b-a)
