/**
 * RAPPER: "Hunch"
 * Pose: body hunched forward, both fists gripping mic low, gritting teeth
 * Animations: idle (slow breathing hunch), hype (aggressive lunge), spit (full lean snarl)
 */
(function () {
  'use strict';

  const C = {
    skin:'#e8a870', skinD:'#c07040', hair:'#0a0500',
    hoodie:'#222222', hoodieD:'#111111', hoodieLight:'#333333',
    pants:'#1a1a1a', shoe:'#111',
    chain:'#ffcc00', chainD:'#cc9900',
    mic:'#aaaaaa', micH:'#ddddcc',
    outline:'#000', white:'#fffde0',
    tooth:'#ffe8a0', blood:'#ff2200',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  function drawHead(ctx, bx, by, tilt, snarl) {
    // head tilted forward
    ctx.save();
    ctx.translate(bx, by-32);
    ctx.rotate(tilt);
    rect(ctx, -7, -6, 14, 13, C.skin, C.outline);
    // hood shadow on top/sides
    rect(ctx, -7, -6, 14,  3, C.hoodieD);
    rect(ctx, -8, -5,  3, 10, C.hoodieD);
    // brow furrow (angry)
    rect(ctx, -5, -2,  4, 1, C.outline);
    rect(ctx,  1, -2,  4, 1, C.outline);
    // eyes (narrow)
    rect(ctx, -4, -1,  3, 1, C.outline);
    rect(ctx,  1, -1,  3, 1, C.outline);
    // snarl mouth
    if (snarl) {
      rect(ctx, -4,  3,  8, 2, C.outline);
      rect(ctx, -3,  3,  2, 1, C.white); // teeth
      rect(ctx,  1,  3,  2, 1, C.white);
    } else {
      rect(ctx, -3,  3,  6, 1, C.outline);
    }
    ctx.restore();
  }

  function drawHoodie(ctx, bx, by, leanFwd) {
    leanFwd=leanFwd||0;
    // torso
    rect(ctx, bx-9+leanFwd, by-21, 18, 19, C.hoodie, C.outline);
    // hood drape
    rect(ctx, bx-10+leanFwd, by-22, 20,  5, C.hoodieD);
    rect(ctx, bx-10+leanFwd, by-20, 3,  15, C.hoodieD);
    rect(ctx, bx+7+leanFwd, by-20,  3, 15, C.hoodieD);
    // centre pocket
    rect(ctx, bx-4+leanFwd, by-10,  8,  7, C.hoodieLight, C.outline);
    // chain peeks out
    rect(ctx, bx-3+leanFwd, by-18,  6, 1, C.chain);
  }

  function drawLegs(ctx, bx, by, squat) {
    squat=squat||0;
    rect(ctx, bx-7, by-3+squat, 6, 11-squat, C.pants, C.outline);
    rect(ctx, bx-7, by+8,        7,  4,        C.shoe);
    rect(ctx, bx+1, by-3+squat, 6, 11-squat, C.pants, C.outline);
    rect(ctx, bx,   by+8,        7,  4,        C.shoe);
  }

  // Both arms hunched forward gripping mic
  function drawBothArmsMic(ctx, bx, by, leanFwd, gripPulse) {
    gripPulse=gripPulse||0;
    // left arm bent down
    rect(ctx, bx-14+leanFwd, by-20, 6, 8,  C.skin, C.outline);
    rect(ctx, bx-13+leanFwd, by-13, 5, 7,  C.skin, C.outline);
    // right arm bent down
    rect(ctx, bx+8+leanFwd,  by-20, 6, 8,  C.skin, C.outline);
    rect(ctx, bx+8+leanFwd,  by-13, 5, 7,  C.skin, C.outline);
    // mic gripped between both hands
    rect(ctx, bx-4+leanFwd,  by-12, 8, 14, C.mic,  C.outline);
    circle(ctx, bx+0+leanFwd, by-14, 5+gripPulse, C.micH, C.outline);
    // knuckle details
    rect(ctx, bx-3+leanFwd,  by-8,  2, 1, C.skinD);
    rect(ctx, bx+1+leanFwd,  by-8,  2, 1, C.skinD);
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=0;

    if (mode==='idle') {
      const breathe = Math.sin(frameT*Math.PI*2)*1.5;
      const tilt    = Math.sin(frameT*Math.PI*2)*0.04;
      drawLegs(ctx, bx, by+breathe*0.2);
      drawHoodie(ctx, bx, by+breathe*0.3, 2);
      drawBothArmsMic(ctx, bx, by+breathe*0.3, 2, 0);
      drawHead(ctx, bx, by+breathe, tilt, false);

    } else if (mode==='hype') {
      const lunge = Math.abs(Math.sin(frameT*Math.PI*3))*5;
      const grip  = Math.abs(Math.sin(frameT*Math.PI*6))*1.5;
      drawLegs(ctx, bx, by, lunge*0.3);
      drawHoodie(ctx, bx, by, 3+lunge);
      drawBothArmsMic(ctx, bx, by, 3+lunge, grip);
      drawHead(ctx, bx, by, 0.08+lunge*0.008, lunge>3);

    } else { // spit
      const snap = Math.sin(frameT*Math.PI*2)<0?6:2;
      drawLegs(ctx, bx, by, 2);
      drawHoodie(ctx, bx, by, snap+2);
      drawBothArmsMic(ctx, bx, by, snap+2, 1);
      drawHead(ctx, bx, by, 0.10, true);
    }

    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['hunch']={
    id:'hunch', label:'Hunch — hooded, both hands on mic',
    lineAssignments:[4,5,6],
    draw:drawRapper,
    modeForLine(i){ return i<=5?'hype':'spit'; }
  };
})();
