import json,math
T=json.load(open('../atlas/package/countries-50m.json')); sc=T['transform']['scale']; tr=T['transform']['translate']
arcs=[]
for a in T['arcs']:
    x=y=0; pts=[]
    for dx,dy in a: x+=dx; y+=dy; pts.append((x*sc[0]+tr[0],y*sc[1]+tr[1]))
    arcs.append(pts)
LON0,LAT1,K=15,65,1920/135; KY=K/math.cos(math.radians(35))
pr=lambda p:(((p[0]+360 if p[0]<-100 else p[0])-LON0)*K,(LAT1-p[1])*KY)
def ring(r):
    pts=[]
    for i in r:
        a=arcs[i] if i>=0 else arcs[~i][::-1]
        pts+= a[1:] if pts else a
    return pts
out=[]
for g in T['objects']['countries']['geometries']:
    polys=g['arcs'] if g['type']=='MultiPolygon' else [g['arcs']]
    rs=[]
    for poly in polys:
        p=[pr(q) for q in ring(poly[0])]
        xs=[q[0] for q in p]; ys=[q[1] for q in p]
        if max(xs)<-20 or min(xs)>1940 or max(ys)<-20 or min(ys)>1100 or max(xs)-min(xs)>2600: continue
        s=[p[0]]
        for q in p[1:]:
            if abs(q[0]-s[-1][0])+abs(q[1]-s[-1][1])>1.6: s.append(q)
        if len(s)>3: rs.append([round(v) for q in s for v in q])
    if rs: out.append([int(g.get('id',0) or 0),rs])
open('map.js','w').write('const MAPD='+json.dumps(out,separators=(',',':'))+';const MAPP={LON0:%s,LAT1:%s,K:%s,KY:%s};'%(LON0,LAT1,K,KY))
print(len(out), any(i==643 for i,_ in out))
