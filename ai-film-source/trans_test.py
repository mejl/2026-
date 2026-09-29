import os,sys,json
from playwright.sync_api import sync_playwright
from PIL import Image
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium'); pg=b.new_page(viewport={'width':1280,'height':720})
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e))); pg.goto('file://'+os.path.abspath('film_ai.html'))
    info=pg.evaluate("()=>{ renderAt(0); return TL.map(b=>({k:b.k,start:b.start,id:b.shot.id,tr:b.tr&&b.tr.type,dur:b.tr&&b.tr.dur})); }")
    trs=[x for x in info if x['tr'] and x['k']>0][:int(sys.argv[1]) if len(sys.argv)>1 else 6]
    rows=[]; os.makedirs('strip',exist_ok=True)
    for r,x in enumerate(trs):
        row=[]
        for j,pp in enumerate([-.1,.15,.35,.55,.75,.95,1.1]):
            t=x['start']+pp*x['dur']; pg.evaluate(f'renderAt({t})'); f=f'strip/t{r}_{j}.jpg'; pg.locator('canvas').screenshot(path=f,type='jpeg',quality=60); row.append(f)
        rows.append((x,row))
    print('errors',errs[:3],[(x['id'],x['tr']) for x,_ in rows])
g=Image.new('RGB',(7*256,len(rows)*144))
for r,(x,row) in enumerate(rows):
    for j,f in enumerate(row): g.paste(Image.open(f).resize((256,144)),(j*256,r*144))
g.save('strip/trans.jpg')
