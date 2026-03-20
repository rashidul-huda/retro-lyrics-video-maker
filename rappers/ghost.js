/**
 * RAPPER: "Ghost"
 * Lines 47–50: "Brutally honest / ain't no survivors left" (×2)
 * Pose: completely still except for slow head turn, one arm pointing
 *       straight down like a death sentence, other arm folded behind back,
 *       face half-shadowed — pure menace
 * Palette: all matte black, silver chain, one gold eye visible
 */
(function () {
  'use strict';

  const C = {
    skin:'#c07040', skinD:'#8a4a20',
    black:'#0a0a0a', blackHL:'#1a1a1a', blackD:'#050505',
    chain:'#cccccc', chainD:'#888888', chainHL:'#ffffff', // silver
    mic:'#666666', micH:'#999999',
    eye1:'#ffcc00', eye2:'#000000', // one gold eye, one black
    outline:'#000', white:'#fffde0',
    shadow:'rgba(0,0,0,0.7)',
    mist:'rgba(100,100,120,0.15)',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  // Mist wisps around feet
  function drawMist(ctx, bx, by) {
    for(let i=0;i<6;i++){
      const mx = bx-20+i*8;
      ctx.fillStyle=C.mist;
      ctx.fillRect(mx, by+8, 12, 4);
      ctx.fillRect(mx+3, by+6, 6, 3);
    }
  }

  function drawHead(ctx, bx, by, turnX, reveal) {
    // Half shadow over face
    rect(ctx,bx-7,by-38,14,14,C.skin,C.outline);
    rect(ctx,bx-7,by-38,14, 3,C.black);
    rect(ctx,bx-7,by-38, 3,14,C.black); // shadow half
    rect(ctx,bx-6,by-37, 2,12,'rgba(0,0,0,0.8)');
    // visible (right) side eye — gold
    if(reveal>0.3){
      rect(ctx,bx+1,by-30, 4, 2,C.outline);
      rect(ctx,bx+2,by-29, 2, 1,C.eye1);
      rect(ctx,bx+3,by-30, 1, 1,C.eye2);
    }
    // shadow side (left) eye — barely visible
    ctx.globalAlpha=0.3;
    rect(ctx,bx-5,by-30, 4, 2,C.outline);
    ctx.globalAlpha=1;
    // tight closed mouth — no expression
    rect(ctx,bx-1,by-25, 4, 1,C.outline);
    // silver chain at neck
    rect(ctx,bx-2,by-26, 5, 1,C.chainHL);
  }

  function drawBlackFit(ctx, bx, by) {
    // All-black turtleneck + coat
    rect(ctx,bx-9,by-22,18,20,C.black,C.outline);
    rect(ctx,bx-9,by-22, 2,20,C.blackHL); // subtle edge
    rect(ctx,bx+7,by-22, 2,20,C.blackHL);
    // turtleneck collar
    rect(ctx,bx-6,by-24,12, 4,C.blackHL,C.outline);
    // silver chain (single heavy)
    rect(ctx,bx-5,by-20,10, 1,C.chainHL);
    rect(ctx,bx-4,by-18, 8, 1,C.chain);
    rect(ctx,bx-3,by-16, 6, 1,C.chain);
    rect(ctx,bx-2,by-14, 4, 1,C.chainD);
    // pendant
    circle(ctx,bx,by-12,3,C.chainHL,C.outline);
    rect(ctx,bx-1,by-13,2,2,C.chain);
  }

  function drawLegs(ctx, bx, by) {
    rect(ctx,bx-7,by-4, 6,13,C.black,C.outline);
    rect(ctx,bx-7,by+9, 7, 4,C.blackD,C.outline);
    rect(ctx,bx+1,by-4, 6,13,C.black,C.outline);
    rect(ctx,bx,  by+9, 7, 4,C.blackD,C.outline);
  }

  // Left arm pointing straight down — death sentence
  function drawArmPointDown(ctx, bx, by, extendY) {
    extendY=extendY||0;
    rect(ctx,bx-14, by-22, 5,10,C.skin,C.outline);
    rect(ctx,bx-13, by-12, 4, 9,C.skin,C.outline);
    // pointing finger extended down
    rect(ctx,bx-12, by-3+extendY, 3,10,C.skin,C.outline);
    rect(ctx,bx-11, by+7+extendY, 2, 5,C.skin,C.outline);
    // ring
    rect(ctx,bx-12, by+0+extendY, 3, 1,C.chainHL);
  }

  // Right arm folded behind back — mic in hand, hidden
  function drawArmBehind(ctx, bx, by) {
    // barely visible behind body
    ctx.globalAlpha=0.5;
    rect(ctx,bx+8, by-20, 5,16,C.black,C.outline);
    rect(ctx,bx+9, by-5,  4, 8,C.skin, C.outline);
    ctx.globalAlpha=1;
    // mic handle just peeking
    rect(ctx,bx+10,by+3,  3, 6,C.mic,  C.outline);
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=0;

    if (mode==='idle') {
      const breathe = Math.sin(frameT*Math.PI*1.2)*1; // very slow
      const reveal  = 0.4+Math.abs(Math.sin(frameT*Math.PI*0.8))*0.2;
      drawMist(ctx,bx,by+breathe);
      drawLegs(ctx,bx,by+breathe*0.2);
      drawBlackFit(ctx,bx,by+breathe*0.3);
      drawArmBehind(ctx,bx,by+breathe*0.3);
      drawArmPointDown(ctx,bx,by+breathe*0.3, breathe);
      drawHead(ctx,bx,by+breathe,0,reveal);

    } else if (mode==='hype') {
      const pulse  = Math.abs(Math.sin(frameT*Math.PI*2));
      const extend = pulse*4;
      drawMist(ctx,bx,by);
      drawLegs(ctx,bx,by);
      drawBlackFit(ctx,bx,by);
      drawArmBehind(ctx,bx,by);
      drawArmPointDown(ctx,bx,by,extend);
      drawHead(ctx,bx,by,0,0.5+pulse*0.3);

    } else { // spit — point fully extended, head turns to reveal
      drawMist(ctx,bx,by);
      drawLegs(ctx,bx,by);
      drawBlackFit(ctx,bx,by);
      drawArmBehind(ctx,bx,by);
      drawArmPointDown(ctx,bx,by,6);
      drawHead(ctx,bx,by,0,0.9);
    }
    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['ghost']={
    id:'ghost', label:'Ghost — all black, arm pointing down, gold eye reveal',
    lineAssignments:[47,48,49,50],
    draw:drawRapper,
    modeForLine(i){return 'hype';}
  };
})();
