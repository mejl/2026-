import glob,json,os,sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))
base=open('../movie/film.html').read()
eng=open('engine_ai.js').read()
beats=''.join(open(f).read()+'\n' for f in sorted(glob.glob('beats_*.js')))
sched=open(sys.argv[1] if len(sys.argv)>1 else 'schedule.json').read()
marker='window.renderAt(0);'
i=base.rindex(marker)
html=base[:i]+eng+'\n'+beats+'\n'+base[i:]
html=html.replace('const SCH = __SCHEDULE__;','const SCH = '+sched+';',1)
SC=float(os.environ.get('SC','1.5'))
html=html.replace('<canvas id="c" width="1280" height="720">','<canvas id="c" width="%d" height="%d">'%(round(1280*SC),round(720*SC)),1)
html=html.replace('setTransform(1,0,0,1,0,0)','setTransform(%s,0,0,%s,0,0)'%(SC,SC))
import re
html=re.sub(r"(OFF\d?)\.width=W; (OFF\d?)\.height=H;",lambda m:"%s.width=Math.round(W*%s); %s.height=Math.round(H*%s);"%(m.group(1),SC,m.group(2),SC),html)
html=re.sub(r"drawImage\((OFF\d?),0,0\)",r"drawImage(\1,0,0,W,H)",html)
html=html.replace("X.drawImage(c,0,0); X.restore(); }","X.drawImage(c,0,0,W,H); X.restore(); }")
html=html.replace("X.drawImage(useNext?OFF2:OFF1,0,y0,W,H/n+1,","X.drawImage(useNext?OFF2:OFF1,0,y0*%s,W*%s,(H/n+1)*%s,"%(SC,SC,SC))
open('film_ai.html','w').write(html)
print('built film_ai.html',len(html)//1024,'KB')
