import json,os,sys
from playwright.sync_api import sync_playwright
from PIL import Image
ts=[float(x) for x in sys.argv[1].split(',')]; out=sys.argv[2]; cols=int(sys.argv[3]) if len(sys.argv)>3 else 4
html=open('main.html').read().replace('__DATA__',open('data.json').read()); open('run.html','w').write(html)
ARGS=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=ARGS); pg=b.new_page(viewport={'width':1920,'height':1080}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:300])); pg.on('console',lambda m: errs.append(m.text[:200]) if m.type=='error' else None)
    pg.goto('file://'+os.path.abspath('run.html')); fs=[]
    for i,t in enumerate(ts):
        try: pg.evaluate(f'renderAt({t})')
        except Exception as e: errs.append(f't={t} '+str(e)[:400])
        f=f'/tmp/s2_{i}.jpg'; pg.locator('#out').screenshot(path=f,type='jpeg',quality=80); fs.append(f)
    print('errors',errs[:6]); b.close()
w=1920//cols; h=w*9//16; g=Image.new('RGB',(w*cols,h*((len(fs)+cols-1)//cols)))
for i,f in enumerate(fs): g.paste(Image.open(f).resize((w,h)),((i%cols)*w,(i//cols)*h))
g.save(out)
