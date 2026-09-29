import json,os,sys
from playwright.sync_api import sync_playwright
from PIL import Image
# usage: shots_ai.py "a01,a02" step out.jpg   |   trans: shots_ai.py T "time1,time2,..." out.jpg
mode=sys.argv[1]
sch=json.load(open('schedule_test.json' if os.environ.get('TEST') else 'schedule.json'))
def times():
    if mode=='T': return [float(x) for x in sys.argv[2].split(',')]
    ids=mode.split(','); step=float(sys.argv[2]); ts=[]
    for s in sch['scenes']:
        if s['id'] in ids:
            t=s['start']+.3
            while t<s['end']-.2: ts.append(t); t+=step
    return ts
ts=times(); out=sys.argv[3]; os.makedirs('strip',exist_ok=True); files=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium'); pg=b.new_page(viewport={'width':1920,'height':1080})
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m: errs.append('LOG '+m.text) if m.type=='error' else None)
    pg.goto('file://'+os.path.abspath('film_ai.html'))
    for i,t in enumerate(ts):
        pg.evaluate(f'renderAt({t})'); f=f'strip/x{i:03d}.jpg'; pg.locator('canvas').screenshot(path=f,type='jpeg',quality=65); files.append(f)
    print('errors',errs[:4],len(files))
im=[Image.open(x).resize((320,180)) for x in files]; g=Image.new('RGB',(320*6,180*((len(im)+5)//6)))
for i,m in enumerate(im): g.paste(m,((i%6)*320,(i//6)*180))
g.save(out)
