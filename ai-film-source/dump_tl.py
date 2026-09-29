import os,json
from playwright.sync_api import sync_playwright
os.chdir(os.path.dirname(os.path.abspath(__file__)))
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium'); pg=b.new_page(viewport={'width':1280,'height':720})
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e))); pg.goto('file://'+os.path.abspath('film_ai.html'))
    tl=pg.evaluate("()=>{ renderAt(0); return TL.map(b=>({k:b.k,id:b.shot.id,start:b.start,end:b.end,tr:b.tr?{type:b.tr.type,dur:b.tr.dur}:null})); }")
    json.dump(tl,open('tl.json','w')); print('beats',len(tl),'errors',errs[:2])
