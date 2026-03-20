/**
 * RAPPER: "Freight"
 * Lines 38–40: "freight train / break the whole game / etched in fire and flame"
 * Pose: full sprint lean-forward, one fist pumped back, one forward,
 *       head down charging, mic trailing behind in raised fist
 * Palette: dark charcoal + orange fire accents
 */
(function () {
  'use strict';

  const C = {
    skin:'#d4895a', skinD:'#b06030',
    shirt:'#1a0a00', shirtHL:'#cc4400', shirtFire:'#ff6600',
    pants:'#0a0500', shoe:'#1a0800',
    chain:'#ffcc00', chainD:'#cc9900',
    mic:'#888866', micH:'#ccccaa',
    fire1:'#ff6600', fire2:'#ffaa00', fire3:'#ffee00',
    outline:'#000', white:'#fffde0',
    sweat:'rgba(255,200,100,0.4)',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  // Head tilted down and forward — charging
  function drawHead(ctx, bx, by, tiltFwd, mouthOpen) {
    ctx.save();
    ctx.translate(bx, by-30);
    ctx.rotate(tiltFwd||0.18); // always tilted forward
    rect(ctx,-7,-6,14,13,C.skin,C.outline);
    rect(ctx,-7,-6,14, 3,'#1a0a00');
    // intense charging eyes — wide open
    rect(ctx,-5,-1, 4, 3,C.outline);
    rect(ctx, 1,-1, 4, 3,C.outline);
    rect(ctx,-4, 0, 2, 2,C.white);
    rect(ctx, 2, 0, 2, 2,C.white);
    rect(ctx,-3, 0, 1, 2,'#111'); // pupils forward
    rect(ctx, 3, 0, 1, 2,'#111');
    if (mouthOpen) {
      rect(ctx,-4, 4, 8, 3,C.outline);
      rect(ctx,-3, 4, 6, 1,C.white);
    } else {
      rect(ctx,-3, 4, 6, 1,C.outline);
    }
    // sweat drops
    rect(ctx, 6,-3, 2, 3,C.sweat);
    rect(ctx,-8, 0, 2, 4,C.sweat);
    ctx.restore();
  }

  function drawShirt(ctx, bx, by, leanFwd) {
    leanFwd=leanFwd||0;
    rect(ctx,bx-8+leanFwd,by-22,16,18,C.shirt,C.outline);
    // fire graphic on chest
    rect(ctx,bx-3+leanFwd,by-20, 2, 6,C.fire1);
    rect(ctx,bx-1+leanFwd,by-22, 3, 8,C.fire2);
    rect(ctx,bx+2+leanFwd,by-21, 2, 7,C.fire1);
    rect(ctx,bx-2+leanFwd,by-23, 1, 4,C.fire3); // flame tip
    rect(ctx,bx+1+leanFwd,by-24, 1, 4,C.fire3);
    // chain flying back (motion)
    rect(ctx,bx-6+leanFwd,by-19, 6, 1,C.chain);
    rect(ctx,bx-8+leanFwd,by-17, 6, 1,C.chain);
  }

  // Sprint legs — one forward, one back
  function drawLegsRun(ctx, bx, by, phase) {
    phase=phase||0;
    const fwd = Math.sin(phase)*8;
    const bwd = Math.cos(phase)*6;
    // forward leg
    rect(ctx,bx-2+fwd, by-6, 6, 8,C.pants,C.outline);
    rect(ctx,bx-2+fwd, by+2, 5, 6,C.pants,C.outline);
    rect(ctx,bx-3+fwd, by+8, 8, 4,C.shoe);
    // back leg
    rect(ctx,bx-4-bwd, by-4, 6, 7,C.pants,C.outline);
    rect(ctx,bx-2-bwd, by+3, 5, 5,C.pants,C.outline);
    rect(ctx,bx-3-bwd, by+8, 7, 4,C.shoe);
  }

  // Forward punch arm — low and driving
  function drawArmPunchFwd(ctx, bx, by, punchX) {
    punchX=punchX||0;
    rect(ctx,bx+8+punchX, by-20, 10, 5,C.skin,C.outline);
    rect(ctx,bx+16+punchX,by-22,  8, 5,C.skin,C.outline);
    // fist
    rect(ctx,bx+22+punchX,by-23,  6, 5,C.skin,C.outline);
    rect(ctx,bx+22+punchX,by-22,  6, 2,C.skinD); // knuckles
  }

  // Back arm — mic trailing up behind
  function drawArmMicBack(ctx, bx, by, trailY) {
    trailY=trailY||0;
    rect(ctx,bx-14, by-22-trailY, 6, 8,C.skin,C.outline);
    rect(ctx,bx-16, by-30-trailY, 5, 9,C.skin,C.outline);
    // mic raised and trailing
    rect(ctx,bx-16, by-40-trailY, 3,12,C.mic,C.outline);
    circle(ctx,bx-15,by-41-trailY, 4,  C.micH,C.outline);
  }

  // Motion blur streaks behind character
  function drawMotionLines(ctx, bx, by) {
    ctx.strokeStyle='rgba(255,100,0,0.15)';
    ctx.lineWidth=3;
    for(let i=0;i<5;i++){
      const ly = by-15+i*7;
      ctx.beginPath();
      ctx.moveTo(bx-30-i*10, ly);
      ctx.lineTo(bx-16, ly);
      ctx.stroke();
    }
    ctx.strokeStyle='rgba(255,200,0,0.08)';
    ctx.lineWidth=6;
    ctx.beginPath();
    ctx.moveTo(bx-60, by-8);
    ctx.lineTo(bx-18, by-8);
    ctx.stroke();
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=0;
    const runPhase = frameT*Math.PI*4;

    if (mode==='idle') {
      const bob = Math.abs(Math.sin(frameT*Math.PI*2))*2;
      drawMotionLines(ctx,bx,by);
      drawLegsRun(ctx,bx,by-bob,runPhase*0.5);
      drawShirt(ctx,bx,by-bob,4);
      drawArmMicBack(ctx,bx+4,by-bob,2);
      drawArmPunchFwd(ctx,bx+4,by-bob,2);
      drawHead(ctx,bx+4,by-bob,0.18,false);

    } else if (mode==='hype') {
      const bob  = Math.abs(Math.sin(frameT*Math.PI*4))*4;
      const punch= Math.abs(Math.sin(frameT*Math.PI*4))*6;
      drawMotionLines(ctx,bx,by-bob);
      drawLegsRun(ctx,bx,by-bob,runPhase);
      drawShirt(ctx,bx,by-bob,5);
      drawArmMicBack(ctx,bx+5,by-bob,3+punch*0.3);
      drawArmPunchFwd(ctx,bx+5,by-bob,punch);
      drawHead(ctx,bx+5,by-bob,0.2,bob>3);

    } else { // spit — full sprint freeze
      drawMotionLines(ctx,bx,by);
      drawLegsRun(ctx,bx,by,Math.PI*0.3);
      drawShirt(ctx,bx,by,6);
      drawArmMicBack(ctx,bx+6,by,4);
      drawArmPunchFwd(ctx,bx+6,by,10);
      drawHead(ctx,bx+6,by,0.22,true);
    }
    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['freight']={
    id:'freight', label:'Freight — full sprint, fire shirt, fists pumping',
    lineAssignments:[38,39,40],
    draw:drawRapper,
    modeForLine(i){return i<=39?'hype':'spit';}
  };
})();
