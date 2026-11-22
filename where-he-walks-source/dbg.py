import os,sys
from playwright.sync_api import sync_playwright
os.chdir(os.path.dirname(os.path.abspath(__file__)))
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']); pg=b.new_page(viewport={'width':1920,'height':1080}); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)[:300])); pg.goto('file://'+os.path.abspath('run_h.html'))
    pg.evaluate('window.EYE=0'); pg.evaluate('renderAt(164.05)')
    print(pg.evaluate("JSON.stringify({rx:JES.r.robe.rotation.x,s:JES.r.robe.scale.toArray(),p:JES.r.robe.position.toArray(),sit:JES.r.hips.position.y})"))
    print(errs)
    b.close()
