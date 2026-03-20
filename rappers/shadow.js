/**
 * RAPPER: "Shadow"
 * Pose: drawn in 3/4 side profile, deep hood, only one fist visible raised,
 *       mic barely visible at side — mysterious, brooding
 * Animations: idle (slow hood sway), hype (punch-out rhythm), spit (turn toward camera reveal)
 */
(function () {
  'use strict';

  const C = {
    skin:'#c87840', skinD:'#9a5020', hair:'#050200',
    hood:'#111111', hoodD:'#050505', hoodHL:'#222222',
    sleeve:'#111111', pants:'#0a0a0a', shoe:'#111',
    chain:'#ffcc00', chainD:'#cc9900',
    mic:'#666655', micH:'#aaaaaa',
    fist:'#c87840', ring:'#ffcc00',
    outline:'#000', white:'#fffde0',
    shadowTone:'rgba(0,0,0,0.6)',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  // Profile head with deep hood
  function drawHead(ctx, bx, by, revealAmt, mouthOpen) {
    // hood silhouette
    rect(ctx, bx-8, by-42, 16, 18, C.hood, C.outline);
    // hood shadow interior
    rect(ctx, bx-6, by-40, 12, 16, C.hoodD);
    // reveal face partially based on revealAmt (0=fully hidden, 1=revealed)
    const faceAlpha = revealAmt;
    if (faceAlpha > 0) {
      ctx.globalAlpha = faceAlpha;
      // face
      rect(ctx, bx-4, by-38, 10, 12, C.skin, C.outline);
      // one eye visible (side profile)
      rect(ctx, bx+2, by-32, 3, 2, C.outline);
      if (faceAlpha > 0.5) {
        rect(ctx, bx+3, by-31, 2, 1, C.white);
        rect(ctx, bx+3, by-32, 1, 1, '#222');
      }
      if (mouthOpen && faceAlpha > 0.6) {
        rect(ctx, bx, by-27, 5, 2, C.outline);
        rect(ctx, bx+1,by-27, 3, 1, C.white);
      } else {
        rect(ctx, bx+1, by-27, 3, 1, C.outline);
      }
      ctx.globalAlpha = 1;
    }
    // hood rim shadow
    rect(ctx, bx-7, by-40, 14, 3, C.hoodD);
    rect(ctx, bx-7, by-38, 3, 14, C.hoodD);
  }

  function drawBody(ctx, bx, by, offset) {
    offset=offset||0;
    rect(ctx, bx-8+offset, by-22, 16, 20, C.hood, C.outline);
    rect(ctx, bx-7+offset, by-21,  3, 18, C.hoodD); // shadow left edge
    // chain barely visible
    rect(ctx, bx-2+offset, by-16, 6, 1, C.chainD);
    rect(ctx, bx-1+offset, by-14, 4, 1, C.chainD);
  }

  function drawLegs(ctx, bx, by) {
    rect(ctx, bx-6, by-3, 6, 13, C.pants, C.outline);
    rect(ctx, bx-7, by+10, 8,  4, C.shoe);
    rect(ctx, bx,   by-3, 6, 13, C.pants, C.outline);
    rect(ctx, bx-1, by+10, 8,  4, C.shoe);
  }

  // Hidden arm (just sleeve silhouette at side)
  function drawArmHidden(ctx, bx, by) {
    rect(ctx, bx-14, by-20, 5, 14, C.sleeve, C.outline);
    rect(ctx, bx-13, by-7,  4,  6, C.sleeve, C.outline);
  }

  // Raised fist arm
  function drawArmFist(ctx, bx, by, raiseY, punchX) {
    raiseY=raiseY||0; punchX=punchX||0;
    rect(ctx, bx+8+punchX, by-22-raiseY,  6,  9, C.sleeve, C.outline);
    rect(ctx, bx+9+punchX, by-30-raiseY,  5, 10, C.fist,   C.outline);
    rect(ctx, bx+9+punchX, by-40-raiseY,  5,  8, C.fist,   C.outline); // fist
    // rings
    rect(ctx, bx+10+punchX,by-36-raiseY,  2,  1, C.ring);
    rect(ctx, bx+12+punchX,by-36-raiseY,  2,  1, C.ring);
    // knuckles
    rect(ctx, bx+9+punchX, by-39-raiseY,  1,  1, C.skinD);
    rect(ctx, bx+11+punchX,by-39-raiseY,  1,  1, C.skinD);
    rect(ctx, bx+13+punchX,by-39-raiseY,  1,  1, C.skinD);
  }

  // Mic arm barely visible at side
  function drawArmMicSide(ctx, bx, by) {
    rect(ctx, bx-13, by-5,  4,  6, C.sleeve, C.outline);
    rect(ctx, bx-12, by+1,  3,  8, C.mic,    C.outline);
    circle(ctx, bx-11, by, 3, C.micH, C.outline);
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=0;

    if (mode==='idle') {
      const sway   = Math.sin(frameT*Math.PI*1.5)*1.5;
      const reveal = 0.15 + Math.abs(Math.sin(frameT*Math.PI))*0.1;
      drawLegs(ctx, bx+sway*0.2, by);
      drawBody(ctx, bx, by, sway*0.3);
      drawArmHidden(ctx, bx+sway*0.3, by);
      drawArmMicSide(ctx, bx+sway*0.3, by);
      drawArmFist(ctx, bx+sway*0.3, by, 2, 0);
      drawHead(ctx, bx+sway, by, reveal, false);

    } else if (mode==='hype') {
      const punch  = Math.abs(Math.sin(frameT*Math.PI*3))*8;
      const bob    = Math.abs(Math.sin(frameT*Math.PI*3))*3;
      const reveal = 0.3 + punch/30;
      drawLegs(ctx, bx, by-bob*0.3);
      drawBody(ctx, bx, by-bob*0.3);
      drawArmHidden(ctx, bx, by-bob*0.3);
      drawArmMicSide(ctx, bx, by-bob*0.3);
      drawArmFist(ctx, bx, by-bob*0.3, 4, punch);
      drawHead(ctx, bx, by-bob, reveal, punch>5);

    } else { // spit — turn toward camera, full reveal
      const turn = Math.min(1, frameT < 0.3 ? frameT/0.3 : 1);
      drawLegs(ctx, bx, by);
      drawBody(ctx, bx, by, turn*3);
      drawArmHidden(ctx, bx+turn*3, by);
      drawArmMicSide(ctx, bx+turn*3, by);
      drawArmFist(ctx, bx+turn*3, by, 6, 0);
      drawHead(ctx, bx+turn*4, by, 0.5+turn*0.5, true);
    }

    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['shadow']={
    id:'shadow', label:'Shadow — hooded silhouette, fist raised',
    lineAssignments:[12,13,14],
    draw:drawRapper,
    modeForLine(i){ return i<=13?'hype':'spit'; }
  };
})();
