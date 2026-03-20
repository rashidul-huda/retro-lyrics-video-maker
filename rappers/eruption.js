/**
 * RAPPER: "Eruption"
 * Line 41: "When the dust finally settles, nothing's ever gonna be the same!"
 * Pose: full body explosion — both arms flung wide at 45° angles,
 *       legs bent in impact stance, head thrown back screaming into the mic
 *       like a rock-rap moment of pure release
 * Palette: torn sleeveless tee, battle-worn, light burst from chest
 */
(function () {
  'use strict';

  const C = {
    skin:'#d4895a', skinD:'#b06030', skinHL:'#f0b080',
    tee:'#1a0a00', teeHL:'#3a1a00', teeRip:'#0a0400',
    pants:'#222211', shoe:'#111100',
    chain:'#ffcc00', chainD:'#cc9900',
    mic:'#aaaaaa', micH:'#ddddcc',
    burst1:'#ffee00', burst2:'#ffaa00', burst3:'#ff6600',
    outline:'#000', white:'#fffde0',
    sweat:'rgba(255,220,100,0.5)',
    vein:'#aa3300', // neck vein detail
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  // Burst rays from centre-chest
  function drawBurst(ctx, bx, by, intensity) {
    const rays = 12;
    ctx.strokeStyle=C.burst2;
    for(let i=0;i<rays;i++){
      const angle = (i/rays)*Math.PI*2;
      const len = 20+intensity*10;
      const x1 = bx+Math.cos(angle)*8;
      const y1 = by-12+Math.sin(angle)*8;
      const x2 = bx+Math.cos(angle)*len;
      const y2 = by-12+Math.sin(angle)*len;
      ctx.strokeStyle=i%3===0?C.burst1:i%3===1?C.burst2:C.burst3;
      ctx.lineWidth=2;
      ctx.globalAlpha=0.35+intensity*0.2;
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    }
    ctx.globalAlpha=1;
  }

  function drawHead(ctx, bx, by, tiltBack) {
    ctx.save();
    ctx.translate(bx, by-33);
    ctx.rotate(tiltBack||0);
    rect(ctx,-7,-6,14,14,C.skin,C.outline);
    rect(ctx,-7,-6,14, 3,'#1a0a00');
    // screaming wide open eyes
    rect(ctx,-5,-1, 4, 4,C.outline);
    rect(ctx, 1,-1, 4, 4,C.outline);
    rect(ctx,-4, 0, 2, 3,C.white);
    rect(ctx, 2, 0, 2, 3,C.white);
    rect(ctx,-3, 0, 2, 2,'#333');
    rect(ctx, 2, 0, 2, 2,'#333');
    // wide open mouth — screaming / singing
    rect(ctx,-5, 4, 10, 5,C.outline);
    rect(ctx,-4, 4,  8, 2,C.white);
    rect(ctx,-3, 5,  6, 2,'#333'); // dark mouth interior
    rect(ctx,-2, 4,  2, 1,C.chain); // gold tooth
    // neck vein
    rect(ctx,-8, 3,  2, 5,C.vein);
    // sweat
    rect(ctx, 6,-3,  2, 4,C.sweat);
    rect(ctx,-9, 1,  2, 5,C.sweat);
    ctx.restore();
  }

  function drawTee(ctx, bx, by, expandY) {
    expandY=expandY||0;
    // sleeveless torn tee
    rect(ctx,bx-7,by-22,14,20,C.tee,C.outline);
    // torn rip lines
    rect(ctx,bx-3,by-10, 2, 8,C.teeRip);
    rect(ctx,bx+1,by-12, 2, 6,C.teeRip);
    rect(ctx,bx-5,by-15, 1, 5,C.teeRip);
    // chain multiple layers flying apart
    rect(ctx,bx-6,by-19, 5, 1,C.chain);
    rect(ctx,bx+1,by-18, 5, 1,C.chain);
    rect(ctx,bx-4,by-16, 3, 1,C.chainD);
    rect(ctx,bx+2,by-15, 3, 1,C.chainD);
  }

  // Impact stance legs — both bent, weight spread
  function drawLegsImpact(ctx, bx, by, bend) {
    bend=bend||0;
    rect(ctx,bx-12, by-4+bend, 8, 8,C.pants,C.outline);
    rect(ctx,bx-14, by+4+bend, 8, 6,C.pants,C.outline);
    rect(ctx,bx-15, by+10+bend,10, 4,C.shoe);
    rect(ctx,bx+4,  by-4+bend, 8, 8,C.pants,C.outline);
    rect(ctx,bx+6,  by+4+bend, 8, 6,C.pants,C.outline);
    rect(ctx,bx+5,  by+10+bend,10, 4,C.shoe);
  }

  // Left arm flung wide-down at ~45° 
  function drawArmWideLeft(ctx, bx, by, flingY) {
    flingY=flingY||0;
    rect(ctx,bx-20,by-20+flingY, 10, 5,C.skin,C.outline);
    rect(ctx,bx-28,by-16+flingY,  9, 5,C.skin,C.outline);
    // open hand splayed
    rect(ctx,bx-35,by-14+flingY,  8, 6,C.skin,C.outline);
    for(let i=0;i<4;i++) rect(ctx,bx-35+i*2,by-20+flingY,2,7,C.skin,C.outline);
    // muscle on arm
    rect(ctx,bx-21,by-22+flingY, 4, 3,C.skinHL);
  }

  // Right arm flung wide-up holding mic 
  function drawArmWideRight(ctx, bx, by, flingY) {
    flingY=flingY||0;
    rect(ctx,bx+10,by-22-flingY, 10, 5,C.skin,C.outline);
    rect(ctx,bx+18,by-26-flingY,  9, 5,C.skin,C.outline);
    // mic up high
    rect(ctx,bx+24,by-40-flingY,  3,16,C.mic,C.outline);
    circle(ctx,bx+25,by-41-flingY, 5,C.micH,C.outline);
    rect(ctx,bx+11,by-24-flingY,  4, 3,C.skinHL);
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=4;

    if (mode==='idle') {
      const pulse = Math.abs(Math.sin(frameT*Math.PI*2));
      const fling = pulse*4;
      drawBurst(ctx,bx,by,pulse*0.5);
      drawLegsImpact(ctx,bx,by,0);
      drawTee(ctx,bx,by);
      drawArmWideLeft(ctx,bx,by,fling*0.5);
      drawArmWideRight(ctx,bx,by,fling);
      drawHead(ctx,bx,by,-0.15+pulse*0.05);

    } else if (mode==='hype') {
      const pulse = Math.abs(Math.sin(frameT*Math.PI*3));
      const fling = 4+pulse*8;
      const bob   = pulse*4;
      drawBurst(ctx,bx,by-bob,pulse);
      drawLegsImpact(ctx,bx,by-bob,bob*0.3);
      drawTee(ctx,bx,by-bob);
      drawArmWideLeft(ctx,bx,by-bob,fling*0.4);
      drawArmWideRight(ctx,bx,by-bob,fling);
      drawHead(ctx,bx,by-bob,-0.18);

    } else { // spit — peak explosion freeze
      drawBurst(ctx,bx,by,1);
      drawLegsImpact(ctx,bx,by,3);
      drawTee(ctx,bx,by);
      drawArmWideLeft(ctx,bx,by,6);
      drawArmWideRight(ctx,bx,by,12);
      drawHead(ctx,bx,by,-0.2);
    }
    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['eruption']={
    id:'eruption', label:'Eruption — arms flung wide, burst rays, screaming',
    lineAssignments:[41],
    draw:drawRapper,
    modeForLine(i){return 'spit';}
  };
})();
