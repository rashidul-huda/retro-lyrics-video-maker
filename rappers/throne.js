/**
 * RAPPER: "Throne"
 * Pose: sitting wide-legged on invisible throne, one arm on armrest,
 *       mic resting on knee like a sceptre. Absolute king energy.
 * Animations: idle (slow breath + finger tap), hype (rise up pointing), spit (lean forward dominate)
 */
(function () {
  'use strict';

  const C = {
    skin:'#f5c98a', skinD:'#d4915a', hair:'#1a0a00',
    robe:'#4400aa', robeD:'#280066', robeTrim:'#ffcc00',
    pants:'#2a0066', shoe:'#110022',
    crown:'#ffcc00', crownD:'#cc9900', crownGem:'#ff3399',
    chain:'#ffcc00', chainD:'#cc9900',
    mic:'#888866', micH:'#ccccaa',
    ring:'#ffcc00',
    outline:'#000', white:'#fffde0',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  function drawCrown(ctx, bx, by) {
    // crown base
    rect(ctx, bx-7, by-44, 14, 4, C.crown, C.outline);
    // three points
    rect(ctx, bx-6, by-48, 3, 4, C.crown);
    rect(ctx, bx-1, by-49, 3, 5, C.crown); // middle tallest
    rect(ctx, bx+3, by-48, 3, 4, C.crown);
    // gems
    rect(ctx, bx-5, by-47, 1, 2, C.crownGem);
    rect(ctx, bx,   by-48, 1, 2, C.crownGem);
    rect(ctx, bx+4, by-47, 1, 2, C.crownGem);
  }

  function drawHead(ctx, bx, by, mouthOpen, blink) {
    rect(ctx, bx-7, by-38, 14, 14, C.skin, C.outline);
    // no hair — crown covers
    rect(ctx, bx-7, by-38, 14,  2, C.skin);
    // smug eyes
    if (blink) {
      rect(ctx, bx-5, by-29, 4, 1, C.outline);
      rect(ctx, bx+1, by-29, 4, 1, C.outline);
    } else {
      rect(ctx, bx-5, by-29, 4, 3, C.outline);
      rect(ctx, bx-4, by-28, 2, 2, C.white);
      rect(ctx, bx+2, by-28, 2, 2, C.white);
      rect(ctx, bx-4, by-28, 1, 1, '#333'); // pupils looking down (smug)
      rect(ctx, bx+2, by-28, 1, 1, '#333');
    }
    // smug slight smile
    if (mouthOpen) {
      rect(ctx, bx-3, by-24, 6, 2, C.outline);
      rect(ctx, bx-2, by-24, 4, 1, C.white);
      rect(ctx, bx-1, by-24, 2, 1, C.crownGem); // gold tooth
    } else {
      rect(ctx, bx-2, by-24, 4, 1, C.outline);
      rect(ctx, bx+0, by-24, 1, 1, C.chain); // gold tooth glint
    }
    drawCrown(ctx, bx, by);
  }

  function drawRobe(ctx, bx, by, offset) {
    offset=offset||0;
    rect(ctx, bx-10+offset, by-22, 20, 20, C.robe, C.outline);
    // trim edges
    rect(ctx, bx-10+offset, by-22,  2, 20, C.robeTrim);
    rect(ctx,  bx+8+offset, by-22,  2, 20, C.robeTrim);
    rect(ctx, bx-10+offset, by-22, 20,  2, C.robeTrim);
    // chain heavy
    rect(ctx, bx-5+offset, by-20, 10, 1, C.chain);
    rect(ctx, bx-4+offset, by-18,  8, 1, C.chain);
    rect(ctx, bx-3+offset, by-16,  6, 1, C.chain);
    rect(ctx, bx-2+offset, by-14,  4, 1, C.chainD);
    rect(ctx, bx-1+offset, by-12,  2, 2, C.chainD);
  }

  // Seated legs spread wide
  function drawLegsSeated(ctx, bx, by, riseAmt) {
    riseAmt=riseAmt||0;
    // left thigh going out-left
    rect(ctx, bx-18, by-2+riseAmt, 12, 6,  C.pants, C.outline);
    rect(ctx, bx-20, by+4+riseAmt,  8, 5,  C.pants, C.outline);
    rect(ctx, bx-21, by+9+riseAmt,  9, 4,  C.shoe);
    // right thigh going out-right
    rect(ctx, bx+6, by-2+riseAmt,  12, 6,  C.pants, C.outline);
    rect(ctx, bx+12, by+4+riseAmt,  8, 5,  C.pants, C.outline);
    rect(ctx, bx+12, by+9+riseAmt,  9, 4,  C.shoe);
  }

  // Left arm resting on armrest / tapping
  function drawArmRest(ctx, bx, by, tapY) {
    tapY=tapY||0;
    rect(ctx, bx-20, by-20, 6, 12, C.skin, C.outline);
    rect(ctx, bx-20, by-8+tapY,  6,  6, C.skin, C.outline);
    // finger tap
    rect(ctx, bx-19, by-3+tapY, 4,  2, C.skin, C.outline);
    // ring
    rect(ctx, bx-18, by-4+tapY, 2,  1, C.ring);
  }

  // Right arm mic-on-knee
  function drawArmMicKnee(ctx, bx, by) {
    rect(ctx, bx+14, by-20, 6, 12, C.skin, C.outline);
    rect(ctx, bx+14, by-8,  6,  6, C.skin, C.outline);
    // mic resting vertically on knee
    rect(ctx, bx+16, by-2, 3, 12, C.mic, C.outline);
    circle(ctx, bx+17, by-3, 4, C.micH, C.outline);
  }

  // Rising arm (for hype — stands up pointing)
  function drawArmPointUp(ctx, bx, by, rise) {
    rise=rise||0;
    rect(ctx, bx+8,  by-20-rise, 6,  9, C.skin, C.outline);
    rect(ctx, bx+10, by-29-rise, 5, 10, C.skin, C.outline);
    rect(ctx, bx+10, by-39-rise, 5,  6, C.skin, C.outline);
    rect(ctx, bx+11, by-44-rise, 3,  7, C.skin, C.outline);
    rect(ctx, bx+11, by-39-rise, 3,  1, C.ring);
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    // Throne pose sits the character lower
    ctx.scale(scale, scale);
    const bx=0, by=8; // seated, so offset down a bit

    if (mode==='idle') {
      const breathe = Math.sin(frameT*Math.PI*2)*1;
      const tap     = Math.abs(Math.sin(frameT*Math.PI*6))<0.15 ? 2 : 0;
      const blink   = frameT>0.88 && frameT<0.95;
      drawLegsSeated(ctx, bx, by+breathe*0.2);
      drawRobe(ctx, bx, by+breathe*0.3);
      drawArmRest(ctx, bx, by+breathe*0.3, tap);
      drawArmMicKnee(ctx, bx, by+breathe*0.3);
      drawHead(ctx, bx, by+breathe, false, blink);

    } else if (mode==='hype') {
      // rises from throne
      const rise  = Math.abs(Math.sin(frameT*Math.PI*2))*10;
      const point = Math.abs(Math.sin(frameT*Math.PI*2))*6;
      drawLegsSeated(ctx, bx, by, -rise*0.4);
      drawRobe(ctx, bx, by-rise*0.5);
      drawArmRest(ctx, bx, by-rise*0.5, 0);
      drawArmPointUp(ctx, bx, by-rise*0.5, point);
      drawHead(ctx, bx, by-rise*0.5, rise>5, false);

    } else { // spit — lean forward from throne
      const lean = 4;
      drawLegsSeated(ctx, bx, by);
      drawRobe(ctx, bx, by, lean);
      drawArmRest(ctx, bx+lean, by, 0);
      drawArmMicKnee(ctx, bx+lean, by);
      drawHead(ctx, bx+lean*1.3, by, true, false);
    }

    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['throne']={
    id:'throne', label:'Throne — seated king, crown, robe',
    lineAssignments:[9,10,11],
    draw:drawRapper,
    modeForLine(i){ return i<=10?'hype':'spit'; }
  };
})();
