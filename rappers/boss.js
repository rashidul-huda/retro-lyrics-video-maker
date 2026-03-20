/**
 * RAPPER: "Boss"
 * Lines 29–33: "Brutally honest / billionaire chair / disrepair"
 * Pose: leaning back in an invisible throne-chair, one leg crossed,
 *       arm draped lazily, other hand holding mic at chin like a CEO
 * Palette: all-white suit, black shirt, heavy iced-out chain
 */
(function () {
  'use strict';

  const C = {
    skin:'#f5c98a', skinD:'#d4915a', hair:'#1a0a00',
    suit:'#f0f0f0', suitD:'#cccccc', suitShadow:'#aaaaaa',
    shirt:'#111', tie:'#cc2200',
    pants:'#f0f0f0', shoe:'#111',
    chain:'#aaddff', chainD:'#88aacc', chainHL:'#ffffff', // iced out (blue-white)
    mic:'#ccccaa', micH:'#eeeecc',
    ring:'#aaddff',
    outline:'#000', white:'#fffde0',
    watch:'#aaddff',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  function drawHead(ctx, bx, by, tiltBack, mouthOpen) {
    ctx.save();
    ctx.translate(bx, by-34);
    ctx.rotate(tiltBack||0);
    rect(ctx,-7,-6,14,14,C.skin,C.outline);
    rect(ctx,-7,-6,14, 3,C.hair);
    // side part
    rect(ctx,-7,-5, 5, 2,C.hair);
    // calm CEO eyes (half-lidded, unimpressed)
    rect(ctx,-5,-1, 4, 2,C.outline);
    rect(ctx, 1,-1, 4, 2,C.outline);
    rect(ctx,-4, 0, 2, 1,C.white);
    rect(ctx, 2, 0, 2, 1,C.white);
    rect(ctx,-3, 0, 1, 1,'#333');
    rect(ctx, 2, 0, 1, 1,'#333');
    // slight smirk — one corner up
    rect(ctx,-2, 4, 3, 1,C.outline);
    rect(ctx, 1, 3, 3, 1,C.outline);
    if (mouthOpen) {
      rect(ctx,-2, 3, 6, 2,C.outline);
      rect(ctx,-1, 3, 4, 1,C.white);
      rect(ctx, 0, 3, 2, 1,C.chain); // iced tooth
    }
    // jawline
    rect(ctx,-7, 6, 2, 2,C.suitShadow);
    rect(ctx, 5, 6, 2, 2,C.suitShadow);
    ctx.restore();
  }

  function drawSuit(ctx, bx, by, leanBack) {
    leanBack=leanBack||0;
    // jacket body
    rect(ctx,bx-10-leanBack,by-22,20,20,C.suit,C.outline);
    // lapels
    rect(ctx,bx-4-leanBack,by-22,8,20,C.shirt);
    rect(ctx,bx-9-leanBack,by-22,5,10,C.suit,C.outline);
    rect(ctx,bx+4-leanBack,by-22,5,10,C.suit,C.outline);
    // tie
    rect(ctx,bx-1-leanBack,by-20,3,12,C.tie);
    rect(ctx,bx-2-leanBack,by-10,5, 5,C.tie);
    // pocket square
    rect(ctx,bx+5-leanBack,by-20,3, 2,C.chainHL);
    // iced chain
    for(let i=0;i<6;i++){
      rect(ctx,bx-3-leanBack,by-19+i*2,7,1,i%2===0?C.chain:C.chainD);
    }
    // ice pendant
    circle(ctx,bx-leanBack,by-9,3,C.chainHL,C.outline);
    circle(ctx,bx-leanBack,by-9,1,C.chain);
  }

  // Crossed legs (right leg over left) — seated pose
  function drawLegsSeatedCrossed(ctx, bx, by, leanBack) {
    leanBack=leanBack||0;
    // left leg straight down
    rect(ctx,bx-8+leanBack*0.2,by-3,6,12,C.pants,C.outline);
    rect(ctx,bx-9+leanBack*0.2,by+9,8, 4,C.shoe);
    // right leg crossed over (thigh goes horizontal right)
    rect(ctx,bx+0+leanBack*0.2,by-4,14,5,C.pants,C.outline);
    rect(ctx,bx+12+leanBack*0.2,by-2,5,9,C.pants,C.outline);
    rect(ctx,bx+11+leanBack*0.2,by+7,7,4,C.shoe);
  }

  // Right arm — draped over invisible chair back, casual
  function drawArmDrape(ctx, bx, by, leanBack) {
    leanBack=leanBack||0;
    rect(ctx,bx+10-leanBack,by-22,14,5,C.suit,C.outline);
    rect(ctx,bx+20-leanBack,by-20,6,9,C.skin,C.outline);
    // dangling hand
    rect(ctx,bx+21-leanBack,by-12,4,6,C.skin,C.outline);
    // watch on wrist
    rect(ctx,bx+20-leanBack,by-14,6,2,C.watch);
    rect(ctx,bx+21-leanBack,by-13,4,1,C.chainHL);
    // ring
    rect(ctx,bx+22-leanBack,by-10,2,1,C.ring);
  }

  // Left arm — mic held at chin level
  function drawArmMicChin(ctx, bx, by, leanBack) {
    leanBack=leanBack||0;
    rect(ctx,bx-16+leanBack,by-20,6,10,C.suit,C.outline);
    rect(ctx,bx-14+leanBack,by-11,5, 8,C.skin,C.outline);
    // mic at chin
    rect(ctx,bx-13+leanBack,by-3, 3,10,C.mic,C.outline);
    circle(ctx,bx-12+leanBack,by-4,4,C.micH,C.outline);
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=6;

    if (mode==='idle') {
      const breathe = Math.sin(frameT*Math.PI*1.5)*1;
      const lean    = 3+Math.sin(frameT*Math.PI*1.5)*0.5;
      drawLegsSeatedCrossed(ctx,bx,by+breathe*0.2,lean);
      drawSuit(ctx,bx,by+breathe*0.3,lean);
      drawArmDrape(ctx,bx,by+breathe*0.3,lean);
      drawArmMicChin(ctx,bx,by+breathe*0.3,lean);
      drawHead(ctx,bx,by+breathe,-0.06,false);

    } else if (mode==='hype') {
      const bob  = Math.abs(Math.sin(frameT*Math.PI*2))*3;
      const lean = 3;
      // rise slightly from chair for emphasis
      drawLegsSeatedCrossed(ctx,bx,by-bob*0.3,lean);
      drawSuit(ctx,bx,by-bob*0.4,lean-bob*0.2);
      drawArmDrape(ctx,bx,by-bob*0.4,lean);
      drawArmMicChin(ctx,bx,by-bob*0.4,lean);
      drawHead(ctx,bx,by-bob,-0.04,bob>2);

    } else { // spit — lean fully forward
      const lean = -1; // lean forward (negative = toward camera)
      drawLegsSeatedCrossed(ctx,bx,by,1);
      drawSuit(ctx,bx,by,lean);
      drawArmDrape(ctx,bx,by,lean);
      drawArmMicChin(ctx,bx,by,lean);
      drawHead(ctx,bx,by,0.06,true);
    }
    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['boss']={
    id:'boss', label:'Boss — white suit, crossed legs, mic at chin',
    lineAssignments:[29,30,31,32,33],
    draw:drawRapper,
    modeForLine(i){return i<=32?'hype':'spit';}
  };
})();
