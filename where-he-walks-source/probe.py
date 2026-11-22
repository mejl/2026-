import json,os,sys
from playwright.sync_api import sync_playwright
os.chdir(os.path.dirname(os.path.abspath(__file__)))
k=int(sys.argv[1]); K=int(sys.argv[2]); out=sys.argv[3]; d=json.load(open('data.json')); TL=d['TL']; tot=d['total']
us=[.08,.3,.5,.7,.92]; res={}
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']); pg=b.new_page(viewport={'width':1920,'height':1080}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:300])); pg.goto('file://'+os.path.abspath('run_h.html'))
    pg.evaluate('window.EYE=0')
    for i,c in enumerate(TL):
        if i%K!=k: continue
        t1=TL[i+1]['t0'] if i+1<len(TL) else tot; r=[]
        for u in us:
            t=c['t0']+(t1-c['t0'])*u; pg.evaluate(f'renderAt({t})'); r.append(pg.evaluate('__depth()'))
        res[c['s']]=r; print(c['s'],[(round(x['near'],1),round(x['med'],1)) for x in r],flush=True)
    print('errs',errs[:3]); b.close()
json.dump(res,open(out,'w'))
