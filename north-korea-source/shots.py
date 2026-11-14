import json,os,sys
from playwright.sync_api import sync_playwright
from PIL import Image
ts=[float(x) for x in sys.argv[1].split(',')]; out=sys.argv[2]; cols=int(sys.argv[3]); V=len(sys.argv)>4
w,h=(1080,1920) if V else (1920,1080)
html='<!doctype html><meta charset="utf-8"><body style="margin:0;background:#000"><canvas id="c" width="%d" height="%d"></canvas><script>const D=%s;</script><script src="three.min.js"></script><script src="world.js"></script><script src="map.js"></script><script src="core_a.js"></script><script src="g3.js"></script><script src="scenes.js"></script><script src="core_b.js"></script></body>'%(w,h,open('data.json').read()); fn='run_v.html' if V else 'run_h.html'; open(fn,'w').write(html)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']); pg=b.new_page(viewport={'width':w,'height':h}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:300])); pg.on('console',lambda m: errs.append(m.text[:200]) if m.type=='error' else None)
    pg.goto('file://'+os.path.abspath(fn)); fs=[]
    for i,t in enumerate(ts):
        try: pg.evaluate(f'renderAt({t})')
        except Exception as e: errs.append(f't={t} '+str(e)[:300])
        f=f'/tmp/n_{i}.jpg'; pg.locator('#c').screenshot(path=f,type='jpeg',quality=80); fs.append(f)
    print('errors',errs[:6]); b.close()
tw=1920//cols; th=tw*h//w; g=Image.new('RGB',(tw*cols,th*((len(fs)+cols-1)//cols)))
for i,f in enumerate(fs): g.paste(Image.open(f).resize((tw,th)),((i%cols)*tw,(i//cols)*th))
g.save(out)
