/**
 * RAPPER: "Wave"
 * Pose: arms doing a rolling wave, feet in shuffle stance, colorful tracksuit
 * Animations: idle (smooth wave roll), hype (full body wave fast), spit (freeze point with wave arm)
 */
(function () {
  'use strict';

  const C = {
    skin:'#f5c98a', skinD:'#d4915a', hair:'#1a0a00',
    track:'#ff6600', trackD:'#cc4400', trackStripe:'#ffffff', // orange tracksuit
    trackPants:'#ff6600', pantStripe:'#ffffff',
    shoe:'#ffffff', shoeTrim:'#ff6600',
    chain:'#ffcc00',
    mic:'#888866', micH:'#ccccaa',
    outline:'#000', white:'#fffde0',
    band:'#ffffff', // wristbands
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}

  function drawHead(ctx, bx, by, mouthOpen, tilt) {
    ctx.save();
    ctx.translate(bx, by-32);
    ctx.rotate(tilt||0);
    rect(ctx, -7,-6,14,14,C.skin,C.outline);
    // afro
    rect(ctx, -8,-9,16, 5,'#1a0a00',C.outline);
    rect(ctx,-10,-7, 4, 8,'#1a0a00');
    rect(ctx,  6,-7, 4, 8,'#1a0a00');
    rect(ctx, -9,-5, 2, 4,'#1a0a00');
    rect(ctx,  7,-5, 2, 4,'#1a0a00');
    // happy eyes
    rect(ctx,-5,-1, 3, 3,C.outline);
    rect(ctx, 2,-1, 3, 3,C.outline);
    rect(ctx,-4, 0, 2, 2,C.white);
    rect(ctx, 3, 0, 2, 2,C.white);
    rect(ctx,-3, 0, 1, 1,'#222');
    rect(ctx, 3, 0, 1, 1,'#222');
    // big smile
    if (mouthOpen) {
      rect(ctx,-4, 3, 8, 3,C.outline);
      rect(ctx,-3, 3, 6, 1,C.white);
      rect(ctx,-2, 3, 1, 1,C.chain); // gold tooth
    } else {
      rect(ctx,-3, 3, 6, 2,C.outline);
      rect(ctx,-3, 4, 6, 1,C.white);
    }
    ctx.restore();
  }

  function drawTracksuit(ctx, bx, by, lean) {
    lean=lean||0;
    rect(ctx, bx-8+lean, by-22, 16, 18, C.track, C.outline);
    // zip stripe down centre
    rect(ctx, bx-1+lean, by-22,  2, 18, C.trackStripe);
    // shoulder stripes
    rect(ctx, bx-8+lean, by-22, 16,  2, C.trackStripe);
    // chain
    rect(ctx, bx-4+lean, by-19,  8,  1, C.chain);
    rect(ctx, bx-3+lean, by-17,  6,  1, C.chain);
  }

  function drawPants(ctx, bx, by, shuffleL, shuffleR) {
    shuffleL=shuffleL||0; shuffleR=shuffleR||0;
    rect(ctx, bx-7, by-4+shuffleL, 6, 12, C.trackPants, C.outline);
    rect(ctx, bx-7, by-4+shuffleL, 1, 12, C.pantStripe);
    rect(ctx, bx-2, by-4+shuffleL, 1, 12, C.pantStripe);
    rect(ctx, bx-7, by+8+shuffleL, 8,  4, C.shoe);
    rect(ctx, bx-7, by+8+shuffleL, 8,  2, C.shoeTrim);

    rect(ctx, bx+1, by-4+shuffleR, 6, 12, C.trackPants, C.outline);
    rect(ctx, bx+6, by-4+shuffleR, 1, 12, C.pantStripe);
    rect(ctx, bx+1, by-4+shuffleR, 1, 12, C.pantStripe);
    rect(ctx, bx,   by+8+shuffleR, 8,  4, C.shoe);
    rect(ctx, bx,   by+8+shuffleR, 8,  2, C.shoeTrim);
  }

  // Wave arm — left, position varies with wave phase 0→1
  function drawArmWaveLeft(ctx, bx, by, phase) {
    // phase 0 = arm low, phase 0.5 = arm mid, phase 1 = arm high
    const lift = Math.sin(phase*Math.PI)*18;
    const bend = Math.cos(phase*Math.PI)*6;
    rect(ctx, bx-15, by-16-lift*0.3, 6, 8, C.skin, C.outline);
    // wristband
    rect(ctx, bx-14, by-9-lift*0.3, 4, 2, C.band);
    rect(ctx, bx-14, by-10-lift*0.6-bend, 5, 8, C.skin, C.outline);
    // hand
    rect(ctx, bx-13, by-18-lift-bend, 4, 6, C.skin, C.outline);
    // mic in this hand
    rect(ctx, bx-12, by-24-lift-bend, 3,10, C.mic, C.outline);
    rect(ctx, bx-11, by-25-lift-bend, 3, 3, C.micH,C.outline);
  }

  // Wave arm — right, offset phase
  function drawArmWaveRight(ctx, bx, by, phase) {
    const lift = Math.sin(phase*Math.PI)*18;
    const bend = Math.cos(phase*Math.PI)*6;
    rect(ctx, bx+9, by-16-lift*0.3, 6, 8, C.skin, C.outline);
    rect(ctx, bx+10,by-9-lift*0.3,  4, 2, C.band);
    rect(ctx, bx+9, by-10-lift*0.6-bend, 5, 8, C.skin, C.outline);
    rect(ctx, bx+9, by-18-lift-bend, 4, 6, C.skin, C.outline);
    // open hand
    rect(ctx, bx+10,by-23-lift-bend, 3, 7, C.skin, C.outline);
    rect(ctx, bx+9, by-22-lift-bend, 2, 5, C.skin, C.outline);
    rect(ctx, bx+13,by-22-lift-bend, 2, 5, C.skin, C.outline);
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=0;

    if (mode==='idle') {
      // slow smooth wave roll left→right→left
      const waveT = (frameT + 0.5) % 1; // right arm offset by half
      const shuffL = Math.sin(frameT*Math.PI*2)*2;
      const shuffR = Math.sin(frameT*Math.PI*2+Math.PI)*2;
      drawPants(ctx, bx, by, shuffL, shuffR);
      drawTracksuit(ctx, bx, by, Math.sin(frameT*Math.PI*2)*1);
      drawArmWaveLeft(ctx, bx, by, frameT);
      drawArmWaveRight(ctx, bx, by, waveT);
      drawHead(ctx, bx, by, false, Math.sin(frameT*Math.PI*2)*0.04);

    } else if (mode==='hype') {
      // fast wave
      const ft2 = (frameT*2)%1;
      const waveT = (ft2+0.5)%1;
      const bob  = Math.abs(Math.sin(frameT*Math.PI*4))*4;
      drawPants(ctx, bx, by-bob, Math.sin(ft2*Math.PI*2)*3, Math.sin(ft2*Math.PI*2+Math.PI)*3);
      drawTracksuit(ctx, bx, by-bob, 0);
      drawArmWaveLeft(ctx, bx, by-bob, ft2);
      drawArmWaveRight(ctx, bx, by-bob, waveT);
      drawHead(ctx, bx, by-bob, bob>2, 0);

    } else { // spit — freeze, one arm high wave, one points
      drawPants(ctx, bx, by, -2, 2);
      drawTracksuit(ctx, bx, by, 1);
      drawArmWaveLeft(ctx, bx, by, 0.9); // arm near top
      // right arm points forward
      rect(ctx, bx+9, by-20, 6, 9, C.skin, C.outline);
      rect(ctx, bx+10,by-28, 5,10, C.skin, C.outline);
      rect(ctx, bx+10,by-38, 5, 6, C.skin, C.outline);
      rect(ctx, bx+11,by-43, 3, 7, C.skin, C.outline);
      drawHead(ctx, bx, by, true, 0.03);
    }

    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['wave']={
    id:'wave', label:'Wave — tracksuit, rolling wave arms, shuffle feet',
    lineAssignments:[18,19,20],
    draw:drawRapper,
    modeForLine(i){ return i<=19?'hype':'spit'; }
  };
})();
