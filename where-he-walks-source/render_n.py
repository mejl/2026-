import json,os,sys,subprocess,base64
from playwright.sync_api import sync_playwright
os.chdir(os.path.dirname(os.path.abspath(__file__)))
# native 1920x1080 single-camera render: python3 render_n.py worker K
FPS=30; SEG=150; d=json.load(open('data.json')); nf=int(d['total']*FPS); k=int(sys.argv[1]); K=int(sys.argv[2]); nseg=(nf+SEG-1)//SEG
todo=[s for s in range(nseg) if s%K==k and not os.path.exists(f'seg_N{s:03d}.mp4')]
if todo:
  with sync_playwright() as p:
    br=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']); pg=br.new_page(viewport={'width':1920,'height':1080}); pg.goto('file://'+os.path.abspath('run_h.html'))
    pg.evaluate('window.EYE=0')
    for s in todo:
        a=s*SEG; b=min(nf,a+SEG); tmp=f'tmp_N{s:03d}.mp4'
        ff=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','image2pipe','-framerate',str(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','fast','-crf','13','-pix_fmt','yuv420p',tmp],stdin=subprocess.PIPE)
        for f in range(a,b):
            pg.evaluate(f'renderAt({f/FPS})'); ff.stdin.write(base64.b64decode(pg.evaluate("document.getElementById('c').toDataURL('image/jpeg',0.96)").split(',',1)[1]))
        ff.stdin.close(); ff.wait(); os.rename(tmp,f'seg_N{s:03d}.mp4'); print('seg N',s,flush=True)
    br.close()
