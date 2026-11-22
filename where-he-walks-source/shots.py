import json,os,sys,time
from playwright.sync_api import sync_playwright
from PIL import Image
ts=[float(x) for x in sys.argv[1].split(',')]; out=sys.argv[2]; cols=int(sys.argv[3]); gw=sys.argv[4] if len(sys.argv)>4 else '1280'
files=os.environ.get('FILES','lib.js,rig.js,city.js,test.js').split(',')
dat=open('data.json').read(); ex=open('exp.json').read() if os.path.exists('exp.json') and not os.environ.get('NOEXP') else '{}'; st=open('stereo.json').read() if os.path.exists('stereo.json') else '{}'; eye=os.environ.get('EYE','0')
html='<!doctype html><meta charset="utf-8"><body style="margin:0;background:#000"><canvas id="c" width="1920" height="1080"></canvas><script>window.GWOVR=%s;const D=%s; window.EXPT=%s; window.STT=%s; window.EYE=%s; D.lyr=()=>"soft";</script><script src="three.min.js"></script>%s</body>'%(gw,dat,ex,st,eye,''.join('<script src="%s"></script>'%f for f in files)); open('run_h.html','w').write(html)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']); pg=b.new_page(viewport={'width':1920,'height':1080}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:400])); pg.on('console',lambda m: errs.append(m.text[:300]) if m.type in('error','warning') else None)
    pg.goto('file://'+os.path.abspath('run_h.html')); fs=[]
    for i,t in enumerate(ts):
        t0=time.time()
        try: pg.evaluate(f'renderAt({t})')
        except Exception as e: errs.append(f't={t} '+str(e)[:500])
        f=f'/tmp/n_{i}.jpg'; pg.locator('#c').screenshot(path=f,type='jpeg',quality=85); fs.append(f); print('t',t,'%.1fs'%(time.time()-t0),flush=True)
    print('errors',errs[:8]); b.close()
tw=1920//cols; th=tw*9//16; g=Image.new('RGB',(tw*cols,th*((len(fs)+cols-1)//cols)))
for i,f in enumerate(fs): g.paste(Image.open(f).resize((tw,th)),((i%cols)*tw,(i//cols)*th))
g.save(out)
