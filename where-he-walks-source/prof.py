import os,time
from playwright.sync_api import sync_playwright
os.chdir(os.path.dirname(os.path.abspath(__file__)))
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']); pg=b.new_page(viewport={'width':1920,'height':1080}); pg.goto('file://'+os.path.abspath('run_h.html'))
    pg.evaluate('window.EYE=0')
    def run(label,js):
        pg.evaluate(js); ts=[]
        for t in [30,64,100,150,218.5,235]:
            t0=time.time(); pg.evaluate(f'renderAt({t})'); pg.evaluate("document.getElementById('c').toDataURL('image/jpeg',0.9).length"); ts.append(time.time()-t0)
        print(label,'%.2f'%(sum(ts[1:])/5),[round(x,1) for x in ts],flush=True)
    run('warm','1'); 
    run('all on','window.SHADOWS=1;window.DOF=1;window.SHARP=1')
    run('no shadows','window.SHADOWS=0;window.DOF=1;window.SHARP=1')
    run('no dof','window.SHADOWS=1;window.DOF=0;window.SHARP=1')
    run('no sharp','window.SHADOWS=1;window.DOF=1;window.SHARP=0')
    run('none','window.SHADOWS=0;window.DOF=0;window.SHARP=0')
    b.close()
