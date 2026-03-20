/**
 * RAPPER: "Flex"
 * Pose: double bicep flex, mic clenched sideways in teeth, tank top, massive chains
 * Animations: idle (slow flex pump), hype (rapid pump both arms), spit (one arm drop, mic in hand)
 */
(function () {
  'use strict';

  const C = {
    skin:'#d4895a', skinD:'#b06030', skinHL:'#f0b080',
    muscle:'#c07048', // slightly darker for muscle definition
    tank:'#00aacc', tankD:'#007a99', tankHL:'#44ccee', // cyan tank
    pants:'#222244', shoe:'#111133',
    chain1:'#ffcc00', chain2:'#ffaa00', chainD:'#cc8800',
    tattoo:'#3344aa',
    mic:'#888866', micH:'#ccccaa',
    outline:'#000', white:'#fffde0',
    tooth:'#ffee88',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  function drawHead(ctx, bx, by, micInTeeth) {
    rect(ctx, bx-7, by-38, 14, 14, C.skin, C.outline);
    // short fade haircut
    rect(ctx, bx-7, by-38, 14,  3, '#1a0a00');
    rect(ctx, bx-7, by-37, 2,  6, '#1a0a00');
    rect(ctx, bx+5, by-37, 2,  6, '#1a0a00');
    // confident squinted eyes
    rect(ctx, bx-5, by-30, 4,  2, C.outline);
    rect(ctx, bx+1, by-30, 4,  2, C.outline);
    rect(ctx, bx-4, by-29, 2,  1, C.white);
    rect(ctx, bx+2, by-29, 2,  1, C.white);
    // smirk
    rect(ctx, bx-1, by-25, 2,  1, C.outline);
    rect(ctx, bx+1, by-24, 3,  1, C.outline);
    if (micInTeeth) {
      // mic sticking out of mouth sideways
      rect(ctx, bx-2, by-25,  5,  2, C.outline);
      rect(ctx, bx-2, by-24,  2,  1, C.tooth);
      rect(ctx, bx+1, by-24,  2,  1, C.tooth);
      // mic body horizontal
      rect(ctx, bx+3, by-26, 14,  3, C.mic,  C.outline);
      circle(ctx, bx+17, by-25, 3, C.micH, C.outline);
    }
    // jaw definition
    rect(ctx, bx-7, by-25, 2, 1, C.skinD);
    rect(ctx, bx+5, by-25, 2, 1, C.skinD);
  }

  function drawTank(ctx, bx, by, pumpMod) {
    pumpMod=pumpMod||0;
    // tank top (narrower — shows arms)
    rect(ctx, bx-6, by-22, 12, 18, C.tank, C.outline);
    rect(ctx, bx-6, by-22, 12,  2, C.tankD);
    // muscle definition on chest
    rect(ctx, bx-5, by-20, 4, 6, C.tankHL);
    rect(ctx, bx+1, by-20, 4, 6, C.tankHL);
    rect(ctx, bx-1, by-18, 2, 4, C.tankD);
    // massive chain layers
    for (let i=0;i<4;i++) {
      rect(ctx, bx-4+i%2, by-18+i*2, 8-i, 1, i%2===0?C.chain1:C.chain2);
    }
    // tattoo sleeve hint on left
    rect(ctx, bx-8, by-20, 2, 12, C.tattoo);
    rect(ctx, bx+6, by-20, 2, 12, C.tattoo);
  }

  function drawLegs(ctx, bx, by, wideStance) {
    wideStance=wideStance||0;
    rect(ctx, bx-8-wideStance, by-4, 6, 13, C.pants, C.outline);
    rect(ctx, bx-9-wideStance, by+9, 8,  4, C.shoe);
    rect(ctx, bx+2+wideStance, by-4, 6, 13, C.pants, C.outline);
    rect(ctx, bx+1+wideStance, by+9, 8,  4, C.shoe);
  }

  // Left bicep flex
  function drawFlexLeft(ctx, bx, by, pumpY) {
    pumpY=pumpY||0;
    // upper arm raised, elbow out
    rect(ctx, bx-18, by-22, 8, 6,  C.skin, C.outline);
    // muscle bulk
    rect(ctx, bx-17, by-23, 6, 4,  C.skinHL);
    // forearm curled up
    rect(ctx, bx-16, by-28-pumpY, 6, 8, C.skin, C.outline);
    // fist
    rect(ctx, bx-15, by-36-pumpY, 5, 6, C.skin, C.outline);
    rect(ctx, bx-15, by-37-pumpY, 5, 2, C.skinD);
    // bicep peak emphasis
    rect(ctx, bx-16, by-25-pumpY, 2, 4, C.skinHL);
  }

  // Right bicep flex
  function drawFlexRight(ctx, bx, by, pumpY) {
    pumpY=pumpY||0;
    rect(ctx, bx+10, by-22, 8, 6,  C.skin, C.outline);
    rect(ctx, bx+11, by-23, 6, 4,  C.skinHL);
    rect(ctx, bx+10, by-28-pumpY, 6, 8, C.skin, C.outline);
    rect(ctx, bx+10, by-36-pumpY, 5, 6, C.skin, C.outline);
    rect(ctx, bx+10, by-37-pumpY, 5, 2, C.skinD);
    rect(ctx, bx+14, by-25-pumpY, 2, 4, C.skinHL);
  }

  // Right arm down holding mic (for spit mode)
  function drawArmMicDown(ctx, bx, by) {
    rect(ctx, bx+10, by-22, 7, 10, C.skin, C.outline);
    rect(ctx, bx+11, by-12, 6,  8, C.skin, C.outline);
    rect(ctx, bx+12, by-4,  3, 12, C.mic,  C.outline);
    circle(ctx, bx+13, by-5, 4, C.micH, C.outline);
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=0;

    if (mode==='idle') {
      const pump  = Math.abs(Math.sin(frameT*Math.PI*1.5))*4;
      const blink = frameT>0.9;
      drawLegs(ctx, bx, by, 3);
      drawTank(ctx, bx, by, pump);
      drawFlexLeft(ctx, bx, by, pump);
      drawFlexRight(ctx, bx, by, pump);
      drawHead(ctx, bx, by, true);

    } else if (mode==='hype') {
      const pump  = Math.abs(Math.sin(frameT*Math.PI*4))*7;
      const bob   = Math.abs(Math.sin(frameT*Math.PI*4))*3;
      drawLegs(ctx, bx, by-bob, 4);
      drawTank(ctx, bx, by-bob, pump);
      drawFlexLeft(ctx, bx, by-bob, pump);
      drawFlexRight(ctx, bx, by-bob, pump);
      drawHead(ctx, bx, by-bob, true);

    } else { // spit — right arm drops, mic in hand
      const bob = Math.abs(Math.sin(frameT*Math.PI*2))*2;
      drawLegs(ctx, bx, by, 3);
      drawTank(ctx, bx, by);
      drawFlexLeft(ctx, bx, by, 3);
      drawArmMicDown(ctx, bx, by);
      drawHead(ctx, bx, by-bob, false);
    }

    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['flex']={
    id:'flex', label:'Flex — double bicep, mic in teeth, tank top',
    lineAssignments:[15,16,17],
    draw:drawRapper,
    modeForLine(i){ return i<=16?'hype':'spit'; }
  };
})();
