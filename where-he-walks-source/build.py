import json,os
files='lib.js,rig.js,city.js,sea.js,ancient.js,world.js,world2.js,crowds.js,shotlib.js,shots_a.js,shots_b.js,shots_c.js,shots_d.js'.split(',')
dat=open('data.json').read(); ex=open('exp.json').read() if os.path.exists('exp.json') else '{}'; st=open('stereo.json').read() if os.path.exists('stereo.json') else '{}'
html='<!doctype html><meta charset="utf-8"><body style="margin:0;background:#000"><canvas id="c" width="1920" height="1080"></canvas><script>window.GWOVR=1920;const D=%s; window.EXPT=%s; window.STT=%s; D.lyr=()=>"soft";</script><script src="three.min.js"></script>%s</body>'%(dat,ex,st,''.join('<script src="%s"></script>'%f for f in files)); open('run_h.html','w').write(html)
