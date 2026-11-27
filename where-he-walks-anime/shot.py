import sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium'); pg=b.new_page(viewport={'width':1920,'height':1080}); pg.goto('file://'+sys.argv[1]); pg.wait_for_timeout(800); pg.locator('#c').screenshot(path=sys.argv[2]); b.close()
