/**
 * RAPPER: "Battle"
 * Pose: aggressive battle stance, one finger extended pointing dead at camera,
 *       mic in other hand held sideways, leaning into the opponent's face
 * Animations: idle (slow menacing lean), hype (rapid point jabs), spit (full lunge point)
 */
(function () {
  'use strict';

  const C = {
    skin:'#c87840', skinD:'#9a5020', skinHL:'#e09060',
    shirt:'#111111', shirtD:'#050505',
    pants:'#cc2200', pantsD:'#881100', // red cargos
    shoe:'#111',
    chain:'#ffcc00', chainD:'#aa8800',
    mic:'#888866', micH:'#ccccaa',
    ring:'#ffcc00',
    outline:'#000', white:'#fffde0',
    bandana:'#cc2200', bandanaD:'#881100',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  function drawHead(ctx, bx, by, tiltFwd, snarl) {
    ctx.save();
    ctx.translate(bx, by-32);
    ctx.rotate(tiltFwd||0);
    rect(ctx,-7,-6,14,14,C.skin,C.outline);
    // bandana tied on head (top only)
    rect(ctx,-7,-6,14, 5,C.bandana);
    // bandana knot back
    rect(ctx, 6,-5, 3, 4,C.bandanaD);
    // intense brow furrow
    rect(ctx,-6,-1, 5, 1,C.outline);
    rect(ctx, 1,-1, 5, 1,C.outline);
    rect(ctx,-5,-2, 3, 1,C.outline); // brow inner
    rect(ctx, 2,-2, 3, 1,C.outline);
    // narrow eyes
    rect(ctx,-5, 0, 4, 2,C.outline);
    rect(ctx, 1, 0, 4, 2,C.outline);
    rect(ctx,-4, 0, 2, 1,C.white);
    rect(ctx, 2, 0, 2, 1,C.white);
    // snarl with teeth bared
    if (snarl) {
      rect(ctx,-4, 4, 8, 3,C.outline);
      rect(ctx,-3, 4, 2, 1,C.white);
      rect(ctx, 0, 4, 2, 1,C.white);
      rect(ctx,-1, 4, 2, 1,C.chain);
    } else {
      rect(ctx,-3, 4, 6, 2,C.outline);
    }
    ctx.restore();
  }

  function drawShirt(ctx, bx, by, leanX) {
    leanX=leanX||0;
    rect(ctx, bx-8+leanX, by-22, 16, 18, C.shirt, C.outline);
    // graphic tee detail
    rect(ctx, bx-5+leanX, by-18,  3,  3, '#cc2200'); // graphic
    rect(ctx, bx-2+leanX, by-18,  4,  3, '#cc2200');
    rect(ctx,  bx+2+leanX,by-18, 2,  3, '#cc2200');
    // chain
    rect(ctx, bx-4+leanX, by-19,  8,  1, C.chain);
    rect(ctx, bx-3+leanX, by-17,  6,  1, C.chain);
    rect(ctx, bx-1+leanX, by-15,  2,  2, C.chainD);
  }

  function drawLegs(ctx, bx, by, stance) {
    stance=stance||0;
    // wide battle stance
    rect(ctx, bx-9-stance, by-4, 7, 13, C.pants, C.outline);
    rect(ctx, bx-9-stance, by-4, 2, 13, C.pantsD);
    rect(ctx, bx-10-stance,by+9, 9,  4, C.shoe);
    rect(ctx, bx+2+stance, by-4, 7, 13, C.pants, C.outline);
    rect(ctx, bx+7+stance, by-4, 2, 13, C.pantsD);
    rect(ctx, bx+1+stance, by+9, 9,  4, C.shoe);
  }

  // Pointing arm — right, extended dead forward with aggression
  function drawArmPoint(ctx, bx, by, extendX, extendY) {
    extendX=extendX||0; extendY=extendY||0;
    // upper arm forward-diagonal
    rect(ctx, bx+8,        by-20-extendY, 8+extendX, 5, C.skin, C.outline);
    // forearm continues
    rect(ctx, bx+14+extendX,by-22-extendY, 8, 5, C.skin, C.outline);
    // fist + extended index finger
    rect(ctx, bx+20+extendX,by-23-extendY, 6, 5, C.skin, C.outline);
    rect(ctx, bx+25+extendX,by-24-extendY, 6, 3, C.skin, C.outline); // pointing finger
    // ring flash
    rect(ctx, bx+21+extendX,by-21-extendY, 2, 1, C.ring);
    rect(ctx, bx+23+extendX,by-21-extendY, 2, 1, C.ring);
  }

  // Mic arm — left, held at mouth
  function drawArmMic(ctx, bx, by, leanX) {
    leanX=leanX||0;
    rect(ctx, bx-14+leanX, by-22, 6, 9,  C.skin, C.outline);
    rect(ctx, bx-13+leanX, by-14, 5, 8,  C.skin, C.outline);
    // mic horizontal at mouth level
    rect(ctx, bx-12+leanX, by-6, 3, 10,  C.mic, C.outline);
    circle(ctx, bx-11+leanX, by-7, 4,    C.micH, C.outline);
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=0;

    if (mode==='idle') {
      // menacing slow lean forward and back
      const lean = Math.sin(frameT*Math.PI*2)*2;
      const ext  = Math.abs(Math.sin(frameT*Math.PI*2))*3;
      drawLegs(ctx, bx, by, 3);
      drawShirt(ctx, bx, by, lean);
      drawArmMic(ctx, bx+lean, by, lean);
      drawArmPoint(ctx, bx+lean, by, ext, 0);
      drawHead(ctx, bx+lean*1.2, by, 0.06+lean*0.01, lean>1);

    } else if (mode==='hype') {
      // rapid jab points
      const jab   = Math.abs(Math.sin(frameT*Math.PI*5))*10;
      const bob   = Math.abs(Math.sin(frameT*Math.PI*5))*3;
      drawLegs(ctx, bx, by-bob, 4);
      drawShirt(ctx, bx, by-bob, jab*0.2);
      drawArmMic(ctx, bx+jab*0.2, by-bob, jab*0.2);
      drawArmPoint(ctx, bx+jab*0.2, by-bob, jab, 1);
      drawHead(ctx, bx+jab*0.25, by-bob, 0.08, true);

    } else { // spit — full lunge, all-in point
      const lunge = 6;
      drawLegs(ctx, bx, by, 5);
      drawShirt(ctx, bx, by, lunge);
      drawArmMic(ctx, bx+lunge, by, lunge);
      drawArmPoint(ctx, bx+lunge, by, 12, 2);
      drawHead(ctx, bx+lunge*1.3, by, 0.12, true);
    }

    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['battle']={
    id:'battle', label:'Battle — finger point, red cargos, bandana',
    lineAssignments:[21,22,23,24],
    draw:drawRapper,
    modeForLine(i){ return i<=23?'hype':'spit'; }
  };
})();
