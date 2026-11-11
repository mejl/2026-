import json
PER=60/141.98; PH=.359; TOTAL=84.8
snap=lambda t: round(PH+round((t-PH)/PER)*PER,3)
TL=[(0,'intro','cut',{}),(6.94,'map','zoom',{}),(8.6,'book','whipL',{}),(10.3,'map','whipL',{}),(12.06,'book','whipU',{}),(12.86,'huh','flash',{'td':.12,'kb':0}),(13.5,'tunnel','slash',{'td':.5,'shake':.6,'kb':0}),
(22.7,'holy','star',{'td':.4,'shake':1}),(25.38,'stand','stripes',{'td':.36,'shake':1}),(28.16,'hand','whipU',{'shake':1}),(31.26,'promised','zoom',{}),(32.5,'land','flash',{'td':.1,'kb':0,'punch':0}),
(35.66,'pharaoh','glitch',{'shake':1}),(37.68,'babylon','whipU',{'shake':1}),(39.34,'stone','spin',{'td':.25}),(40.16,'burn','flash',{'td':.15,'shake':2}),(40.82,'ret','star',{'td':.35,'shake':1}),
(43.0,'forever','zoomOut',{'td':.5,'kb':0,'punch':0})]
c0=snap(61.4-16*2*PER)
TRS=['shutter','whipL','star','spin','stripes','zoom','glitch','whipU','flash','blinds','slash','star','zoomOut','whipL','spin','stripes']
for i in range(16): TL.append((round(c0+i*2*PER,3),'card%d'%i,TRS[i],{'td':.4 if i==0 else .26,'shake':1.2}))
TL+=[(61.4,'crownS','star',{'td':.4,'shake':1}),(66.46,'stands','stripes',{'td':.36,'shake':1}),(69.2,'stone','spin',{'td':.25}),(70.4,'burn','flash',{'td':.15,'shake':2}),(71.38,'ret','star',{'td':.35,'shake':1})]
rec=['holy','card1','stand','card11','crownS','card8','stands','card13','ret']; t=snap(76.0); RT=['glitch','whipL','zoom','blinds','spin','whipU','stripes','slash','star']
for i,s in enumerate(rec): TL.append((round(t+i*PER,3),s,RT[i],{'td':.2,'shake':1.5}))
TL.append((round(t+len(rec)*PER,3),'finale','star',{'td':.3,'shake':1})); TL.append((83.78,'black','cut',{}))
TLj=[dict(t0=a,s=s,tr=tr,**o) for a,s,tr,o in TL]
def L(a,b,words,rows=None,**o): return dict(a=a,b=b,w=[[t,w] for t,w in words],rows=rows,**o)
LY=[L(6.94,8.5,[(6.94,'CHECK'),(7.46,'THE'),(7.56,'MAP.')],y=420),L(8.6,10.2,[(8.6,'CHECK'),(9.12,'THE'),(9.24,'BOOK.')],y=430),L(10.3,11.95,[(10.3,'CHECK'),(10.82,'THE'),(10.94,'MAP.')],y=420),L(12.06,12.84,[(12.06,'CHECK'),(12.52,'THE'),(12.62,'BOOK.')],y=430),
L(22.7,25.3,[(22.7,'HOLY'),(23.18,'LAND!')],big=230,y=-120),L(25.38,28.1,[(25.38,'STILL'),(25.47,'WE'),(25.56,'STAND!')],big=190,y=-200),L(28.16,31.2,[(28.16,"GOD'S"),(28.64,'OWN'),(28.96,'HAND!')],big=190,y=330),L(31.26,32.48,[(31.3,'PROMISED'),(31.9,'LAND!')],big=180,y=-60),
L(35.66,37.66,[(35.66,'PHARAOH'),(36.14,'TRIED'),(36.46,'IT,'),(36.66,'LOST'),(36.86,'HIS'),(37.08,'CROWN!')],rows=['PHARAOH TRIED IT,','LOST HIS CROWN!'],big=130,y=-330),
L(37.68,39.3,[(37.68,'BABYLON'),(37.9,'WENT'),(38.54,'STRAIGHT'),(38.72,'DOWN!')],rows=['BABYLON','WENT STRAIGHT DOWN!'],big=140,y=-300),
L(39.34,40.14,[(39.34,'TOUCH'),(39.47,'THE'),(39.6,'STONE,')],big=170,y=-360),L(40.16,40.8,[(40.16,'WATCH'),(40.3,'IT'),(40.5,'BURN!')],big=200,y=-300,col='#f6c343'),
L(40.86,43.0,[(40.92,'KING'),(41.12,'MESSIAH'),(41.5,'WILL'),(41.94,'RETURN!')],rows=['KING MESSIAH','WILL RETURN!'],big=170,y=120,col='#f6c343'),
L(44.0,47.2,[(44.06,'ISRAEL.'),(45.56,'FOREVER.')],rows=['ISRAEL.','FOREVER.'],big=230,y=0),
L(61.4,64.6,[(61.4,'CROWN'),(62.56,'OF'),(63.72,'GOLD!')],big=190,y=380),L(64.64,66.4,[(64.64,'TRUTH'),(64.88,'BE'),(65.3,'TOLD!')],big=190,y=380),
L(66.46,67.5,[(66.46,'ISRAEL'),(67.12,'STANDS!')],big=190,y=-330),L(67.52,69.15,[(67.52,'NEVER'),(68.48,'FOLD!')],big=220,y=-330),
L(69.2,70.38,[(69.2,'TOUCH'),(69.5,'THE'),(69.9,'STONE,')],big=170,y=-360),L(70.4,71.34,[(70.4,'WATCH'),(70.72,'IT'),(70.9,'BURN!')],big=200,y=-300,col='#f6c343'),
L(71.38,75.9,[(71.38,'KING'),(71.52,'MESSIAH'),(71.96,'WILL'),(72.34,'RETURN!')],rows=['KING MESSIAH','WILL RETURN!'],big=170,y=120,col='#f6c343')]
json.dump(dict(TL=TLj,LY=LY,total=TOTAL),open('data.json','w'))
print(len(TLj),'scenes; cards start',c0)
