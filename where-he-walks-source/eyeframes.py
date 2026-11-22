import json,os,sys
import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright
os.chdir(os.path.dirname(os.path.abspath(__file__)))
ts=[float(x) for x in sys.argv[1].split(',')]; tag=sys.argv[2]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']); pg=b.new_page(viewport={'width':1920,'height':1080}); pg.goto('file://'+os.path.abspath('run_h.html'))
    for i,t in enumerate(ts):
        for e,nm in ((-1,'L'),(1,'R')):
            pg.evaluate(f'window.EYE={e}'); pg.evaluate(f'renderAt({t})'); pg.locator('#c').screenshot(path=f'rev/{tag}_{i}_{nm}.png')
    b.close()
ML=np.array([[.437,.449,.164],[-.062,-.062,-.024],[-.048,-.05,-.017]]); MR=np.array([[-.011,-.032,-.007],[.377,.761,.009],[-.026,-.093,1.234]])
rows=[]
for i,t in enumerate(ts):
    L=np.asarray(Image.open(f'rev/{tag}_{i}_L.png').convert('RGB')).astype(float)/255; R=np.asarray(Image.open(f'rev/{tag}_{i}_R.png').convert('RGB')).astype(float)/255
    A=np.clip(L@ML.T+R@MR.T,0,1); a=(A*255).astype(np.uint8); Image.fromarray(a).resize((960,540)).save(f'rev/{tag}_{i}_ana.jpg',quality=88)
    # disparity map via simple block matching on luma (rough, for numbers)
    import cv2
    gl=cv2.cvtColor((L*255).astype(np.uint8),cv2.COLOR_RGB2GRAY); gr=cv2.cvtColor((R*255).astype(np.uint8),cv2.COLOR_RGB2GRAY)
    sg=cv2.StereoSGBM_create(minDisparity=-120,numDisparities=240,blockSize=7); dp=sg.compute(cv2.resize(gl,(960,540)),cv2.resize(gr,(960,540))).astype(float)/16*2
    v=dp[(dp>-240)&(dp<240)]; print(t,'disparity px@1920 p2/p50/p98:',np.percentile(v,[2,50,98]).round(1) if len(v) else None)
