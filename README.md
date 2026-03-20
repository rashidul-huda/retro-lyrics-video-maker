# 🎤 Retro Lyrics Video Maker

> A browser-based tool that turns an MP3 and a timed lyrics JSON into a **high-quality retro-themed lyrics video** — complete with 8-bit rapper animations, VHS intro, word-perfect karaoke highlighting, and direct WebM export at up to 20 Mbps. No server. No installs. Just open `index.html` in Chrome.

![Retro Lyrics Video Maker Screenshot]([https://i.imgur.com/placeholder.png](https://i.ibb.co/20RnhNZF/retro-lyrics-video-maker.png))

---

## ✨ Features

- **Word-perfect karaoke** — every word highlights exactly as it's spoken, with a live fill-underline and glow effect
- **18 unique 8-bit rapper characters** — each with 3 animation modes (idle, hype, spit), assignable per line
- **Animated VHS intro** — ▶ PLAY glitch-in → song title above rapper → GET READY countdown below feet
- **Retro visual style** — amber CRT scanlines, perspective grid floor, scrolling stars, floating pixel squares, film grain, corner bracket decorations
- **Per-line rapper assignment** — pick a different rapper and animation mode for every line of the song from a table in the UI
- **Direct WebM export** — VP9 codec, up to 20 Mbps, 320 kbps audio, rendered in real-time via `MediaRecorder`
- **1080p landscape** output (1920 × 1080)
- **Extensible rapper system** — add new 8-bit characters by dropping a single JS file into `rappers/`

---

## 🚀 Quick Start

### 1. Clone or download

```bash
git clone https://github.com/rashidul-huda/retro-lyrics-video-maker.git
cd retro-lyrics-video-maker
```

Or just download the ZIP and unzip it anywhere.

### 2. Open in Chrome

```
open index.html
```

> **Important:** Use **Google Chrome** (or a Chromium-based browser). Chrome has the best support for `VP9` encoding via `MediaRecorder`, `captureStream()`, and the `Web Audio API` that this tool depends on. Firefox and Safari have limited or no `MediaRecorder` encoding support.

### 3. Get your files ready

You need two files:

| File | What it is | How to get it |
|------|-----------|---------------|
| **MP3 / WAV** | Your song audio | Any audio file |
| **Timed lyrics JSON** | Word-level timestamps | [mykaraoke.video](https://mykaraoke.video) |

#### Getting timed lyrics from mykaraoke.video

1. Go to [mykaraoke.video](https://mykaraoke.video)
2. Upload your audio file
3. It auto-generates timestamps for every word
4. Export / download the JSON file

The JSON format the tool expects looks like this:

```json
[
  {
    "id": 0,
    "words": [
      { "id": 0, "text": "Yeah,",   "timestamp": 14.018, "duration": 0.21 },
      { "id": 1, "text": "I'm",     "timestamp": 14.238, "duration": 0.10 },
      { "id": 2, "text": "coming",  "timestamp": 14.351, "duration": 0.229 }
    ]
  },
  {
    "id": 1,
    "words": [
      { "id": 0, "text": "Next",    "timestamp": 15.86,  "duration": 0.08 }
    ]
  }
]
```

Each top-level object is a **line**. Each line has a `words` array where every word has:
- `text` — the word string
- `timestamp` — seconds from the start of the audio when the word begins
- `duration` — how long (in seconds) the word lasts

### 4. Load your files

In the tool UI:
1. Drop or click to upload your **audio file** (MP3/WAV/AAC)
2. Drop or click to upload your **lyrics JSON**
3. Type your **song title** in the text field (shown during the intro)

### 5. Assign rappers (optional but fun)

Once the JSON loads, a table appears listing every line of lyrics. For each line you can choose:
- **Rapper** — which 8-bit character to show
- **Animation mode** — `idle` (slow loop), `hype` (energetic bounce), or `spit` (aggressive lean)

The tool auto-assigns rappers based on each rapper's `lineAssignments` array. You can override any line manually.

### 6. Render

Click **▶ RENDER VIDEO**.

The canvas will start playing through the song in real-time while recording. **Keep the tab active and visible** — browsers throttle background tabs and this will cause the recording to stutter or fail.

When it finishes, a **⬇ DOWNLOAD WEBM** button appears. Click it to save your video.

---

## 📁 File Structure

```
retro-lyrics-video-maker/
├── index.html              ← The entire tool (UI + renderer + recorder)
└── rappers/
    ├── crown.js            ← Pointing up, mic raised (intro / lines 0–1)
    ├── lean.js             ← Arms spread wide, ice sunglasses
    ├── hunch.js            ← Hooded, both fists on mic
    ├── spin.js             ← Varsity jacket, leg kicked out
    ├── throne.js           ← Seated king, crown and robe
    ├── shadow.js           ← Hooded silhouette, gold eye reveal
    ├── flex.js             ← Double bicep flex, mic in teeth
    ├── wave.js             ← Tracksuit, rolling wave arms
    ├── battle.js           ← Red cargos, bandana, finger point
    ├── snake.js            ← Crouched, knife-hand chop
    ├── boss.js             ← White suit, legs crossed, CEO
    ├── blueprint.js        ← Navy shirt, pointing at board
    ├── freight.js          ← Full sprint, fire shirt, fists
    ├── eruption.js         ← Arms wide, burst rays, screaming
    ├── chorus.js           ← Silk shirt, hand to ear, eyes closed
    ├── ghost.js            ← All black, arm pointing down
    ├── exit.js             ← Walking away, crown, peace sign
    └── outro.js            ← Fur coat, arms glory-wide
```

---

## 🕹️ The 18 Rappers

All rappers share the same proportions and pixel scale — same character, completely different personality.

| Rapper | Signature Look | Default Lines | Best For |
|--------|---------------|---------------|----------|
| **Crown** | Mic raised, pointing up, gold chain | Intro, 0–1 | Opening bars, braggadocious |
| **Lean** | Arms spread wide, ice sunglasses | 2–3 | Drip energy, relaxed flex |
| **Hunch** | Hoodie, both fists on mic, hunched | 4–6 | Intense delivery, threat bars |
| **Spin** | Varsity jacket, leg kicked back | 7–8 | High energy, party vibes |
| **Throne** | Seated king, crown, gold-trim robe | 9–11 | Power, royalty, dominance |
| **Shadow** | Side profile, deep hood, fist raised | 12–14 | Dark, brooding, mysterious |
| **Flex** | Tank top, double bicep, mic in teeth | 15–17 | Boastful, physical power |
| **Wave** | Orange tracksuit, rolling wave arms | 18–20 | Dance, celebration, chorus |
| **Battle** | Red cargos, bandana, finger point | 21–24 | Confrontational, battle rap |
| **Snake** | Crouched, reptile jacket, knife chop | 25–28 | Danger, menace, dark punchlines |
| **Boss** | White suit, legs crossed, CEO mic | 29–33 | Authority, dismissive, rich |
| **Blueprint** | Navy shirt, pencil ear, board point | 34–37 | Strategic, calculated, smart bars |
| **Freight** | Full sprint, fire shirt, fists pump | 38–40 | Energy, momentum, explosive |
| **Eruption** | Arms flung wide, burst rays | 41 | Climax moments, big revelation |
| **Chorus** | Silk shirt, hand to ear, eyes closed | 42–46 | Hooks, emotional, vocal power |
| **Ghost** | All black, arm pointing down | 47–50 | Cold, menacing, slow burn |
| **Exit** | Walking away, crown, peace sign | 51–53 | Outros, sign-offs, closers |
| **Outro** | Fur coat, arms wide, mic dangling | Manual | Victory laps, celebrations |

---

## ➕ Adding Your Own Rapper

Each rapper is a self-contained JavaScript file that registers itself on `window.RAPPERS`. To create a new one:

### 1. Create the file

Create `rappers/yourname.js`. Copy this template:

```javascript
(function () {
  'use strict';

  // Your colour palette
  const C = {
    skin: '#f5c98a',
    hair: '#1a0a00',
    shirt: '#cc4400',
    pants: '#2a1a00',
    shoe: '#111',
    chain: '#ffcc00',
    mic: '#888866',
    micH: '#ccccaa',
    outline: '#000',
    white: '#fffde0',
  };

  // Helper: draw a filled rectangle, optionally stroked
  function rect(ctx, x, y, w, h, fill, stroke) {
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, w, h);
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x + 0.25, y + 0.25, w - 0.5, h - 0.5);
    }
  }

  // Helper: draw a filled circle
  function circle(ctx, cx, cy, r, fill, stroke) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 0.6; ctx.stroke(); }
  }

  // Main draw function — called every frame
  // ctx    : CanvasRenderingContext2D (already translated to cx, cy and scaled)
  // cx, cy : canvas pixel position of the rapper's hip pivot
  // scale  : pixels per "pu" (pixel unit). At 1080p, scale ≈ 4.32
  // mode   : 'idle' | 'hype' | 'spit'
  // frameT : 0→1 animation loop position
  function drawRapper(ctx, cx, cy, scale, mode, frameT) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // bx, by = your drawing pivot in pu coords (0,0 = hip centre)
    const bx = 0, by = 0;

    if (mode === 'idle') {
      const sway = Math.sin(frameT * Math.PI * 2) * 2;
      // draw your character here using rect() and circle()
      // all coordinates are in pu (pixel units), not canvas pixels
      // head is typically at bx, by - 38
      // torso at bx, by - 22
      // legs below by - 4

    } else if (mode === 'hype') {
      // energetic version

    } else {
      // spit — aggressive lean
    }

    ctx.restore();
  }

  // Register the rapper
  window.RAPPERS = window.RAPPERS || {};
  window.RAPPERS['yourname'] = {
    id:    'yourname',
    label: 'YourName — short description of pose',

    // Which line indices to auto-assign this rapper to.
    // -1 = the intro (pre-lyrics section).
    // Leave empty [] to make it manual-assign only.
    lineAssignments: [10, 11, 12],

    draw: drawRapper,

    // Returns the animation mode for a given line index.
    modeForLine(lineIdx) {
      if (lineIdx < 0)  return 'idle';
      if (lineIdx <= 11) return 'hype';
      return 'spit';
    }
  };

})();
```

### 2. Load it in index.html

Open `index.html` and find the rapper script block near the bottom. Add your file:

```html
<!-- ── Rapper modules ── -->
<script src="rappers/crown.js"></script>
<!-- ... existing rappers ... -->
<script src="rappers/yourname.js"></script>  ← add this line
```

### 3. That's it

Reload the page and your rapper will appear in every dropdown in the rapper assignment table.

### Coordinate system

All drawing coordinates inside `drawRapper` are in **pu (pixel units)**. The canvas scale transform means `1 pu = scale px` on the actual canvas (at 1080p, `scale ≈ 4.32`). A standard character is about 80 pu tall:

```
y = -50 pu   ← top of head / crown
y = -38 pu   ← base of head
y = -22 pu   ← shoulders / top of torso
y =   0 pu   ← hip pivot (origin)
y =  -4 pu   ← top of legs
y =  +9 pu   ← bottom of legs / top of shoes
y = +13 pu   ← bottom of shoes
```

Horizontal (`x`): `0` is the body centreline. Negative = left, positive = right.

---

## ⚙️ How It Works (Technical)

```
Audio file
    │
    ▼
Web Audio API → AudioBufferSourceNode → MediaStreamDestination
                                              │
                                              ▼ (audio track)
HTML5 Canvas ──────────────────────────── MediaStream ──→ MediaRecorder → WebM blob
    │                                         ▲
    │ captureStream(60fps)                    │
    ▼                                         │
Canvas render loop (requestAnimationFrame)    │
  • AudioContext.currentTime = sync clock     │
  • Draw background, stars, grid             ─┘
  • Draw 8-bit rapper (pixel art via Canvas 2D)
  • Draw lyric lines with per-word state
  • Apply scanlines, grain, flicker overlays
```

**Why `AudioContext.currentTime` and not `performance.now()`?**

`performance.now()` drifts from the audio engine clock, causing captions to fall out of sync — especially over longer songs. By using `audioCtx.currentTime - audioStartTime` as the single source of truth for both the canvas renderer and the lyric word-state machine, audio and visuals are locked to the same clock.

**Why real-time rendering?**

`MediaRecorder` records what is actually drawn on the canvas as it happens. There is no offline render path in the browser without complex WebCodecs API work. The upside: what you see in the preview IS what gets recorded — no surprises.

---

## 🧰 Requirements

| Requirement | Details |
|------------|---------|
| **Browser** | Google Chrome 88+ (or any Chromium-based browser) |
| **Internet** | Only needed to load Google Fonts on first open. Works offline after that. |
| **No server** | Runs entirely in the browser — no Node, no Python, no backend |
| **File access** | Works from the local filesystem (`file://`) — no web server needed |

---

## 🛠️ Built With

- **HTML5 Canvas 2D API** — all visuals drawn frame-by-frame in JavaScript
- **Web Audio API** — audio decoding and clock synchronisation
- **MediaRecorder API** — VP9/WebM video capture
- **captureStream()** — pulls canvas frames into a `MediaStream`
- **Press Start 2P** (Google Fonts) — pixel-style UI font
- **Outfit** (Google Fonts) — lyric display font
- Zero dependencies. Zero npm. Zero build step.

---

## 📋 Tips & Troubleshooting

**The video is silent / has no audio**
> Make sure you're using Chrome. Safari and Firefox do not support adding an audio track to a canvas stream via `MediaRecorder` in the same way.

**The video stutters or skips frames**
> Keep the browser tab active and in the foreground during rendering. Chrome throttles background tabs, which causes frame drops in the recording.

**Words highlight at the wrong time**
> Check that your JSON timestamps match the actual audio. If the song has a long intro before the first word, the tool handles this automatically — it shows the intro animation until the first timestamp.

**The title in the intro is wrong**
> Type your song title in the "Song Title" field in the UI before rendering.

**Rapper assignments reset when I reload**
> Assignments are not saved between sessions. You'll need to re-assign after each page reload. (This is by design — no data is stored anywhere.)

**I want to add a background image**
> In `index.html`, find the `// ── BACKGROUND ──` comment in the `render` function and add `ctx.drawImage(yourImage, 0, 0, W, H)` as the first draw call.

---

## 🤝 Credits & Workflow

This tool was built entirely with **[Claude](https://claude.ai)** (Anthropic's AI assistant) through an iterative conversation — from the initial concept through every bug fix and feature addition.

The demo video *"My Victory Is Sweet!"* was made using:

| Step | Tool |
|------|------|
| Beat / sample generation | [Google Lyria 3](https://deepmind.google/technologies/lyria/) |
| Full song production | [Suno](https://suno.com) |
| Lyrics writing & extension | [Gemini 2.5 Pro](https://gemini.google.com) |
| Word-level timestamp generation | [mykaraoke.video](https://mykaraoke.video) |
| Lyrics video rendering | This tool + Claude |

---

## 📄 Licence

MIT — use it, fork it, build on it. If you make something cool, share it.

---

## ⭐ Star This Repo

If this tool saved you time or made something you're proud of, a star helps others find it.

**[⭐ Star on GitHub](https://github.com/rashidul-huda/retro-lyrics-video-maker)**
