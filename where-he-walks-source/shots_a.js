// ===== INTRO + CHORUS 1 : the dark city, and the light that begins to walk =====
const JZ1=t=>24-JV*(t-14.38);     // Jesus' path in chorus 1 (walks away from camera down the street)
SC.i1=function(lt,len,t){ stage('city'); base({hemi:.5,moon:.7,fd:.016}); const u=lt/len; wanderer(t,{z:-1.5,pose:sitPose(.85)}); auxOn(-3.2,3.2,-.5,22); CITYDEF(t,{sign:Math.sin(t*9)>.96?.05:0});
  rain(t,1,0,4,[[-6,5,-5,6,[.5,.6,1],.5]]); camMove(u,[2.4,1.15,22,-3.8,1.3,0,38],[-1.2,1.05,8,-5,.95,-6,34],'lin'); return {bloom:.55,warm:0,grain:.13,ov:titleOv}; };
SC.i2=function(lt,len,t){ stage('city'); base({hemi:.5,moon:.6,fd:.02}); const u=lt/len, look=sm(.62,.95,u); wanderer(t,{z:-1.5,pose:Object.assign(sitPose(.85-.5*look),{tr:[.5-.2*look,0,0]})}); auxOn(-2.4,2.8,.6,18); CITYDEF(t,{sign:Math.sin(t*7)>.93?.06:0});
  jlight(-3.6,1.6,-30,60*sm(.5,1,u),0xffc880); rain(t,1,-5,0,[[-5.5,1.4,-1.5,3,[1,.78,.42],.9*sm(.5,1,u)]]);
  camMove(u,[-2.4,1.0,2.6,-5.6,.95,-1.5,32],[-3.2,1.05,.8,-5.6,1.0,-1.5,28]); return {bloom:.6,warm:.05*u,grain:.13,rays:[W*.5,H*.4,.15*u]}; };
SC.c1a=function(lt,len,t){ stage('city'); base({hemi:.5,moon:.7}); const jz=JZ1(t), u=lt/len; wanderer(t,{z:-14}); jes(.9,jz,Math.PI,t); jlight(.9,1.5,jz-.5,30); CITYDEF(t,{jz,trail:1,win:.12,sign:0});
  litRain(t,1,.9,jz); footprints(t,14.38,.9,24,JV); camMove(u,[-1.6,2.3,jz+12,1.4,1.3,jz-8,40],[-.6,1.9,jz+8,1,1.3,jz-8,36],'lin'); return {bloom:.6,warm:.1,rays:[W*.54,H*.5,.4]}; };
SC.c1b=function(lt,len,t){ stage('city'); base({hemi:.4,moon:.5}); const jz=JZ1(t), u=lt/len; wanderer(t,{z:-14}); jes(.9,jz,Math.PI,t); jlight(.9,1.2,jz-.4,26); CITYDEF(t,{jz,trail:1,win:.12});
  footprints(t,14.38,.9,24,JV,-1,3,1.2); litRain(t,1,.9,jz,.6,4); camMove(u,[2.6,.28,jz+2.6,.9,.12,jz-.7,30],[2.2,.32,jz+1.6,.9,.14,jz-1.2,30],'lin'); return {bloom:.7,warm:.2,grain:.12,rays:[W*.5,H*.5,.3]}; };
SC.c1c=function(lt,len,t){ stage('city'); base({hemi:.5,moon:.6}); const jz=JZ1(t), u=lt/len; wanderer(t,{z:-14}); jes(.9,jz,Math.PI,t); jlight(.9,1.5,jz-.5,30); CITYDEF(t,{jz,trail:1,win:.12});
  footprints(t,14.38,.9,24,JV); litRain(t,1,.9,jz); camMove(u,[5.4,1.5,jz+2.4,-.5,1.35,jz-.4,34],[5.0,1.4,jz-.6,-.5,1.35,jz-1.4,32],'lin'); return {bloom:.6,warm:.15,rays:[W*.46,H*.5,.35]}; };
SC.c1d=function(lt,len,t){ stage('city'); base({hemi:.5,moon:.6}); const jz=JZ1(t), u=lt/len; wanderer(t,{z:-14}); jes(.9,jz,Math.PI,t); jlight(.9,1.5,jz-.5,30); CITYDEF(t,{jz,trail:1,win:.12});
  footprints(t,14.38,.9,24,JV); litRain(t,1,.9,jz); camMove(u,[-.9,.75,jz+3.4,1.4,1.1,jz-6,44],[.4,.7,jz+2.4,1.1,1.1,jz-6,40]); return {bloom:.65,warm:.2,rays:[W*.55,H*.45,.4]}; };
SC.c1e=function(lt,len,t){ stage('city'); base({hemi:.5,moon:.6}); const jz=JZ1(t), u=lt/len; wanderer(t,{z:-14}); jes(.9,jz,Math.PI,t); jlight(.9,1.5,jz-.5,30); CITYDEF(t,{jz,trail:1,win:.12});
  footprints(t,14.38,.9,24,JV); litRain(t,1,.9,jz); camMove(u,[3,1.3,jz+6,.9,1.3,jz,36],[7,15,jz+24,.9,0,jz-8,46]); return {bloom:.65,warm:.2,rays:[W*.5,H*.5,.3]}; };
SC.c1f=function(lt,len,t){ stage('city'); base({hemi:.5,moon:.6}); const jz=JZ1(t), u=lt/len; wanderer(t,{z:-14}); jes(.9,jz,Math.PI,t); jlight(.9,1.5,jz-.5,30); CITYDEF(t,{jz,trail:1,win:.12});
  footprints(t,14.38,.9,24,JV); litRain(t,1,.9,jz); camMove(u,[-3.6,1.0,-6.5,-1,1.1,-30,34],[-3.4,.95,-9.5,-1.5,1.05,-30,30],'lin'); return {bloom:.65,warm:.2,rays:[W*.55,H*.5,.4]}; };
SC.c1g=function(lt,len,t){ stage('city'); base({hemi:.5,moon:.6}); const jz=JZ1(t), u=lt/len; wanderer(t,{z:-14}); jes(.9,jz,Math.PI,t); jlight(.9,1.5,jz-.5,30); const sg=sm(0,.95,(t-47)/9.6);
  CITYDEF(t,{jz,trail:1,win:.15,sign:sg,cross:sm(.8,1,u),rose:sm(.9,1,u),dawn:0}); footprints(t,14.38,.9,24,JV); litRain(t,1,.9,jz); camMove(u,[-1.8,1.4,jz+9,.4,2.3,-60,40],[-.4,1.6,jz+5.5,.4,3.6,-60,32]); return {bloom:.7,warm:.2+.2*u,rays:[W*.5,H*.38,.35],flare:[W*.5,H*.38,.5*sg]}; };
SC.tj=function(lt,len,t){ stage('city'); base({hemi:.5,moon:.6}); jes(0,0,Math.PI*(lt<4?1:lt<8?.5:.0),t); jlight(0,1.5,lt<8?-.7:3,28); CITYDEF(t,{}); const k=lt<4?0:lt<8?1:2; cam(k==0?[1.4,1.4,5]:k==1?[4.4,1.2,.4]:[1.2,1.5,5.2],[0,1.0,0],30); return {bloom:.5,warm:.1}; };
