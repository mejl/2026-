import json,os,sys,subprocess,base64
from playwright.sync_api import sync_playwright
os.chdir(os.path.dirname(os.path.abspath(__file__)))
# usage: render3d.py worker K   -> renders jobs j where j%K==worker; jobs = all left segments first, then all right segments
FPS=30; SEG=150; d=json.load(open('data.json')); nf=int(d['total']*FPS); k=int(sys.argv[1]); K=int(sys.argv[2]); nseg=(nf+SEG-1)//SEG
jobs=[('L',s) for s in range(nseg)]+[('R',s) for s in range(nseg)]
todo=[(e,s) for j,(e,s) in enumerate(jobs) if j%K==k and not os.path.exists(f'seg_{e}{s:03d}.mp4')]
if len(sys.argv)>3: todo=[(x.split(':')[0],int(x.split(':')[1])) for x in sys.argv[3].split(',')]
if todo:
  with sync_playwright() as p:
    br=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']); pg=br.new_page(viewport={'width':1920,'height':1080}); pg.goto('file://'+os.path.abspath('run_h.html'))
    for e,s in todo:
        pg.evaluate('window.EYE=%d'%(-1 if e=='L' else 1))
        a=s*SEG; b=min(nf,a+SEG); tmp=f'tmp_{e}{s:03d}.mp4'
        ff=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','image2pipe','-framerate',str(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','fast','-crf','14','-pix_fmt','yuv420p',tmp],stdin=subprocess.PIPE)
        for f in range(a,b):
            pg.evaluate(f'renderAt({f/FPS})'); ff.stdin.write(base64.b64decode(pg.evaluate("document.getElementById('c').toDataURL('image/jpeg',0.95)").split(',',1)[1]))
        ff.stdin.close(); ff.wait(); os.rename(tmp,f'seg_{e}{s:03d}.mp4'); print('seg',e,s,flush=True)
    br.close()
