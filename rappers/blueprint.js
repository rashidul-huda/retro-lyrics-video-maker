/**
 * RAPPER: "Blueprint"
 * Lines 34–37: "co-sign / standout / blueprint mapped out / tap out"
 * Pose: one arm extended pointing at invisible blueprint board,
 *       other hand holding mic behind back like a professor making a point
 * Palette: dark navy workwear, rolled sleeves, pencil behind ear
 */
(function () {
  'use strict';

  const C = {
    skin:'#f5c98a', skinD:'#d4915a', hair:'#1a0a00',
    shirt:'#001a55', shirtD:'#000e33', shirtHL:'#002a88',
    rollSleeve:'#e8d080', // rolled sleeve lining — architect vibe
    pants:'#001133', shoe:'#000a22',
    chain:'#ffcc00', chainD:'#cc9900',
    mic:'#888866', micH:'#ccccaa',
    pencil:'#ffee44', pencilTip:'#cc8844',
    pointer:'#eeeecc', // pointing finger
    outline:'#000', white:'#fffde0',
    blueprint:'#0044cc', bpLine:'#88aaff',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  function drawHead(ctx, bx, by, mouthOpen) {
    rect(ctx,bx-7,by-38,14,14,C.skin,C.outline);
    rect(ctx,bx-7,by-38,14, 3,C.hair);
    // pencil behind ear (signature detail)
    rect(ctx,bx+6,by-36, 2, 7,C.pencil);
    rect(ctx,bx+6,by-30, 2, 2,C.pencilTip);
    // focused/determined eyes
    rect(ctx,bx-5,by-30, 4, 2,C.outline);
    rect(ctx,bx+1,by-30, 4, 2,C.outline);
    rect(ctx,bx-4,by-29, 2, 1,C.white);
    rect(ctx,bx+2,by-29, 2, 1,C.white);
    rect(ctx,bx-3,by-30, 1, 1,'#333');
    rect(ctx,bx+3,by-30, 1, 1,'#333');
    // slight knowing smirk
    if (mouthOpen) {
      rect(ctx,bx-3,by-25, 6, 2,C.outline);
      rect(ctx,bx-2,by-25, 4, 1,C.white);
    } else {
      rect(ctx,bx-2,by-25, 5, 1,C.outline);
      rect(ctx,bx+1,by-25, 2, 1,C.chain); // gold tooth
    }
  }

  function drawShirt(ctx, bx, by, lean) {
    lean=lean||0;
    rect(ctx,bx-8+lean,by-22,16,18,C.shirt,C.outline);
    // rolled-up sleeves visible edges
    rect(ctx,bx-14+lean,by-12, 6, 4,C.rollSleeve,C.outline);
    rect(ctx,bx+8+lean, by-12, 6, 4,C.rollSleeve,C.outline);
    // subtle button placket
    rect(ctx,bx-1+lean, by-22, 2,18,C.shirtHL);
    // chain
    rect(ctx,bx-4+lean,by-19, 8, 1,C.chain);
    rect(ctx,bx-3+lean,by-17, 6, 1,C.chain);
    rect(ctx,bx-1+lean,by-15, 2, 2,C.chainD);
  }

  function drawLegs(ctx, bx, by) {
    rect(ctx,bx-7,by-4, 6,13,C.pants,C.outline);
    rect(ctx,bx-7,by+9, 7, 4,C.shoe);
    rect(ctx,bx+1,by-4, 6,13,C.pants,C.outline);
    rect(ctx,bx,  by+9, 7, 4,C.shoe);
  }

  // Right arm extended forward pointing at board
  function drawArmPoint(ctx, bx, by, extendX, extendY) {
    extendX=extendX||0; extendY=extendY||0;
    rect(ctx,bx+8,          by-20-extendY, 9+extendX, 5,C.skin,C.outline);
    rect(ctx,bx+14+extendX, by-22-extendY, 8,         5,C.skin,C.outline);
    // extended index finger pointing
    rect(ctx,bx+20+extendX, by-23-extendY, 5,         4,C.skin,C.outline);
    rect(ctx,bx+24+extendX, by-24-extendY, 5,         3,C.pointer,C.outline);
    // rolled sleeve cuff
    rect(ctx,bx+9,          by-14,         5,         3,C.rollSleeve);
  }

  // Left arm — mic held behind / at side like professor
  function drawArmMicBehind(ctx, bx, by) {
    rect(ctx,bx-14,by-22, 5,12,C.skin,C.outline);
    rect(ctx,bx-13,by-11, 4, 8,C.skin,C.outline);
    // mic held loosely at side
    rect(ctx,bx-12,by-4,  3,11,C.mic, C.outline);
    circle(ctx,bx-11,by-5,4,   C.micH,C.outline);
    // rolled sleeve
    rect(ctx,bx-13,by-14, 5, 3,C.rollSleeve);
  }

  // Blueprint board floating to the right (visual gag)
  function drawBoard(ctx, bx, by, flash) {
    const brdX = bx+34, brdY = by-28;
    rect(ctx,brdX,   brdY,   28,20,C.blueprint,C.outline);
    // grid lines on board
    ctx.strokeStyle=C.bpLine; ctx.lineWidth=0.5;
    for(let i=1;i<4;i++){
      ctx.beginPath(); ctx.moveTo(brdX+i*7,brdY); ctx.lineTo(brdX+i*7,brdY+20); ctx.stroke();
    }
    for(let i=1;i<3;i++){
      ctx.beginPath(); ctx.moveTo(brdX,brdY+i*7); ctx.lineTo(brdX+28,brdY+i*7); ctx.stroke();
    }
    // blueprint drawing lines
    ctx.strokeStyle=C.bpLine; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(brdX+2,brdY+10); ctx.lineTo(brdX+26,brdY+10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(brdX+6,brdY+4);  ctx.lineTo(brdX+6, brdY+18); ctx.stroke();
    if(flash){ // highlight flash
      ctx.fillStyle='rgba(136,170,255,0.2)';
      ctx.fillRect(brdX,brdY,28,20);
    }
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=0;

    if (mode==='idle') {
      const sway = Math.sin(frameT*Math.PI*2)*1.5;
      const ext  = 3+Math.sin(frameT*Math.PI*2)*2;
      drawBoard(ctx,bx,by,false);
      drawLegs(ctx,bx+sway*0.2,by);
      drawShirt(ctx,bx,by,sway*0.3);
      drawArmMicBehind(ctx,bx+sway*0.3,by);
      drawArmPoint(ctx,bx+sway*0.3,by,ext,1);
      drawHead(ctx,bx+sway,by,false);

    } else if (mode==='hype') {
      const jab   = Math.abs(Math.sin(frameT*Math.PI*3))*8;
      const bob   = Math.abs(Math.sin(frameT*Math.PI*3))*3;
      const flash = jab>6;
      drawBoard(ctx,bx,by,flash);
      drawLegs(ctx,bx,by-bob);
      drawShirt(ctx,bx,by-bob,0);
      drawArmMicBehind(ctx,bx,by-bob);
      drawArmPoint(ctx,bx,by-bob,jab,2);
      drawHead(ctx,bx,by-bob,jab>5);

    } else { // spit — double-tap point
      drawBoard(ctx,bx,by,true);
      drawLegs(ctx,bx,by);
      drawShirt(ctx,bx,by,2);
      drawArmMicBehind(ctx,bx+2,by);
      drawArmPoint(ctx,bx+2,by,12,3);
      drawHead(ctx,bx+2,by,true);
    }
    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['blueprint']={
    id:'blueprint', label:'Blueprint — navy shirt, pencil ear, pointing at board',
    lineAssignments:[34,35,36,37],
    draw:drawRapper,
    modeForLine(i){return i<=36?'hype':'spit';}
  };
})();
