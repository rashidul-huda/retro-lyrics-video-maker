/**
 * RAPPER: "Exit"
 * Lines 51–53: "Taking the crown and the throne / We out / We out"
 * Pose: walking away from camera (3/4 back view), one hand raised
 *       backwards in a peace/wave, crown on head, mic dropped on floor,
 *       fur coat flowing, exiting the stage
 * Palette: purple/gold royal exit
 */
(function () {
  'use strict';

  const C = {
    skin:'#f5c98a', skinD:'#d4915a',
    coat:'#4400aa', coatD:'#2a0066', coatHL:'#6600cc',
    coatFur:'#dddddd', coatFurD:'#bbbbbb',
    pants:'#2a0066', shoe:'#110033',
    crown:'#ffcc00', crownD:'#cc9900', crownGem:'#ff3399',
    chain:'#ffcc00', chainD:'#cc9900',
    mic:'#888866', micH:'#ccccaa', // mic on floor
    outline:'#000', white:'#fffde0',
    peace:'#ffcc00',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  // Dropped mic on floor
  function drawDroppedMic(ctx, bx, by) {
    ctx.save();
    ctx.translate(bx+10, by+14);
    ctx.rotate(0.5);
    rect(ctx,-1,-1,3,10,C.mic,C.outline);
    circle(ctx,0,-2,4,C.micH,C.outline);
    ctx.restore();
  }

  // Back-of-head view with crown
  function drawHeadBack(ctx, bx, by, turnAngle) {
    // back of head — darker
    rect(ctx,bx-7,by-38,14,14,C.skinD,C.outline);
    rect(ctx,bx-7,by-38,14, 8,'#1a0a00'); // hair fills most of back
    // crown on top
    rect(ctx,bx-7,by-43,14, 5,C.crown,C.outline);
    rect(ctx,bx-6,by-47, 3, 4,C.crown);
    rect(ctx,bx-1,by-48, 3, 5,C.crown);
    rect(ctx,bx+3,by-47, 3, 4,C.crown);
    rect(ctx,bx-5,by-46, 1, 2,C.crownGem);
    rect(ctx,bx,  by-47, 1, 2,C.crownGem);
    rect(ctx,bx+4,by-46, 1, 2,C.crownGem);
    // slight 3/4 turn — one ear visible
    if(turnAngle>0){
      rect(ctx,bx+6,by-34, 3, 5,C.skin,C.outline);
    }
  }

  // Coat flowing open from back
  function drawCoatBack(ctx, bx, by, sway) {
    sway=sway||0;
    // back panel
    rect(ctx,bx-10,by-22,20,22,C.coat,C.outline);
    // fur hem at bottom
    rect(ctx,bx-11,by-2, 22, 5,C.coatFur,C.outline);
    // coat flare at sides (walking movement)
    rect(ctx,bx-14,by-10, 4+sway,14,C.coat,C.outline);
    rect(ctx,bx+10,by-10, 4+sway,14,C.coat,C.outline);
    // fur cuffs peeking
    rect(ctx,bx-14,by-2, 4+sway, 3,C.coatFurD);
    rect(ctx,bx+10,by-2, 4+sway, 3,C.coatFurD);
    // chain hint from behind
    rect(ctx,bx-3,by-19, 6, 1,C.chainD);
  }

  function drawLegsWalk(ctx, bx, by, stride) {
    stride=stride||0;
    // back leg — further away, slightly smaller
    ctx.globalAlpha=0.7;
    rect(ctx,bx-4+stride,by-4, 5,12,C.pants,C.outline);
    rect(ctx,bx-5+stride,by+8, 7, 4,C.shoe);
    ctx.globalAlpha=1;
    // front leg
    rect(ctx,bx-6-stride,by-4, 5,12,C.pants,C.outline);
    rect(ctx,bx-7-stride,by+8, 7, 4,C.shoe);
  }

  // Right arm raised backwards — peace/wave
  function drawArmRaisedBack(ctx, bx, by, raiseY) {
    raiseY=raiseY||0;
    rect(ctx,bx+8,  by-22-raiseY, 6, 9,C.skin,C.outline);
    rect(ctx,bx+10, by-30-raiseY, 5,10,C.skin,C.outline);
    // hand open raised — back of hand visible
    rect(ctx,bx+10, by-40-raiseY, 5, 6,C.skinD,C.outline);
    // two fingers raised (peace sign from behind — V shape)
    rect(ctx,bx+10, by-45-raiseY, 2, 6,C.skinD,C.outline);
    rect(ctx,bx+13, by-45-raiseY, 2, 6,C.skinD,C.outline);
    // fur cuff
    rect(ctx,bx+9,  by-24-raiseY, 6, 2,C.coatFur);
  }

  // Left arm swinging naturally while walking
  function drawArmSwingLeft(ctx, bx, by, swingY) {
    swingY=swingY||0;
    rect(ctx,bx-14,by-20+swingY, 5,10,C.skin,C.outline);
    rect(ctx,bx-13,by-11+swingY, 4, 8,C.skin,C.outline);
    // loose fist
    rect(ctx,bx-12,by-4+swingY,  4, 6,C.skinD,C.outline);
    rect(ctx,bx-13,by-23+swingY, 5, 3,C.coatFur);
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=0;

    if (mode==='idle') {
      const stride = Math.sin(frameT*Math.PI*2)*3;
      const sway   = Math.abs(Math.sin(frameT*Math.PI*2))*2;
      const raise  = 3+Math.sin(frameT*Math.PI*2)*2;
      drawDroppedMic(ctx,bx,by);
      drawLegsWalk(ctx,bx,by,stride);
      drawCoatBack(ctx,bx,by,sway);
      drawArmSwingLeft(ctx,bx,by,-stride*0.5);
      drawArmRaisedBack(ctx,bx,by,raise);
      drawHeadBack(ctx,bx,by,0.1);

    } else if (mode==='hype') {
      const stride = Math.sin(frameT*Math.PI*3)*5;
      const raise  = 4+Math.abs(Math.sin(frameT*Math.PI*3))*6;
      const sway   = Math.abs(stride)*0.5;
      drawDroppedMic(ctx,bx,by);
      drawLegsWalk(ctx,bx,by,stride);
      drawCoatBack(ctx,bx,by,sway);
      drawArmSwingLeft(ctx,bx,by,-stride*0.4);
      drawArmRaisedBack(ctx,bx,by,raise);
      drawHeadBack(ctx,bx,by,0.15);

    } else { // spit — fully walking off, arm highest
      drawDroppedMic(ctx,bx,by);
      drawLegsWalk(ctx,bx,by,4);
      drawCoatBack(ctx,bx,by,3);
      drawArmSwingLeft(ctx,bx,by,-2);
      drawArmRaisedBack(ctx,bx,by,10);
      drawHeadBack(ctx,bx,by,0.2);
    }
    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['exit']={
    id:'exit', label:'Exit — crown, fur coat, walking away, peace sign raised',
    lineAssignments:[51,52,53],
    draw:drawRapper,
    modeForLine(i){return i>=52?'spit':'hype';}
  };
})();
