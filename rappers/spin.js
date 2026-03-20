/**
 * RAPPER: "Spin"
 * Pose: mid-pirouette, one leg kicked back, mic cord swinging in arc
 * Animations: idle (slow spin sway), hype (fast kick-spin), spit (freeze mid-spin stomp)
 */
(function () {
  'use strict';

  const C = {
    skin:'#f5c98a', skinD:'#d4915a', hair:'#1a0a00',
    jacket:'#cc0044', jacketD:'#880022',  // red varsity
    sleeve:'#eeeeee', sleeveD:'#cccccc',  // white sleeves
    pants:'#f5f0e0', pantsD:'#ccccaa',    // cream
    shoe:'#cc0044',
    chain:'#ffcc00', chainD:'#cc9900',
    mic:'#888866', micH:'#ccccaa', cord:'#555544',
    outline:'#000', white:'#fffde0',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  function drawHead(ctx, bx, by, tilt, mouthOpen) {
    ctx.save();
    ctx.translate(bx, by-32);
    ctx.rotate(tilt);
    rect(ctx, -7,-6,14,14,C.skin,C.outline);
    rect(ctx, -7,-6,14, 4,C.hair);
    // spiky hair
    rect(ctx, -8,-7, 4, 3,C.hair);
    rect(ctx,  4,-7, 4, 3,C.hair);
    rect(ctx, -2,-8, 4, 4,C.hair);
    // wide excited eyes
    rect(ctx, -5,-1, 3, 3,C.outline);
    rect(ctx,  2,-1, 3, 3,C.outline);
    rect(ctx, -4, 0, 2, 2,C.white);
    rect(ctx,  3, 0, 2, 2,C.white);
    rect(ctx, -4, 0, 1, 1,'#000');
    rect(ctx,  3, 0, 1, 1,'#000');
    if (mouthOpen) {
      rect(ctx,-3, 4, 6, 3,C.outline);
      rect(ctx,-2, 4, 4, 1,C.white);
    } else {
      rect(ctx,-2, 4, 4, 1,C.outline);
    }
    ctx.restore();
  }

  function drawJacket(ctx, bx, by, tiltX) {
    tiltX=tiltX||0;
    rect(ctx, bx-8+tiltX, by-22, 16, 18, C.jacket, C.outline);
    rect(ctx, bx-14+tiltX,by-22,  6, 18, C.sleeve, C.outline); // left white sleeve
    rect(ctx, bx+8+tiltX, by-22,  6, 18, C.sleeve, C.outline); // right white sleeve
    // varsity stripe
    rect(ctx, bx-8+tiltX, by-14, 16,  2, C.white);
    // chain
    rect(ctx, bx-4+tiltX, by-19,  8,  1, C.chain);
    rect(ctx, bx-3+tiltX, by-17,  6,  1, C.chain);
    rect(ctx, bx-1+tiltX, by-15,  2,  2, C.chainD);
  }

  // Grounded leg
  function drawLegGround(ctx, bx, by) {
    rect(ctx, bx-5, by-4, 6, 13, C.pants, C.outline);
    rect(ctx, bx-5, by+9,  7,  4, C.shoe);
  }

  // Kicked-back leg
  function drawLegKick(ctx, bx, by, kickAmt) {
    kickAmt=kickAmt||0;
    // thigh going back
    rect(ctx, bx+2,  by-4,  5, 8,  C.pants, C.outline);
    // shin kicked back
    rect(ctx, bx+4,  by+2,  5, 6,  C.pants, C.outline);
    ctx.save();
    ctx.translate(bx+6, by+8+kickAmt);
    ctx.rotate(0.4+kickAmt*0.04);
    rect(ctx,-3,-2,7,4,C.shoe);
    ctx.restore();
  }

  // Mic-holding arm (left, raised)
  function drawArmMic(ctx, bx, by, swing) {
    swing=swing||0;
    rect(ctx, bx-15, by-22, 7, 8,  C.sleeve, C.outline);
    rect(ctx, bx-14, by-15, 6, 8,  C.skin, C.outline);
    // mic
    rect(ctx, bx-13, by-7+swing,  3, 11, C.mic, C.outline);
    circle(ctx, bx-12, by-8+swing, 4,   C.micH, C.outline);
    // cord arc
    ctx.beginPath();
    ctx.moveTo(bx-12, by-4+swing);
    ctx.quadraticCurveTo(bx-5+swing*2, by+10, bx+2, by+8);
    ctx.strokeStyle=C.cord; ctx.lineWidth=1; ctx.stroke();
  }

  // Free arm raised high
  function drawArmFree(ctx, bx, by, raiseY) {
    raiseY=raiseY||0;
    rect(ctx, bx+8, by-22-raiseY, 6, 9, C.sleeve, C.outline);
    rect(ctx, bx+9, by-31-raiseY, 5, 10,C.skin, C.outline);
    // open palm
    rect(ctx, bx+8, by-41-raiseY, 6,  6, C.skin, C.outline);
    rect(ctx, bx+9, by-46-raiseY, 4,  6, C.skin, C.outline); // fingers spread
    rect(ctx, bx+7, by-43-raiseY, 2,  4, C.skin, C.outline);
    rect(ctx, bx+13,by-43-raiseY, 2,  4, C.skin, C.outline);
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=0;

    if (mode==='idle') {
      const sway  = Math.sin(frameT*Math.PI*2)*2;
      const raise = 2 + Math.sin(frameT*Math.PI*2+1)*3;
      drawLegGround(ctx, bx+sway*0.3, by);
      drawLegKick(ctx, bx+sway*0.3, by, 4);
      drawJacket(ctx, bx, by, sway*0.5);
      drawArmMic(ctx, bx+sway*0.5, by, Math.sin(frameT*Math.PI*2)*3);
      drawArmFree(ctx, bx+sway*0.5, by, raise);
      drawHead(ctx, bx+sway, by, sway*0.02, false);

    } else if (mode==='hype') {
      const kick  = Math.abs(Math.sin(frameT*Math.PI*4))*8;
      const swing = Math.sin(frameT*Math.PI*4)*8;
      const bob   = Math.abs(Math.sin(frameT*Math.PI*4))*4;
      drawLegGround(ctx, bx, by-bob);
      drawLegKick(ctx, bx, by-bob, kick);
      drawJacket(ctx, bx, by-bob, 0);
      drawArmMic(ctx, bx, by-bob, swing);
      drawArmFree(ctx, bx, by-bob, 4+kick*0.5);
      drawHead(ctx, bx, by-bob, kick*0.015, kick>5);

    } else { // spit — freeze stomp
      const stomp = Math.sin(frameT*Math.PI*2)<0?6:0;
      drawLegGround(ctx, bx, by+stomp*0.2);
      drawLegKick(ctx, bx, by, 10);
      drawJacket(ctx, bx, by, 1);
      drawArmMic(ctx, bx, by, -3);
      drawArmFree(ctx, bx, by, 8);
      drawHead(ctx, bx+1, by, 0.06, true);
    }

    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['spin']={
    id:'spin', label:'Spin — varsity kick, mic cord swinging',
    lineAssignments:[7,8],
    draw:drawRapper,
    modeForLine(i){ return 'hype'; }
  };
})();
