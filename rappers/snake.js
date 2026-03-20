/**
 * RAPPER: "Snake"
 * Lines 25–28: "Cut the head off…silver plate / detonate"
 * Pose: crouched low, one arm raised in sharp knife-hand chop,
 *       other hand low gripping mic upside-down like a weapon
 * Palette: dark green + gold scales pattern on jacket
 */
(function () {
  'use strict';

  const C = {
    skin:'#c87840', skinD:'#9a5020',
    jacket:'#1a3a00', jacketD:'#0a1e00', jacketHL:'#2a5a00',
    scale1:'#22aa00', scale2:'#116600',   // snake scale detail
    pants:'#111a00', shoe:'#0a0f00',
    chain:'#ffcc00', chainD:'#aa8800',
    mic:'#777755', micH:'#bbbbaa',
    outline:'#000', white:'#fffde0',
    eye:'#ff4400',  // reptile eyes
    fang:'#fffde0',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  function drawHead(ctx, bx, by, tilt, mouthOpen) {
    ctx.save();
    ctx.translate(bx, by - 28);
    ctx.rotate(tilt||0);
    rect(ctx,-7,-6,14,13,C.skin,C.outline);
    // hood pulled up partially (snake hood vibes)
    rect(ctx,-8,-8,16, 5,C.jacket);
    rect(ctx,-8,-6, 3,10,C.jacketD);
    // reptile slit eyes
    rect(ctx,-5,-1, 4, 2,C.outline);
    rect(ctx, 1,-1, 4, 2,C.outline);
    rect(ctx,-4, 0, 2, 1,C.eye);   // red slit pupils
    rect(ctx, 2, 0, 2, 1,C.eye);
    rect(ctx,-3, 0, 1, 1,'#000'); // vertical slit
    rect(ctx, 3, 0, 1, 1,'#000');
    // sinister smirk / fangs
    if (mouthOpen) {
      rect(ctx,-4, 4, 8, 3,C.outline);
      rect(ctx,-3, 4, 1, 2,C.fang); // left fang
      rect(ctx, 2, 4, 1, 2,C.fang); // right fang
      rect(ctx,-1, 5, 2, 1,'#cc0000'); // tongue hint
    } else {
      rect(ctx,-3, 4, 2, 1,C.outline);
      rect(ctx, 1, 4, 2, 1,C.outline);
    }
    ctx.restore();
  }

  function drawJacket(ctx, bx, by, squat) {
    squat=squat||0;
    rect(ctx,bx-8, by-20+squat,16,18,C.jacket,C.outline);
    // scale pattern (diamond grid)
    for(let row=0;row<3;row++){
      for(let col=0;col<4;col++){
        const sx = bx-6+col*4 + (row%2)*2;
        const sy = by-18+squat+row*5;
        rect(ctx,sx,sy,3,3,row%2===col%2?C.scale1:C.scale2);
      }
    }
    // chain
    rect(ctx,bx-4,by-18+squat, 8,1,C.chain);
    rect(ctx,bx-3,by-16+squat, 6,1,C.chain);
  }

  // Crouched legs — knees bent
  function drawLegsCrouch(ctx, bx, by) {
    // left: thigh out, knee bent
    rect(ctx,bx-10, by-6, 7, 7,C.pants,C.outline);
    rect(ctx,bx-13, by+1, 6, 6,C.pants,C.outline);
    rect(ctx,bx-14, by+7, 8, 4,C.shoe);
    // right: mirror
    rect(ctx,bx+3,  by-6, 7, 7,C.pants,C.outline);
    rect(ctx,bx+7,  by+1, 6, 6,C.pants,C.outline);
    rect(ctx,bx+6,  by+7, 8, 4,C.shoe);
  }

  // Knife-hand chop — raised right arm, hand blade flat
  function drawArmChop(ctx, bx, by, chopY) {
    chopY=chopY||0;
    rect(ctx,bx+8,  by-20-chopY, 6,10,C.skin,C.outline);
    rect(ctx,bx+10, by-30-chopY, 5, 9,C.skin,C.outline);
    // flat knife hand
    rect(ctx,bx+9,  by-38-chopY, 7, 4,C.skin,C.outline);
    rect(ctx,bx+14, by-39-chopY, 3, 2,C.skin,C.outline); // thumb
    // scale cuff
    rect(ctx,bx+9,  by-22-chopY, 6, 2,C.scale1);
  }

  // Low mic grip — left arm down, mic held like a dagger
  function drawArmMicDagger(ctx, bx, by) {
    rect(ctx,bx-14, by-20, 5,12,C.skin,C.outline);
    rect(ctx,bx-13, by-8,  4, 8,C.skin,C.outline);
    // mic pointing down-diagonal like a weapon
    ctx.save();
    ctx.translate(bx-12, by+2);
    ctx.rotate(0.3);
    rect(ctx,-1,-1,3,12,C.mic,C.outline);
    circle(ctx,0,-2,4,C.micH,C.outline);
    ctx.restore();
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=8; // crouched so offset down

    if (mode==='idle') {
      const sway  = Math.sin(frameT*Math.PI*2)*1.5;
      const chop  = 2+Math.sin(frameT*Math.PI*2)*2;
      drawLegsCrouch(ctx,bx+sway*0.3,by);
      drawJacket(ctx,bx,by-2,2);
      drawArmMicDagger(ctx,bx+sway*0.4,by-2);
      drawArmChop(ctx,bx+sway*0.4,by-2,chop);
      drawHead(ctx,bx+sway,by-2,0.04+sway*0.01,false);

    } else if (mode==='hype') {
      const chop = Math.abs(Math.sin(frameT*Math.PI*4))*10;
      const bob  = Math.abs(Math.sin(frameT*Math.PI*4))*3;
      drawLegsCrouch(ctx,bx,by-bob);
      drawJacket(ctx,bx,by-2-bob,2);
      drawArmMicDagger(ctx,bx,by-2-bob);
      drawArmChop(ctx,bx,by-2-bob,chop);
      drawHead(ctx,bx,by-2-bob,0.05,chop>6);

    } else { // spit — full chop slam
      const slam = Math.sin(frameT*Math.PI*2)<0?8:2;
      drawLegsCrouch(ctx,bx,by);
      drawJacket(ctx,bx,by-2,2);
      drawArmMicDagger(ctx,bx,by-2);
      drawArmChop(ctx,bx,by-2,slam);
      drawHead(ctx,bx,by-2,0.08,true);
    }
    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['snake']={
    id:'snake', label:'Snake — crouched, knife-hand chop, reptile jacket',
    lineAssignments:[25,26,27,28],
    draw:drawRapper,
    modeForLine(i){return i<=27?'hype':'spit';}
  };
})();
