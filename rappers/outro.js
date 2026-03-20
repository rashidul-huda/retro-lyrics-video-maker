/**
 * RAPPER: "Outro"
 * Pose: arms flung wide open, head tilted back in victory/glory,
 *       mic dropped/dangling from one hand, other hand open to sky
 *       Fur coat, big chains — celebration mode
 * Animations: idle (slow glory sway), hype (pump-up arms wide), spit (drop mic pose)
 */
(function () {
  'use strict';

  const C = {
    skin:'#f5c98a', skinD:'#d4915a', hair:'#1a0a00',
    coat:'#ffffff', coatFur:'#dddddd', coatD:'#bbbbbb',
    coatInner:'#111', // black lining
    pants:'#111111', shoe:'#222',
    chain1:'#ffcc00', chain2:'#ffdd44', chainD:'#cc9900',
    mic:'#888866', micH:'#ccccaa', cord:'#555',
    ring:'#ffcc00',
    outline:'#000', white:'#fffde0',
    pendant:'#ffcc00', pendantGem:'#ff3399',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  function drawHead(ctx, bx, by, tiltBack, mouthOpen) {
    ctx.save();
    ctx.translate(bx, by-34);
    ctx.rotate(tiltBack||0); // negative = tilt back
    rect(ctx,-7,-4,14,14,C.skin,C.outline);
    rect(ctx,-7,-4,14, 3,C.hair);
    // wide open celebratory eyes
    rect(ctx,-5, 0, 4, 4,C.outline);
    rect(ctx, 1, 0, 4, 4,C.outline);
    rect(ctx,-4, 1, 2, 2,C.white);
    rect(ctx, 2, 1, 2, 2,C.white);
    rect(ctx,-3, 1, 1, 1,'#333');
    rect(ctx, 2, 1, 1, 1,'#333');
    if (mouthOpen) {
      // big open laugh
      rect(ctx,-4, 6, 8, 4,C.outline);
      rect(ctx,-3, 6, 6, 2,C.white);
      rect(ctx,-2, 6, 2, 1,C.chain1);
      rect(ctx, 0, 6, 2, 1,C.white);
    } else {
      rect(ctx,-3, 6, 6, 2,C.outline);
      rect(ctx,-2, 6, 4, 1,C.white);
      rect(ctx,-1, 6, 2, 1,C.chain1);
    }
    ctx.restore();
  }

  function drawCoat(ctx, bx, by, openAmt) {
    openAmt=openAmt||0;
    // main coat body
    rect(ctx, bx-9, by-22, 18, 20, C.coat, C.outline);
    // fur collar
    rect(ctx, bx-9, by-22, 18,  5, C.coatFur);
    // lapels (open coat showing inner)
    rect(ctx, bx-3, by-20, 6, 18, C.coatInner);
    // fur cuffs on coat edges
    rect(ctx, bx-9, by-5, 18, 3, C.coatFur);
    // massive chain layers
    for (let i=0; i<5; i++) {
      const chainW = 10-i;
      rect(ctx, bx-chainW/2, by-18+i*2, chainW, 1, i%2===0?C.chain1:C.chain2);
    }
    // big pendant
    circle(ctx, bx, by-10, 4, C.pendant, C.outline);
    rect(ctx, bx-1, by-12, 2, 4, C.pendantGem);
    circle(ctx, bx, by-10, 2, C.pendantGem);
  }

  function drawLegs(ctx, bx, by) {
    rect(ctx, bx-7, by-4, 6, 13, C.pants, C.outline);
    rect(ctx, bx-7, by+9, 7,  4, C.shoe);
    rect(ctx, bx+1, by-4, 6, 13, C.pants, C.outline);
    rect(ctx, bx,   by+9, 7,  4, C.shoe);
  }

  // Left arm — wide open toward sky
  function drawArmOpenLeft(ctx, bx, by, liftY, spreadX) {
    liftY=liftY||0; spreadX=spreadX||0;
    rect(ctx, bx-20-spreadX, by-22-liftY*0.3, 12, 5, C.skin, C.outline);
    rect(ctx, bx-26-spreadX, by-28-liftY,      8, 8, C.skin, C.outline);
    // open palm facing up
    rect(ctx, bx-29-spreadX, by-36-liftY,      8, 6, C.skin, C.outline);
    // fingers spread
    for (let i=0;i<4;i++) {
      rect(ctx, bx-29-spreadX+i*2, by-42-liftY, 1, 7, C.skin, C.outline);
    }
    // fur cuff
    rect(ctx, bx-22-spreadX, by-26-liftY, 6, 2, C.coatFur);
  }

  // Right arm — mic dangling / swinging
  function drawArmMicDangle(ctx, bx, by, swingAmt) {
    swingAmt=swingAmt||0;
    rect(ctx, bx+8, by-22, 12, 5, C.skin, C.outline);
    rect(ctx, bx+15,by-18, 8,  8, C.skin, C.outline);
    // mic dangling from loose grip (tilted)
    ctx.save();
    ctx.translate(bx+20, by-12);
    ctx.rotate(0.4+swingAmt);
    rect(ctx,-1,-2,3,12,C.mic,C.outline);
    circle(ctx,0,-3,4,C.micH,C.outline);
    // cord droops
    ctx.beginPath();
    ctx.moveTo(1,10);
    ctx.quadraticCurveTo(8,18,4,24);
    ctx.strokeStyle=C.cord; ctx.lineWidth=1; ctx.stroke();
    ctx.restore();
    // fur cuff
    rect(ctx, bx+15, by-14, 6, 2, C.coatFur);
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=0;

    if (mode==='idle') {
      const sway   = Math.sin(frameT*Math.PI*1.5)*2;
      const lift   = 3+Math.sin(frameT*Math.PI*1.5)*2;
      const swing  = Math.sin(frameT*Math.PI*1.5)*0.15;
      drawLegs(ctx, bx+sway*0.2, by);
      drawCoat(ctx, bx, by, sway*0.3);
      drawArmOpenLeft(ctx, bx+sway*0.4, by, lift, sway*0.5);
      drawArmMicDangle(ctx, bx+sway*0.4, by, swing);
      drawHead(ctx, bx+sway, by, -0.08-sway*0.01, false);

    } else if (mode==='hype') {
      const pump  = Math.abs(Math.sin(frameT*Math.PI*3))*8;
      const bob   = Math.abs(Math.sin(frameT*Math.PI*3))*4;
      const swing = Math.sin(frameT*Math.PI*3)*0.3;
      drawLegs(ctx, bx, by-bob);
      drawCoat(ctx, bx, by-bob);
      drawArmOpenLeft(ctx, bx, by-bob, pump+4, pump*0.4);
      drawArmMicDangle(ctx, bx, by-bob, swing);
      drawHead(ctx, bx, by-bob, -0.12, pump>5);

    } else { // spit/outro — drop mic, both arms go up
      const glory = Math.min(1, frameT*2);
      const lift  = glory*12;
      drawLegs(ctx, bx, by);
      drawCoat(ctx, bx, by);
      drawArmOpenLeft(ctx, bx, by, lift, lift*0.5);
      // right arm also goes up in glory
      rect(ctx, bx+8, by-22-lift*0.3, 12, 5, C.skin, C.outline);
      rect(ctx, bx+15,by-28-lift,      8, 8, C.skin, C.outline);
      rect(ctx, bx+16,by-36-lift,      6, 6, C.skin, C.outline);
      for (let i=0;i<4;i++) {
        rect(ctx, bx+16+i*1.5, by-42-lift, 1, 7, C.skin, C.outline);
      }
      rect(ctx, bx+15,by-26-lift, 6, 2, C.coatFur);
      drawHead(ctx, bx, by, -0.18, true);
    }

    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['outro']={
    id:'outro', label:'Outro — fur coat, arms glory-wide, mic dangle',
    lineAssignments:[41,42,43,44,45,46,47,48,49,50,51,52,53],
    draw:drawRapper,
    modeForLine(i){ return i>=51?'spit':'hype'; }
  };
})();
