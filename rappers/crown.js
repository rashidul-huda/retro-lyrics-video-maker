/**
 * RAPPER: "Crown"
 * Pose: mic in left hand raised, right fist pointing up to the sky
 * Animations: IDLE (slow sway), HYPE (bouncing point), SPIT (lean-forward mic drop)
 *
 * Each animation is an array of draw functions (frames).
 * draw(ctx, x, y, scale) — draws the rapper centred at (x, y) scaled by `scale`
 *
 * Pixel unit = 1 "pu". At scale=1, the rapper is 80pu tall.
 * Caller scales to whatever pixel size fits the canvas.
 *
 * Export: window.RAPPERS['crown'] = { id, label, lineHint, animations }
 *   lineHint: which line index this rapper is default for (-1 = intro/all)
 *   animations: { idle, hype, spit }  — arrays of frame functions
 */

(function () {
  'use strict';

  // ── Palette (retro amber/warm) ───────────────────────────────────────────
  const C = {
    skin:    '#f5c98a',
    skinD:   '#d4915a',
    hair:    '#1a0a00',
    shirt:   '#cc4400',   // burnt orange
    shirtD:  '#882200',
    pants:   '#2a1a00',
    shoe:    '#111',
    mic:     '#888866',
    micHead: '#ccccaa',
    gold:    '#ffcc00',
    goldD:   '#cc9900',
    white:   '#fffde0',
    outline: '#000',
  };

  // ── Primitive helpers ────────────────────────────────────────────────────
  function rect(ctx, x, y, w, h, fill, stroke) {
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, w, h);
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x + 0.25, y + 0.25, w - 0.5, h - 0.5);
    }
  }

  function circle(ctx, cx, cy, r, fill, stroke) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 0.6; ctx.stroke(); }
  }

  // ── Body parts (all positions relative to bodyX, bodyY = hip centre) ────

  function drawHead(ctx, bx, by, eyeOpen, mouthOpen) {
    // head
    rect(ctx, bx - 7, by - 38, 14, 14, C.skin, C.outline);
    // hair
    rect(ctx, bx - 7, by - 38, 14, 4, C.hair);
    rect(ctx, bx - 8, by - 37, 2, 12, C.hair);
    // eyes
    const eyeH = eyeOpen ? 2 : 1;
    rect(ctx, bx - 5, by - 29, 3, eyeH, C.outline);
    rect(ctx, bx + 2, by - 29, 3, eyeH, C.outline);
    // whites
    if (eyeOpen) {
      rect(ctx, bx - 4, by - 29, 2, 1, C.white);
      rect(ctx, bx + 3, by - 29, 2, 1, C.white);
    }
    // mouth
    if (mouthOpen) {
      rect(ctx, bx - 3, by - 25, 6, 2, C.outline);
      rect(ctx, bx - 2, by - 25, 4, 1, C.white);
    } else {
      rect(ctx, bx - 3, by - 25, 6, 1, C.outline);
    }
    // chain / gold tooth glint
    rect(ctx, bx - 1, by - 25, 2, 1, C.gold);
  }

  function drawTorso(ctx, bx, by, leanX) {
    leanX = leanX || 0;
    rect(ctx, bx - 8 + leanX, by - 22, 16, 18, C.shirt, C.outline);
    rect(ctx, bx - 8 + leanX, by - 22, 16,  3, C.shirtD); // collar shadow
    // chain
    rect(ctx, bx - 4 + leanX, by - 19, 8, 1, C.gold);
    rect(ctx, bx - 3 + leanX, by - 17, 6, 1, C.gold);
    rect(ctx, bx - 1 + leanX, by - 15, 2, 1, C.goldD);
  }

  function drawLegs(ctx, bx, by, bounce) {
    bounce = bounce || 0;
    // left leg
    rect(ctx, bx - 7, by - 4 + bounce, 6, 12, C.pants, C.outline);
    rect(ctx, bx - 7, by + 8 + bounce, 7, 4, C.shoe);
    // right leg
    rect(ctx, bx + 1, by - 4 + bounce, 6, 12, C.pants, C.outline);
    rect(ctx, bx,     by + 8 + bounce, 7, 4, C.shoe);
  }

  // Left arm holding mic DOWN-ish  (resting position)
  function drawArmMicRest(ctx, bx, by) {
    rect(ctx, bx - 14, by - 20, 6, 10, C.skin, C.outline); // upper arm
    rect(ctx, bx - 13, by - 10, 5, 8,  C.skin, C.outline); // forearm
    // mic
    rect(ctx, bx - 12, by - 2,  3, 10, C.mic,     C.outline);
    circle(ctx, bx - 11, by - 3, 4, C.micHead, C.outline);
  }

  // Left arm holding mic UP (raised, performing)
  function drawArmMicUp(ctx, bx, by, raiseAmt) {
    raiseAmt = raiseAmt || 0; // 0..8 extra px upward
    rect(ctx, bx - 16, by - 22 - raiseAmt, 6, 9, C.skin, C.outline);
    rect(ctx, bx - 14, by - 32 - raiseAmt, 5, 12, C.skin, C.outline);
    // mic in hand
    rect(ctx, bx - 13, by - 46 - raiseAmt, 3, 14, C.mic, C.outline);
    circle(ctx, bx - 12, by - 46 - raiseAmt, 4, C.micHead, C.outline);
  }

  // Right arm pointing UP (crown pose)
  function drawArmPointUp(ctx, bx, by, pointAmt) {
    pointAmt = pointAmt || 0;
    rect(ctx, bx + 8,  by - 22 - pointAmt, 6, 9, C.skin, C.outline); // upper arm
    rect(ctx, bx + 10, by - 30 - pointAmt, 5, 10, C.skin, C.outline); // forearm
    // fist + pointing finger
    rect(ctx, bx + 10, by - 40 - pointAmt, 5, 6, C.skin, C.outline);
    rect(ctx, bx + 11, by - 46 - pointAmt, 3, 7, C.skin, C.outline); // finger
    // gold ring glint
    rect(ctx, bx + 11, by - 41 - pointAmt, 3, 1, C.gold);
  }

  // Right arm pointing OUT to side (hype pose)
  function drawArmPointSide(ctx, bx, by) {
    rect(ctx, bx + 8, by - 20, 10, 5, C.skin, C.outline);
    rect(ctx, bx + 18, by - 18, 8, 4,  C.skin, C.outline);
    rect(ctx, bx + 26, by - 17, 6, 3,  C.skin, C.outline); // fist
    rect(ctx, bx + 32, by - 18, 5, 2,  C.skin, C.outline); // pointing
  }

  // ── Full character draw ──────────────────────────────────────────────────
  // mode: 'idle' | 'hype' | 'spit'
  // frameT: 0..1 within animation loop

  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // bx, by = pivot point (hip centre) in pu coords
    const bx = 0;
    let by = 0;

    if (mode === 'idle') {
      // Gentle sway: body rocks left-right, mic arm down, point arm up slightly
      const sway  = Math.sin(frameT * Math.PI * 2) * 1.5;
      const bob   = Math.abs(Math.sin(frameT * Math.PI * 2)) * 1;
      const blink = frameT > 0.85 && frameT < 0.95 ? false : true;
      by += bob;

      drawLegs(ctx, bx + sway * 0.3, by);
      drawTorso(ctx, bx + sway * 0.5, by, sway * 0.3);
      drawArmMicRest(ctx, bx + sway * 0.5, by);
      drawArmPointUp(ctx, bx + sway * 0.5, by, 2 + Math.sin(frameT * Math.PI * 2) * 3);
      drawHead(ctx, bx + sway, by, blink, false);

    } else if (mode === 'hype') {
      // Bounce hard, mic up high, free arm out to side
      const beat  = Math.abs(Math.sin(frameT * Math.PI * 4)); // 2 bounces per loop
      const bob   = beat * 5;
      const raise = beat * 6;
      by -= bob;

      drawLegs(ctx, bx, by, bob * 0.4);
      drawTorso(ctx, bx, by, 0);
      drawArmMicUp(ctx, bx, by, raise);
      drawArmPointSide(ctx, bx, by);
      drawHead(ctx, bx, by, true, beat > 0.6);

    } else if (mode === 'spit') {
      // Lean forward, mic angled at mouth, free hand out
      const lean  = 3;
      const mouth = frameT < 0.5 ? true : frameT < 0.75 ? false : true;
      drawLegs(ctx, bx, by);
      drawTorso(ctx, bx, by, lean);
      drawArmMicUp(ctx, bx + lean, by, 4);
      drawArmPointSide(ctx, bx + lean, by);
      drawHead(ctx, bx + lean * 1.2, by, true, mouth);
    }

    ctx.restore();
  }

  // ── Register ─────────────────────────────────────────────────────────────
  window.RAPPERS = window.RAPPERS || {};
  window.RAPPERS['crown'] = {
    id:        'crown',
    label:     'Crown — pointing up, mic raised',
    // lineAssignments: which line indices use this rapper.
    // -1 = intro (pre-lyrics). You can add more indices.
    lineAssignments: [-1, 0, 1],
    draw: drawRapper,
    // Animation mode per line index (-1 = idle loop during intro)
    modeForLine(lineIdx) {
      if (lineIdx < 0) return 'idle';
      if (lineIdx <= 1) return 'hype';
      return 'spit';
    }
  };

})();
