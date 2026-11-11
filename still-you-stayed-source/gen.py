import json
TOTAL=219.16
TL=[(0,'intro'),(12.2,'walls'),(18.8,'crown'),(24.9,'sold'),(31.5,'cold'),(37.6,'thorns'),(43.2,'turned'),(49.5,'stayed1',{'flash':.45}),(55.6,'arms'),(61.2,'scars'),(64.5,'called'),(67.5,'bleed'),(74.2,'far'),
(85.8,'kiss'),(92.0,'denial'),(97.3,'ran'),(103.0,'looked'),(109.3,'forgive'),(112.7,'dontknow'),(121.9,'storm',{'flash':.45}),(128.2,'armsClose'),(134.1,'scars',{'v':1}),(137.4,'called',{'v':1}),(140.4,'bleed',{'v':1}),(147.2,'short'),
(149.6,'deathlife'),(152.2,'depth'),(155.1,'side'),(157.8,'tomb',{'flash':.4}),(163.1,'ran2'),(170.5,'kneel',{'flash':.5}),(177.0,'tear'),(182.6,'snow'),(185.8,'letgo'),(189.0,'walk'),(198.2,'outro',{'td':2.5})]
TLj=[dict(t0=x[0],s=x[1],**(x[2] if len(x)>2 else {})) for x in TL]
LY=[(12.5,18.6,"I built my walls, I made my bed"),(19.0,24.8,"Wore every lie like a crown on my head"),(25.1,31.0,"Sold what was holy for silver and gold"),(32.0,37.2,"Called it freedom, but I was cold"),(38.0,43.0,"I gave You thorns, I gave You nails"),(43.4,49.2,"I turned away, I watched You fail"),
(49.9,55.4,"Still You stayed, still You stayed",1),(55.8,61.0,"Arms wide open in the pain"),(61.4,64.4,"I was the reason for the scars"),(64.7,67.4,"Still You called me from the dark"),(67.7,73.8,"What kind of love would bleed for me?"),(74.7,77.5,"Still You stayed",1),
(86.4,91.5,"Thirty silver for a kiss"),(93.1,96.9,"Three denials, a clenched fist"),(97.7,102.4,"All Your friends ran in the night"),(103.4,108.6,"You looked at them with love, not spite"),(109.7,112.6,"Father, forgive, I heard You say"),(112.8,119.9,"They don't know, they don't know"),
(122.4,128.0,"Still You stayed, still You stayed",1),(128.4,134.0,"Arms wide open in the pain"),(134.3,137.3,"I was the reason for the scars"),(137.6,140.3,"Still You called me from the dark"),(140.6,146.8,"What kind of love would bleed for me?"),(147.6,149.5,"Still You stayed",1),
(149.8,152.1,"Not death, not life"),(152.3,155.0,"Not depth, not height"),(155.2,157.8,"Nothing tears me from Your side"),(158.0,162.6,"The stone is rolled, the grave is bare"),(163.5,169.2,"I ran from You, and You were there"),
(171.1,176.9,"Still You stay, still You stay",1),(177.2,182.5,"Every tear You wipe away"),(182.8,185.7,"Scarlet sins made white as snow"),(185.9,189.0,"Love that will not let me go"),(189.2,195.6,"What kind of love would die for me?"),(196.2,199.5,"Still You stay",1)]
json.dump(dict(TL=TLj,LY=[dict(a=a,b=b,text=t,hook=bool(h)) for a,b,t,*h in LY],total=TOTAL),open('data.json','w'))
print(len(TLj))
