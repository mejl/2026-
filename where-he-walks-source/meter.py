import json,os,sys,subprocess
from playwright.sync_api import sync_playwright
os.chdir(os.path.dirname(os.path.abspath(__file__)))
k=int(sys.argv[1]); K=int(sys.argv[2]); out=sys.argv[3]; d=json.load(open('data.json')); TL=d['TL']; tot=d['total']
fr=[0,.25,.5,.75,1]; res={}
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']); pg=b.new_page(viewport={'width':1920,'height':1080}); pg.goto('file://'+os.path.abspath('run_h.html'))
    for i,c in enumerate(TL):
        if i%K!=k: continue
        t1=TL[i+1]['t0'] if i+1<len(TL) else tot; L=t1-c['t0']; r=[]; a0=min(.65,L*.2); a1=min(.55,L*.2)
        for f in fr:
            t=c['t0']+a0+(L-a0-a1)*f; pg.evaluate(f'renderAt({t})'); m_=pg.evaluate('__meter()'); m_.append((t-c['t0'])/L); r.append(m_)
        res[c['s']]=r; print(c['s'],[round(x[0],1) for x in r],flush=True)
    b.close()
json.dump(res,open(out,'w'))
