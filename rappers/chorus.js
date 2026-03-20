/**
 * RAPPER: "Chorus"
 * Lines 42–46: "'Cause my victory is sweet / Watch competition bleed..."
 * Pose: leaning into an invisible mic stand, hand cupped around ear,
 *       eyes closed feeling the moment, other arm wide — pure vocal power
 * Palette: silk shirt iridescent teal/purple, clean trousers
 */
(function () {
  'use strict';

  const C = {
    skin:'#f0aa70', skinD:'#c87840',
    silk:'#006688', silkD:'#004455', silkHL:'#00aacc', silkSheen:'#44ccdd',
    pants:'#111122', shoe:'#0a0a22',
    chain:'#ffcc00', chainD:'#cc9900',
    mic:'#aaaaaa', micH:'#dddddd', stand:'#888877',
    outline:'#000', white:'#fffde0',
    shimmer:'rgba(0,200,255,0.15)',
  };

  function rect(ctx,x,y,w,h,f,s){ctx.fillStyle=f;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=0.5;ctx.strokeRect(x+.25,y+.25,w-.5,h-.5);}}
  function circle(ctx,cx,cy,r,f,s){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=0.6;ctx.stroke();}}

  // Shimmer effect on silk
  function drawShimmer(ctx, bx, by, t) {
    ctx.globalAlpha=0.2+Math.abs(Math.sin(t*Math.PI*2))*0.15;
    ctx.fillStyle=C.shimmer;
    ctx.fillRect(bx-4,by-20, 8,14);
    ctx.globalAlpha=1;
  }

  function drawHead(ctx, bx, by, eyesClosed, mouthOpen, tiltIn) {
    ctx.save();
    ctx.translate(bx, by-34);
    ctx.rotate(tiltIn||0);
    rect(ctx,-7,-6,14,14,C.skin,C.outline);
    rect(ctx,-7,-6,14, 3,'#1a0a00');
    // smooth fade sides
    rect(ctx,-7,-4, 3, 8,'#1a0a00');
    // eyes — closed = feeling the music
    if (eyesClosed) {
      rect(ctx,-5,-1, 4, 1,C.outline);
      rect(ctx, 1,-1, 4, 1,C.outline);
      rect(ctx,-4,-1, 2, 1,'#c07040'); // eyelid curve
      rect(ctx, 2,-1, 2, 1,'#c07040');
    } else {
      rect(ctx,-5,-1, 4, 2,C.outline);
      rect(ctx, 1,-1, 4, 2,C.outline);
      rect(ctx,-4, 0, 2, 1,C.white);
      rect(ctx, 2, 0, 2, 1,C.white);
    }
    // open mouth singing
    if (mouthOpen) {
      rect(ctx,-4, 3, 8, 4,C.outline);
      rect(ctx,-3, 3, 6, 2,C.white);
      rect(ctx,-2, 3, 4, 2,'#333');
      rect(ctx,-1, 3, 2, 1,C.chain);
    } else {
      rect(ctx,-3, 3, 6, 2,C.outline);
      rect(ctx,-2, 4, 4, 1,C.white);
    }
    ctx.restore();
  }

  function drawSilkShirt(ctx, bx, by, leanX, t) {
    leanX=leanX||0;
    rect(ctx,bx-8+leanX,by-22,16,18,C.silk,C.outline);
    // silk sheen
    rect(ctx,bx-5+leanX,by-22, 4,18,C.silkHL);
    rect(ctx,bx+3+leanX,by-22, 2,18,C.silkSheen);
    // open collar
    rect(ctx,bx-3+leanX,by-22, 6, 6,C.silkD);
    rect(ctx,bx-2+leanX,by-22, 4, 8,C.silkD);
    drawShimmer(ctx,bx+leanX,by,t||0);
    // chain
    rect(ctx,bx-4+leanX,by-19, 8, 1,C.chain);
    rect(ctx,bx-3+leanX,by-17, 6, 1,C.chain);
    rect(ctx,bx-2+leanX,by-15, 4, 1,C.chainD);
  }

  function drawLegs(ctx, bx, by, leanX) {
    leanX=leanX||0;
    rect(ctx,bx-7+leanX*0.2,by-4, 6,13,C.pants,C.outline);
    rect(ctx,bx-7+leanX*0.2,by+9, 7, 4,C.shoe);
    rect(ctx,bx+1+leanX*0.2,by-4, 6,13,C.pants,C.outline);
    rect(ctx,bx+0+leanX*0.2,by+9, 7, 4,C.shoe);
  }

  // Left arm — hand cupped to ear (listening/feeling)
  function drawArmEarCup(ctx, bx, by, leanX) {
    leanX=leanX||0;
    rect(ctx,bx-14+leanX,by-22, 5, 8,C.skin,C.outline);
    rect(ctx,bx-12+leanX,by-15, 4, 8,C.skin,C.outline);
    // hand cupped up to ear
    ctx.save();
    ctx.translate(bx-9+leanX, by-32);
    ctx.rotate(-0.3);
    rect(ctx,-2,-2, 5, 5,C.skin,C.outline);
    rect(ctx,-1,-3, 3, 8,C.skin,C.outline); // fingers curled
    ctx.restore();
  }

  // Right arm — wide open, conducting the emotion
  function drawArmWide(ctx, bx, by, spreadX, liftY) {
    spreadX=spreadX||0; liftY=liftY||0;
    rect(ctx,bx+8,       by-22-liftY, 10+spreadX, 5,C.skin,C.outline);
    rect(ctx,bx+16+spreadX,by-24-liftY, 8, 5,C.skin,C.outline);
    // open palm
    rect(ctx,bx+22+spreadX,by-26-liftY, 6, 7,C.skin,C.outline);
    for(let i=0;i<4;i++) rect(ctx,bx+22+spreadX+i*1.5,by-32-liftY, 2,7,C.skin,C.outline);
  }

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    const bx=0, by=0;

    if (mode==='idle') {
      const sway   = Math.sin(frameT*Math.PI*2)*2;
      const spread = 2+Math.sin(frameT*Math.PI*2)*2;
      const eyes   = Math.sin(frameT*Math.PI*2)>0.7; // briefly open
      drawLegs(ctx,bx+sway*0.2,by);
      drawSilkShirt(ctx,bx,by,sway*0.4,frameT);
      drawArmEarCup(ctx,bx+sway*0.4,by,sway*0.4);
      drawArmWide(ctx,bx+sway*0.4,by,spread,1);
      drawHead(ctx,bx+sway,by,!eyes,!eyes,sway*0.02);

    } else if (mode==='hype') {
      const lift  = Math.abs(Math.sin(frameT*Math.PI*3))*6;
      const bob   = Math.abs(Math.sin(frameT*Math.PI*3))*3;
      const mouth = Math.sin(frameT*Math.PI*3)>0;
      drawLegs(ctx,bx,by-bob);
      drawSilkShirt(ctx,bx,by-bob,0,frameT);
      drawArmEarCup(ctx,bx,by-bob,0);
      drawArmWide(ctx,bx,by-bob,6,lift);
      drawHead(ctx,bx,by-bob,false,mouth,-0.05);

    } else { // spit — full vocal open
      drawLegs(ctx,bx,by);
      drawSilkShirt(ctx,bx,by,2,frameT);
      drawArmEarCup(ctx,bx+2,by,2);
      drawArmWide(ctx,bx+2,by,8,6);
      drawHead(ctx,bx+2,by,false,true,-0.08);
    }
    ctx.restore();
  }

  window.RAPPERS=window.RAPPERS||{};
  window.RAPPERS['chorus']={
    id:'chorus', label:'Chorus — silk shirt, hand to ear, arm wide, eyes closed',
    lineAssignments:[42,43,44,45,46],
    draw:drawRapper,
    modeForLine(i){return i<=45?'hype':'spit';}
  };
})();
