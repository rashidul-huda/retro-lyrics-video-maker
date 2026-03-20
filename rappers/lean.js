/**
 * RAPPER: "Lean"
 * Pose: body leaned way back, arms spread wide like wings, pure drip energy
 * Animations: idle (slow lean rock), hype (arms flap wide), spit (snap forward)
 */
(function () {
  'use strict';

  const C = {
    skin:'#f5c98a', skinD:'#d4915a', hair:'#1a0a00',
    shirt:'#0055cc', shirtD:'#003388',   // ice blue
    pants:'#111122', shoe:'#222244',
    chain:'#ffcc00', chainD:'#cc9900',
    mic:'#888866', micH:'#ccccaa',
    outline:'#000', white:'#fffde0',
    sunglassFrame:'#111', sunglassLens:'#002244',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  function drawHead(ctx, bx, by, mouthOpen) {
    rect(ctx, bx-7, by-38, 14, 14, C.skin, C.outline);
    rect(ctx, bx-7, by-38, 14,  4, C.hair);
    // sunglasses (signature for lean)
    rect(ctx, bx-6, by-30, 5, 3, C.sunglassFrame, C.outline);
    rect(ctx, bx+1, by-30, 5, 3, C.sunglassFrame, C.outline);
    rect(ctx, bx-5, by-29, 3, 2, C.sunglassLens);
    rect(ctx, bx+2, by-29, 3, 2, C.sunglassLens);
    rect(ctx, bx-1, by-30, 2, 1, C.sunglassFrame); // bridge
    if (mouthOpen) {
      rect(ctx, bx-3, by-25, 6, 2, C.outline);
      rect(ctx, bx-2, by-25, 4, 1, C.white);
    } else {
      rect(ctx, bx-2, by-25, 4, 1, C.outline);
    }
    // ice chain glint
    rect(ctx, bx-3, by-22, 6, 1, C.chain);
  }

  function drawTorso(ctx, bx, by, leanX) {
    leanX = leanX||0;
    rect(ctx, bx-8+leanX, by-22, 16, 18, C.shirt, C.outline);
    rect(ctx, bx-8+leanX, by-22, 16,  3, C.shirtD||C.shirt);
    // big chain drape
    rect(ctx, bx-5+leanX, by-19, 10, 1, C.chain);
    rect(ctx, bx-4+leanX, by-17,  8, 1, C.chain);
    rect(ctx, bx-3+leanX, by-15,  6, 1, C.chain);
    rect(ctx, bx-2+leanX, by-13,  4, 1, C.chainD);
    rect(ctx, bx-1+leanX, by-11,  2, 2, C.chainD);
  }

  function drawLegs(ctx, bx, by, leanX) {
    leanX = leanX||0;
    rect(ctx, bx-7+leanX*.3, by-4, 6, 13, C.pants, C.outline);
    rect(ctx, bx-7+leanX*.3, by+9, 7,  4, C.shoe);
    rect(ctx, bx+1+leanX*.3, by-4, 6, 13, C.pants, C.outline);
    rect(ctx, bx+0+leanX*.3, by+9, 7,  4, C.shoe);
  }

  // Arms spread wide — left side
  function drawArmLeftWide(ctx, bx, by, angle) {
    angle = angle||0;
    rect(ctx, bx-22+angle, by-20, 12, 5, C.skin, C.outline);
    rect(ctx, bx-30+angle, by-18,  9, 4, C.skin, C.outline);
    // mic dangling from left hand
    rect(ctx, bx-34+angle, by-17,  3, 9, C.mic, C.outline);
    circle(ctx, bx-33+angle, by-17,  3, C.micH, C.outline);
  }

  // Arms spread wide — right side
  function drawArmRightWide(ctx, bx, by, angle) {
    angle = angle||0;
    rect(ctx, bx+10-angle, by-20, 12, 5, C.skin, C.outline);
    rect(ctx, bx+21-angle, by-18,  9, 4, C.skin, C.outline);
    // open hand drip
    rect(ctx, bx+29-angle, by-19,  5, 6, C.skin, C.outline);
    // ring flash
    rect(ctx, bx+30-angle, by-17,  2, 1, C.chain);
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx = 0, by = 0;

    if (mode === 'idle') {
      const rock  = Math.sin(frameT*Math.PI*2) * 3;  // slow rock
      const armWave = Math.sin(frameT*Math.PI*2) * 4;
      drawLegs(ctx, bx, by, rock);
      drawTorso(ctx, bx, by, rock*0.6);
      drawArmLeftWide(ctx, bx+rock*0.6, by, armWave);
      drawArmRightWide(ctx, bx+rock*0.6, by, armWave);
      drawHead(ctx, bx+rock, by, false);

    } else if (mode === 'hype') {
      const flap = Math.abs(Math.sin(frameT*Math.PI*4)) * 6;
      const bob  = Math.abs(Math.sin(frameT*Math.PI*4)) * 4;
      drawLegs(ctx, bx, by-bob*0.3);
      drawTorso(ctx, bx, by-bob*0.3, 0);
      drawArmLeftWide(ctx, bx, by-bob*0.3, -flap);
      drawArmRightWide(ctx, bx, by-bob*0.3, -flap);
      drawHead(ctx, bx, by-bob*0.3, bob>2);

    } else { // spit — snap forward
      const snap = Math.sin(frameT*Math.PI*2) < 0 ? 4 : 0;
      drawLegs(ctx, bx, by);
      drawTorso(ctx, bx, by, snap);
      drawArmLeftWide(ctx, bx+snap, by, 2);
      drawArmRightWide(ctx, bx+snap, by, 2);
      drawHead(ctx, bx+snap*1.2, by, true);
    }

    ctx.restore();
  }

  window.RAPPERS = window.RAPPERS||{};
  window.RAPPERS['lean'] = {
    id:'lean', label:'Lean — arms wide, drip shades',
    lineAssignments:[2,3],
    draw: drawRapper,
    modeForLine(i){ return i<=3?'hype':'spit'; }
  };
})();
