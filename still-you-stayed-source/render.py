import json,os,sys,subprocess,base64
from playwright.sync_api import sync_playwright
os.chdir(os.path.dirname(os.path.abspath(__file__)))
FPS=24; SEG=120; d=json.load(open('data.json')); nf=int(d['total']*FPS); v=sys.argv[1]; k=int(sys.argv[2]); K=int(sys.argv[3]); nseg=(nf+SEG-1)//SEG
w,h=(1920,1080)
todo=[s for s in range(nseg) if s%K==k and not os.path.exists(f'seg_{v}{s:03d}.mp4')]
if todo:
  with sync_playwright() as p:
    br=p.chromium.launch(executable_path='/opt/pw-browsers/chromium'); pg=br.new_page(viewport={'width':w,'height':h}); pg.goto('file://'+os.path.abspath(f'run_{v}.html'))
    for s in todo:
        a=s*SEG; b=min(nf,a+SEG); tmp=f'tmp_{v}{s:03d}.mp4'
        ff=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','image2pipe','-framerate',str(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','fast','-crf','14','-pix_fmt','yuv420p',tmp],stdin=subprocess.PIPE)
        for f in range(a,b):
            pg.evaluate(f'renderAt({f/FPS})'); ff.stdin.write(base64.b64decode(pg.evaluate("document.getElementById('c').toDataURL('image/jpeg',0.95)").split(',',1)[1]))
        ff.stdin.close(); ff.wait(); os.rename(tmp,f'seg_{v}{s:03d}.mp4'); print('seg',v,s,flush=True)
    br.close()
