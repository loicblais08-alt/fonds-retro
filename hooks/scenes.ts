// Les trois decors animes, en SVG pur (pas d'image, pas de police).

const gridLines = [0, 1, 2, 3, 4, 5, 6, 7]
  .map(i => `<line class="h" style="animation-delay:-${(i * 0.5).toFixed(1)}s" x1="-400" x2="2000" y1="520" y2="520"/>`)
  .join('')

const rays = Array.from({ length: 21 }, (_, i) => {
  const x = -1200 + i * 200
  return `<line x1="800" y1="520" x2="${x}" y2="900"/>`
}).join('')

const stars = [
  [120, 80], [260, 190], [410, 60], [560, 230], [700, 110], [930, 70], [1050, 200],
  [1190, 90], [1330, 240], [1460, 120], [1540, 300], [80, 330], [340, 380], [1280, 380],
]
  .map(([x, y], i) => `<circle class="st" style="animation-delay:-${i * 0.7}s" cx="${x}" cy="${y}" r="${i % 3 === 0 ? 2.4 : 1.5}"/>`)
  .join('')

const palm = (x: number, flip: boolean) => `
<g transform="translate(${x} 525) scale(${flip ? -1 : 1} 1)" fill="#0b0118">
  <path d="M-6 0 C-2 -90 8 -170 26 -250 L36 -248 C20 -170 12 -90 10 0 Z"/>
  <path d="M30 -250 C-20 -280 -80 -270 -120 -230 C-70 -250 -30 -250 20 -238 Z"/>
  <path d="M30 -250 C80 -290 140 -280 180 -240 C130 -258 90 -258 40 -240 Z"/>
  <path d="M30 -252 C0 -310 -60 -330 -100 -320 C-50 -305 -10 -290 26 -246 Z"/>
  <path d="M32 -252 C70 -320 120 -330 160 -310 C110 -306 76 -290 38 -246 Z"/>
  <path d="M30 -248 C10 -220 -20 -170 -30 -130 C-10 -175 10 -210 36 -240 Z"/>
  <path d="M32 -248 C60 -220 90 -180 96 -140 C80 -180 60 -210 30 -240 Z"/>
</g>`

export const SYNTHWAVE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
<style>
.h { stroke: #ff2fb5; stroke-width: 3; opacity: 0.8; animation: run 4s linear infinite; }
@keyframes run {
  0% { transform: translateY(0); stroke-width: 1; opacity: 0.2; }
  100% { transform: translateY(380px); stroke-width: 4; opacity: 0.9; }
}
.h { animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
.st { fill: #ffffff; animation: tw 6s ease-in-out infinite; }
@keyframes tw { 0%, 100% { opacity: 0.9; } 50% { opacity: 0.3; } }
.sun { animation: glow 8s ease-in-out infinite; }
@keyframes glow { 0%, 100% { opacity: 1; } 50% { opacity: 0.85; } }
</style>
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0d0221"/>
    <stop offset="0.55" stop-color="#2a0845"/>
    <stop offset="1" stop-color="#7a1468"/>
  </linearGradient>
  <linearGradient id="sunfill" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffe45e"/>
    <stop offset="0.6" stop-color="#ff6ec7"/>
    <stop offset="1" stop-color="#c2188f"/>
  </linearGradient>
  <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1a0433"/>
    <stop offset="1" stop-color="#0d0221"/>
  </linearGradient>
  <radialGradient id="halo" cx="0.5" cy="1" r="0.6">
    <stop offset="0" stop-color="#ff2fb5" stop-opacity="0.45"/>
    <stop offset="1" stop-color="#ff2fb5" stop-opacity="0"/>
  </radialGradient>
  <mask id="stripes">
    <rect x="0" y="0" width="1600" height="900" fill="#fff"/>
    <rect x="0" y="420" width="1600" height="8" fill="#000"/>
    <rect x="0" y="445" width="1600" height="12" fill="#000"/>
    <rect x="0" y="472" width="1600" height="16" fill="#000"/>
    <rect x="0" y="500" width="1600" height="20" fill="#000"/>
  </mask>
  <clipPath id="above"><rect x="0" y="0" width="1600" height="520"/></clipPath>
</defs>
<!-- sky -->
<rect width="1600" height="520" fill="url(#sky)"/>
${stars}
<rect x="300" y="200" width="1000" height="320" fill="url(#halo)"/>
<!-- sun -->
<g class="sun" clip-path="url(#above)" mask="url(#stripes)">
  <circle cx="800" cy="520" r="230" fill="url(#sunfill)"/>
</g>
<!-- mountains -->
<path d="M0 520 L140 430 L260 480 L380 400 L520 520 Z" fill="#3b0a5c"/>
<path d="M1080 520 L1220 410 L1340 470 L1460 390 L1600 470 L1600 520 Z" fill="#3b0a5c"/>
<!-- ground -->
<rect y="520" width="1600" height="380" fill="url(#ground)"/>
<g stroke="#ff2fb5" stroke-width="2" opacity="0.7">${rays}</g>
<g>${gridLines}</g>
<line x1="0" x2="1600" y1="520" y2="520" stroke="#ff9be0" stroke-width="3"/>
${palm(130, false)}
${palm(1470, true)}
</svg>`

// Windows 95 / Vaporwave
const checker = (() => {
  const rows: string[] = []
  const horizon = 560
  const ys: number[] = [0, 18, 40, 66, 98, 138, 188, 250, 340]
  for (let r = 0; r < ys.length - 1; r++) {
    for (let c = -12; c < 12; c++) {
      if ((r + c) % 2 !== 0) continue
      const a = ys[r] ?? 0
      const b = ys[r + 1] ?? 0
      const y0 = horizon + a
      const y1 = horizon + b
      const k0 = 0.3 + (a / 340) * 2.2
      const k1 = 0.3 + (b / 340) * 2.2
      const w = 70
      const pts: Array<[number, number]> = [
        [800 + c * w * k0, y0], [800 + (c + 1) * w * k0, y0],
        [800 + (c + 1) * w * k1, y1], [800 + c * w * k1, y1],
      ]
      const p = pts.map(([x, y]) => `${x.toFixed(0)},${y.toFixed(0)}`).join(' ')
      rows.push(`<polygon points="${p}"/>`)
    }
  }
  return rows.join('')
})()

const column = (x: number) => `
<g transform="translate(${x} 0)">
  <rect x="-46" y="250" width="92" height="22" fill="#f4f0ff"/>
  <rect x="-34" y="272" width="68" height="268" fill="#ece6fb"/>
  <rect x="-22" y="272" width="6" height="268" fill="#d4cbef"/>
  <rect x="-3" y="272" width="6" height="268" fill="#d4cbef"/>
  <rect x="16" y="272" width="6" height="268" fill="#d4cbef"/>
  <rect x="-46" y="540" width="92" height="22" fill="#f4f0ff"/>
</g>`

export const VAPORWAVE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
<style>
.cloud { animation: drift 60s linear infinite; }
@keyframes drift { from { transform: translateX(-200px); } to { transform: translateX(1800px); } }
.c2 { animation-duration: 90s; animation-delay: -40s; }
.dolphin { animation: hop 9s ease-in-out infinite; transform-origin: 1180px 520px; }
@keyframes hop { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(-8deg); } }
</style>
<defs>
  <linearGradient id="vsky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ff9ed8"/>
    <stop offset="0.55" stop-color="#c9a7ff"/>
    <stop offset="1" stop-color="#8fd3ff"/>
  </linearGradient>
  <linearGradient id="vsun" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff6a8"/>
    <stop offset="1" stop-color="#ff7eb6"/>
  </linearGradient>
</defs>
<rect width="1600" height="560" fill="url(#vsky)"/>
<circle cx="1320" cy="190" r="110" fill="url(#vsun)"/>
<g class="cloud" fill="#ffffff" opacity="0.8">
  <ellipse cx="0" cy="140" rx="90" ry="26"/><ellipse cx="50" cy="122" rx="60" ry="26"/>
</g>
<g class="cloud c2" fill="#ffffff" opacity="0.7">
  <ellipse cx="0" cy="300" rx="120" ry="28"/><ellipse cx="-40" cy="282" rx="70" ry="26"/>
</g>
<!-- floor -->
<rect y="560" width="1600" height="340" fill="#ff9ed8"/>
<g fill="#2b1d52">${checker}</g>
${column(180)}
${column(1420)}
<!-- dolphin -->
<g class="dolphin" fill="#3fd0d4">
  <path d="M1100 540 C1140 480 1220 470 1270 500 L1300 480 L1292 510 C1300 520 1290 530 1270 528 C1230 520 1170 530 1130 556 L1150 580 L1110 566 Z"/>
</g>
<!-- window frame hint, top left -->
<g transform="translate(60 60)">
  <rect width="260" height="150" fill="#c0c0c0" stroke="#000" stroke-width="2"/>
  <rect x="4" y="4" width="252" height="24" fill="#000080"/>
  <rect x="222" y="8" width="28" height="16" fill="#c0c0c0"/>
  <rect x="12" y="40" width="236" height="100" fill="#ffffff"/>
  <rect x="24" y="56" width="140" height="8" fill="#000080" opacity="0.6"/>
  <rect x="24" y="76" width="190" height="8" fill="#808080"/>
  <rect x="24" y="96" width="160" height="8" fill="#808080"/>
</g>
<!-- taskbar -->
<rect y="864" width="1600" height="36" fill="#c0c0c0"/>
<rect y="864" width="1600" height="3" fill="#ffffff"/>
<rect x="6" y="870" width="110" height="26" fill="#c0c0c0" stroke="#404040" stroke-width="2"/>
<rect x="14" y="876" width="16" height="14" fill="#008080"/>
<rect x="1480" y="870" width="112" height="26" fill="#c0c0c0" stroke="#808080" stroke-width="2"/>
</svg>`

// Terminal vert
const textLines = [
  [60, 90, 520], [60, 125, 380], [60, 160, 610], [60, 195, 240],
  [60, 740, 460], [60, 775, 300], [60, 810, 560],
  [1100, 90, 420], [1240, 125, 280], [1180, 810, 360],
]
  .map(([x, y, w], i) => `<rect class="tl" style="animation-delay:-${i * 1.3}s" x="${x}" y="${y}" width="${w}" height="14"/>`)
  .join('')

export const TERMINAL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
<style>
.tl { fill: #39ff6a; opacity: 0.18; animation: fade 12s ease-in-out infinite; }
@keyframes fade { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.28; } }
.scan { animation: sweep 7s linear infinite; }
@keyframes sweep { from { transform: translateY(-200px); } to { transform: translateY(1100px); } }
.cur { fill: #39ff6a; animation: blink 2s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }
</style>
<defs>
  <radialGradient id="crt" cx="0.5" cy="0.5" r="0.75">
    <stop offset="0" stop-color="#0c2e14"/>
    <stop offset="0.7" stop-color="#03100a"/>
    <stop offset="1" stop-color="#000000"/>
  </radialGradient>
  <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#39ff6a" stop-opacity="0"/>
    <stop offset="1" stop-color="#39ff6a" stop-opacity="0.08"/>
  </linearGradient>
  <pattern id="lines" width="4" height="4" patternUnits="userSpaceOnUse">
    <rect width="4" height="2" fill="#000000" opacity="0.35"/>
  </pattern>
</defs>
<rect width="1600" height="900" fill="url(#crt)"/>
${textLines}
<rect class="cur" x="60" y="230" width="16" height="22"/>
<rect class="scan" x="0" y="0" width="1600" height="160" fill="url(#beam)"/>
<rect width="1600" height="900" fill="url(#lines)"/>
<rect x="6" y="6" width="1588" height="888" rx="40" fill="none" stroke="#000000" stroke-width="30" opacity="0.6"/>
</svg>`

// Abysses pixel : fond marine, meduse et cristal en pixel art sur les cotes
const CELL = 18

function pixels(map: string[], palette: Record<string, string>, ox: number, oy: number, cls = '') {
  const out: string[] = []
  map.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const color = palette[row[x] ?? '.']
      if (color === undefined) continue
      const twinkle = (x * 7 + y * 13) % 11 === 0 ? ' class="tw"' : ''
      out.push(`<rect${twinkle} x="${ox + x * CELL}" y="${oy + y * CELL}" width="${CELL - 2}" height="${CELL - 2}" fill="${color}"/>`)
    }
  })
  return `<g class="${cls}">${out.join('')}</g>`
}

const JELLY = [
  '....aaaaa....',
  '..aabbbbbaa..',
  '.abbbbbbbbba.',
  'abbbcbbbcbbba',
  'abbbbbbbbbbba',
  'bbbbbbbbbbbbb',
  'cbcbcbcbcbcbc',
  '.c.c..c..c.c.',
  '.c.b..c..b.c.',
  '..cb..b..bc..',
  '..c...b...c..',
  '..b...c...b..',
  '...c..b..c...',
  '......c......',
  '......b......',
  '.......c.....',
]

const JELLY_SMALL = [
  '..aaa..',
  '.abbba.',
  'abcbcba',
  'bbbbbbb',
  'c.c.c.c',
  'c.b.b.c',
  '.c...c.',
  '.b...b.',
]

const CRYSTAL = [
  '......t......',
  '.....tat.....',
  '....tapat....',
  '...tappppt...',
  '..tapppoppt..',
  '.tappoppppat.',
  'tappppppoppat',
  '.tappppppppt.',
  '..tappoppat..',
  '...tappppt...',
  '....tappt....',
  '.....tat.....',
  '......t......',
  '......c......',
  '......t......',
  '......c......',
]

const teal = { a: '#7ff0e0', b: '#2fbfb1', c: '#17766f' }
const violet = { t: '#3fd3c3', a: '#a594ff', p: '#5b43c9', o: '#f2a65a', c: '#17766f' }

let seed = 7
const rand = () => {
  seed = (seed * 9301 + 49297) % 233280
  return seed / 233280
}
const motes = Array.from({ length: 46 }, () => {
  const x = Math.round(rand() * 1600)
  const y = Math.round(rand() * 900)
  const s = rand() < 0.25 ? 4 : 3
  const d = (14 + rand() * 18).toFixed(1)
  const delay = (rand() * 30).toFixed(1)
  const color = rand() < 0.7 ? '#7ff0e0' : '#a594ff'
  return `<rect class="mote" style="animation-duration:${d}s;animation-delay:-${delay}s" x="${x}" y="${y}" width="${s}" height="${s}" fill="${color}"/>`
}).join('')

export const PIXEL_OCEAN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
<style>
.bob { animation: bob 7s ease-in-out infinite; }
.bob2 { animation: bob 9s ease-in-out infinite; animation-delay: -3s; }
.bob3 { animation: bob 6s ease-in-out infinite; animation-delay: -1s; }
@keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
.tw { animation: tw 5s ease-in-out infinite; }
@keyframes tw { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
.mote { opacity: 0.55; animation: rise 20s linear infinite; }
@keyframes rise { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 0.6; } 85% { opacity: 0.5; } 100% { transform: translateY(-260px); opacity: 0; } }
</style>
<defs>
  <linearGradient id="deep" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0e1640"/>
    <stop offset="0.6" stop-color="#0b1233"/>
    <stop offset="1" stop-color="#070b22"/>
  </linearGradient>
  <radialGradient id="glowL" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#2fbfb1" stop-opacity="0.18"/>
    <stop offset="1" stop-color="#2fbfb1" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="glowR" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#5b43c9" stop-opacity="0.25"/>
    <stop offset="1" stop-color="#5b43c9" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="1600" height="900" fill="url(#deep)"/>
${motes}
<!-- left side -->
<svg x="0" y="0" width="100%" height="100%" viewBox="0 0 1600 900" preserveAspectRatio="xMinYMid meet">
  <circle cx="180" cy="430" r="240" fill="url(#glowL)"/>
  <g class="bob">${pixels(JELLY, teal, 60, 300)}</g>
  <g class="bob3" opacity="0.6">${pixels(JELLY_SMALL, teal, 250, 140)}</g>
</svg>
<!-- right side -->
<svg x="0" y="0" width="100%" height="100%" viewBox="0 0 1600 900" preserveAspectRatio="xMaxYMid meet">
  <circle cx="1420" cy="460" r="260" fill="url(#glowR)"/>
  <g class="bob2">${pixels(CRYSTAL, violet, 1300, 330)}</g>
  <g class="bob3" opacity="0.5">${pixels(JELLY_SMALL, teal, 1440, 700)}</g>
</svg>
</svg>`
