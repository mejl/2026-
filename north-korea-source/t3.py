import sys,time,os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']); pg=b.new_page(viewport={'width':1920,'height':1080}); er=[]; pg.on('pageerror',lambda e:er.append(str(e)[:300]))
    for res in sys.argv[1:]:
        pg.goto('file://'+os.path.abspath('t3.html')+'#'+res); pg.reload(); pg.evaluate('renderAt(0)'); t0=time.time()
        for i in range(6): pg.evaluate(f'renderAt({1+i*.21})'); pg.evaluate("document.getElementById('c').toDataURL('image/jpeg',0.95).length")
        print(res,(time.time()-t0)/6,er[:3]); pg.locator('#c').screenshot(path=f't3_{res}.jpg',type='jpeg',quality=85)
