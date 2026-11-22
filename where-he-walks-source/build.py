import json,os
files='lib.js,rig.js,city.js,sea.js,ancient.js,world.js,world2.js,crowds.js,shotlib.js,shots_a.js,shots_b.js,shots_c.js,shots_d.js'.split(',')
dat=open('data.json').read()
html='<!doctype html><meta charset="utf-8"><body style="margin:0;background:#000"><canvas id="c" width="1920" height="1080"></canvas><script>window.GWOVR=1280;const D=%s; D.lyr=()=>"soft";</script><script src="three.min.js"></script>%s</body>'%(dat,''.join('<script src="%s"></script>'%f for f in files)); open('run_h.html','w').write(html)
