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
open('film_ai.html','w').write(html)
print('built film_ai.html',len(html)//1024,'KB')
