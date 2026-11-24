// Six decors en pixel art, en SVG pur. viewBox 1600x900 ; les sujets restent sur les cotes.

type Palette = Record<string, string>

function px(map: string[], pal: Palette, ox: number, oy: number, cell: number, cls = ''): string {
  const out: string[] = []
  map.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const c = pal[row[x] ?? '.']
      if (c === undefined) continue
      out.push(`<rect x="${ox + x * cell}" y="${oy + y * cell}" width="${cell - 1}" height="${cell - 1}" fill="${c}"/>`)
    }
  })
  return `<g class="${cls}">${out.join('')}</g>`
}

function disc(cx: number, cy: number, r: number, cell: number, color: (dx: number, dy: number) => string | undefined): string {
  const out: string[] = []
  for (let y = -r; y <= r; y += cell) {
    for (let x = -r; x <= r; x += cell) {
      if (x * x + y * y > r * r) continue
      const c = color(x / r, y / r)
      if (c === undefined) continue
      out.push(`<rect x="${cx + x}" y="${cy + y}" width="${cell - 1}" height="${cell - 1}" fill="${c}"/>`)
    }
  }
  return out.join('')
}

function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function stars(seed: number, n: number, color: string, maxY = 900): string {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => {
    const x = Math.round(r() * 1600)
    const y = Math.round(r() * maxY)
    const s = r() < 0.2 ? 4 : 3
    return `<rect class="star" style="animation-delay:-${(i * 0.9) % 7}s" x="${x}" y="${y}" width="${s}" height="${s}" fill="${color}"/>`
  }).join('')
}

const svg = (body: string, style: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><style>
.star { animation: star 7s ease-in-out infinite; }
@keyframes star { 0%, 100% { opacity: 0.9; } 50% { opacity: 0.25; } }
${style}
</style>${body}</svg>`

// ---------- 1. Foret de nuit ----------
function pine(x: number, base: number, h: number, cell: number, dark: string, light: string): string {
  const out: string[] = []
  const rows = Math.floor(h / cell)
  for (let r = 0; r < rows; r++) {
    const tier = r % 4
    const half = Math.floor((r / rows) * (h / cell) * 0.32) + tier
    const y = base - h + r * cell
    out.push(`<rect x="${x - half * cell}" y="${y}" width="${(half * 2 + 1) * cell}" height="${cell}" fill="${dark}"/>`)
    if (tier < 2 && half > 0) out.push(`<rect x="${x - half * cell}" y="${y}" width="${half * cell}" height="${cell}" fill="${light}"/>`)
  }
  out.push(`<rect x="${x - cell}" y="${base}" width="${cell * 3}" height="${cell * 3}" fill="${dark}"/>`)
  return out.join('')
}

const forestTrees = (() => {
  const r = rng(11)
  const back: string[] = []
  const front: string[] = []
  for (let x = -40; x < 1660; x += 95) back.push(pine(x, 790, 220 + r() * 160, 12, '#0d2a2a', '#12383a'))
  for (let x = -20; x < 1660; x += 110) {
    if (x > 520 && x < 1080) front.push(pine(x, 880, 120 + r() * 60, 14, '#041210', '#082220'))
    else front.push(pine(x, 880, 260 + r() * 200, 14, '#041210', '#082220'))
  }
  return `<g>${back.join('')}</g><rect y="790" width="1600" height="110" fill="#0d2a2a"/><g>${front.join('')}</g>`
})()

const fireflies = (() => {
  const r = rng(5)
  return Array.from({ length: 22 }, (_, i) => {
    const side = i % 2 === 0 ? r() * 450 : 1150 + r() * 450
    const y = 560 + r() * 300
    return `<rect class="fly" style="animation-delay:-${(r() * 8).toFixed(1)}s;animation-duration:${(5 + r() * 4).toFixed(1)}s" x="${Math.round(side)}" y="${Math.round(y)}" width="6" height="6" fill="#ffe66b"/>`
  }).join('')
})()

export const FORET = svg(
  `<defs><linearGradient id="fsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050b1c"/><stop offset="0.7" stop-color="#0b1f2e"/><stop offset="1" stop-color="#103236"/></linearGradient></defs>
<rect width="1600" height="900" fill="url(#fsky)"/>
${stars(3, 70, '#dfe8ff', 500)}
<g class="aurora"><path d="M-100 260 C200 140 420 300 700 200 C980 100 1200 260 1700 150 L1700 230 C1200 340 980 180 700 280 C420 380 200 220 -100 340 Z" fill="#3cf2a0" opacity="0.16"/></g>
<g class="aurora a2"><path d="M-100 200 C300 90 500 240 820 150 C1100 70 1350 200 1700 110 L1700 160 C1350 250 1100 120 820 200 C500 290 300 140 -100 250 Z" fill="#46c8ff" opacity="0.12"/></g>
${disc(1380, 150, 60, 10, (dx, dy) => (dx + 0.35) * (dx + 0.35) + (dy + 0.2) * (dy + 0.2) < 0.18 ? '#c9d3e6' : '#f1f4ff')}
${forestTrees}
${fireflies}`,
  `.aurora { animation: aur 18s ease-in-out infinite; }
.a2 { animation-duration: 24s; animation-delay: -8s; }
@keyframes aur { 0%, 100% { transform: translateX(0); opacity: 1; } 50% { transform: translateX(-60px); opacity: 0.6; } }
.fly { animation: fly 6s ease-in-out infinite; }
@keyframes fly { 0%, 100% { opacity: 0.1; transform: translate(0, 0); } 50% { opacity: 1; transform: translate(14px, -20px); } }`,
)


// ---------- 1b. Foret de Noel ----------
function snowPine(x: number, base: number, h: number, cell: number, dark: string, snow: string, lights: boolean, seed: number): string {
  const out: string[] = []
  const r = rng(seed)
  const rows = Math.floor(h / cell)
  const colors = ['#ff4d5e', '#ffd54a', '#4fc3ff', '#7ee08a', '#ff8ad8']
  for (let row = 0; row < rows; row++) {
    const tier = row % 4
    const half = Math.floor((row / rows) * (h / cell) * 0.32) + tier
    const y = base - h + row * cell
    out.push(`<rect x="${x - half * cell}" y="${y}" width="${(half * 2 + 1) * cell}" height="${cell}" fill="${dark}"/>`)
    if (tier === 0) out.push(`<rect x="${x - half * cell}" y="${y}" width="${(half * 2 + 1) * cell}" height="${Math.ceil(cell / 2)}" fill="${snow}"/>`)
    if (tier === 3 && half > 0) {
      out.push(`<rect x="${x - half * cell}" y="${y}" width="${cell}" height="${cell}" fill="${snow}"/>`)
      out.push(`<rect x="${x + half * cell}" y="${y}" width="${cell}" height="${cell}" fill="${snow}"/>`)
    }
    if (lights && tier === 2 && half > 1) {
      for (let c = -half + 1; c < half; c += 2) {
        const col = colors[Math.floor(r() * colors.length)] ?? '#ffd54a'
        out.push(`<rect class="bulb" style="animation-delay:-${(r() * 4).toFixed(1)}s" x="${x + c * cell + 2}" y="${y + 2}" width="${cell - 4}" height="${cell - 4}" fill="${col}"/>`)
      }
    }
  }
  out.push(`<rect x="${x - cell}" y="${base}" width="${cell * 3}" height="${cell * 3}" fill="#2a1a14"/>`)
  if (lights) {
    const top = base - h - cell * 3
    out.push(`<g class="topstar">${px(['..y..', '.yyy.', 'yyyyy', '.yyy.', '.y.y.'], { y: '#ffe36b' }, x - cell * 2, top, cell)}</g>`)
  }
  return out.join('')
}

const xmasTrees = (() => {
  const r = rng(11)
  const back: string[] = []
  const front: string[] = []
  for (let x = -40; x < 1660; x += 150) back.push(snowPine(x, 790, 220 + r() * 160, 12, '#14303a', '#c9d8ea', false, 1))
  let i = 0
  for (let x = -20; x < 1660; x += 110) {
    const lit = x === 200 || x === 1300 || x === 1520
    if (x > 520 && x < 1080) front.push(snowPine(x, 880, 120 + r() * 60, 14, '#062018', '#eef4ff', false, 2))
    else front.push(snowPine(x, 880, lit ? 380 : 260 + r() * 200, 14, '#062018', '#eef4ff', lit, 100 + i))
    i++
  }
  return `<g>${back.join('')}</g><rect y="790" width="1600" height="110" fill="#dfe8f5"/><rect y="790" width="1600" height="6" fill="#ffffff"/><g>${front.join('')}</g>`
})()

const snowfall = (() => {
  const r = rng(23)
  return Array.from({ length: 80 }, () => {
    const x = Math.round(r() * 1700) - 50
    const s = r() < 0.3 ? 6 : 4
    const d = (10 + r() * 10).toFixed(1)
    return `<rect class="flake" style="animation-duration:${d}s;animation-delay:-${(r() * 20).toFixed(1)}s" x="${x}" y="-20" width="${s}" height="${s}" fill="#ffffff"/>`
  }).join('')
})()

export const FORET_NOEL = svg(
  `<defs><linearGradient id="nsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#060c22"/><stop offset="0.7" stop-color="#14224a"/><stop offset="1" stop-color="#2a3a66"/></linearGradient></defs>
<rect width="1600" height="900" fill="url(#nsky)"/>
${stars(3, 60, '#dfe8ff', 450)}
<g class="aurora"><path d="M-100 260 C200 140 420 300 700 200 C980 100 1200 260 1700 150 L1700 230 C1200 340 980 180 700 280 C420 380 200 220 -100 340 Z" fill="#3cf2a0" opacity="0.10"/></g>
${disc(1380, 150, 60, 10, (dx, dy) => (dx + 0.35) * (dx + 0.35) + (dy + 0.2) * (dy + 0.2) < 0.18 ? '#c9d3e6' : '#f1f4ff')}
${xmasTrees}
<g opacity="0.85">${snowfall}</g>`,
  `.aurora { animation: aur 20s ease-in-out infinite; }
@keyframes aur { 0%, 100% { transform: translateX(0); opacity: 1; } 50% { transform: translateX(-60px); opacity: 0.6; } }
.flake { animation: snow 14s linear infinite; }
@keyframes snow { 0% { transform: translate(0, 0); } 50% { transform: translate(30px, 470px); } 100% { transform: translate(-10px, 940px); } }
.bulb { animation: bulb 4s ease-in-out infinite; }
@keyframes bulb { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
.topstar { animation: bulb 5s ease-in-out infinite; }`,
)

// ---------- 2. Station spatiale ----------
const ASTRO = [
  '...wwww...',
  '..wwwwww..',
  '.wwbbbbww.',
  '.wbcbbbbw.',
  '.wbbbbbbw.',
  '..wwwwww..',
  '.gwwwwwwg.',
  'gwwwrwwwwg',
  'gwwwwwwwwg',
  '.wwwwwwww.',
  '..ww..ww..',
  '..ww..ww..',
  '.www..www.',
]

export const ESPACE = svg(
  `<rect width="1600" height="900" fill="#05061a"/>
${stars(21, 120, '#ffffff')}
${stars(8, 30, '#9fb4ff')}
<g>${disc(170, 640, 190, 14, (dx, dy) => {
    const band = Math.floor((dy + 1) * 5) % 3
    const shade = dx + dy > 0.6 ? 2 : 0
    return ['#e0874e', '#c86a3a', '#f2a65a'][(band + shade) % 3]
  })}</g>
<g opacity="0.85">${Array.from({ length: 30 }, (_, i) => {
    const x = -80 + i * 17
    const y = 690 - i * 5
    return `<rect x="${x}" y="${y}" width="15" height="7" fill="#f6d7a8"/>`
  }).join('')}</g>
<g>${disc(1430, 170, 70, 10, (dx, dy) => (dx > 0.35 && dy > -0.2 ? '#3b3f8f' : dx * dx + dy * dy < 0.2 ? '#8aa0ff' : '#6474e0'))}</g>
<g class="drift">${px(ASTRO, { w: '#eef0f7', b: '#2a3b8f', c: '#8fd3ff', g: '#9aa0b5', r: '#e0574e' }, 1330, 520, 14)}</g>
<line class="shoot" x1="0" y1="0" x2="120" y2="40" stroke="#ffffff" stroke-width="4"/>`,
  `.drift { animation: drift 14s ease-in-out infinite; transform-origin: 1400px 610px; }
@keyframes drift { 0%, 100% { transform: translate(0, 0) rotate(-8deg); } 50% { transform: translate(-30px, -40px) rotate(10deg); } }
.shoot { opacity: 0; animation: shoot 11s linear infinite; }
@keyframes shoot { 0%, 88% { opacity: 0; transform: translate(500px, 80px); } 90% { opacity: 1; } 100% { opacity: 0; transform: translate(1100px, 280px); } }`,
)

// ---------- 3. Ville sous la pluie ----------
const city = (() => {
  const r = rng(42)
  const out: string[] = []
  let x = -20
  while (x < 1640) {
    const w = 90 + Math.round(r() * 90)
    const center = x + w / 2 > 560 && x + w / 2 < 1040
    const h = center ? 120 + r() * 80 : 280 + r() * 360
    const top = 900 - h
    const col = r() < 0.5 ? '#141634' : '#1b1c42'
    out.push(`<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${col}"/>`)
    for (let wy = top + 20; wy < 880; wy += 28) {
      for (let wx = x + 12; wx < x + w - 16; wx += 22) {
        const v = r()
        if (v < 0.55) continue
        const c = v < 0.85 ? '#ffd27a' : v < 0.93 ? '#ff7ad9' : '#7ae8ff'
        const blink = r() < 0.06 ? ' class="win"' : ''
        out.push(`<rect${blink} style="animation-delay:-${(r() * 10).toFixed(1)}s" x="${wx}" y="${wy}" width="10" height="14" fill="${c}" opacity="0.85"/>`)
      }
    }
    x += w + 6
  }
  return out.join('')
})()

const rain = (() => {
  const r = rng(9)
  return Array.from({ length: 90 }, () => {
    const x = Math.round(r() * 1700)
    const y = Math.round(r() * 900)
    return `<rect class="drop" style="animation-delay:-${(r() * 2).toFixed(2)}s" x="${x}" y="${y - 900}" width="2" height="${14 + Math.round(r() * 12)}" fill="#9fb8ff"/>`
  }).join('')
})()

export const VILLE = svg(
  `<defs><linearGradient id="vsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0c1f"/><stop offset="1" stop-color="#2a1d4d"/></linearGradient></defs>
<rect width="1600" height="900" fill="url(#vsk)"/>
${city}
<g class="neon"><rect x="90" y="330" width="150" height="40" fill="none" stroke="#ff4fd8" stroke-width="6"/><rect x="110" y="344" width="20" height="12" fill="#ff4fd8"/><rect x="140" y="344" width="20" height="12" fill="#ff4fd8"/><rect x="170" y="344" width="50" height="12" fill="#ff4fd8"/></g>
<g class="neon n2"><rect x="1380" y="260" width="44" height="150" fill="none" stroke="#4fe8ff" stroke-width="6"/><rect x="1394" y="280" width="16" height="16" fill="#4fe8ff"/><rect x="1394" y="310" width="16" height="16" fill="#4fe8ff"/><rect x="1394" y="340" width="16" height="50" fill="#4fe8ff"/></g>
<g opacity="0.35">${rain}</g>
<rect y="884" width="1600" height="16" fill="#0a0a1c"/>`,
  `.drop { animation: fall 1.4s linear infinite; }
@keyframes fall { from { transform: translate(0, 0); } to { transform: translate(-60px, 1800px); } }
.win { animation: win 9s steps(1) infinite; }
@keyframes win { 0%, 60% { opacity: 0.85; } 61%, 100% { opacity: 0.1; } }
.neon { animation: neon 6s ease-in-out infinite; }
.n2 { animation-delay: -3s; }
@keyframes neon { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }`,
)

// ---------- 4. Donjon ----------
const bricks = (() => {
  const r = rng(77)
  const out: string[] = []
  for (let y = 0; y < 900; y += 40) {
    const off = (y / 40) % 2 === 0 ? 0 : -40
    for (let x = off; x < 1600; x += 80) {
      const v = r()
      const c = v < 0.33 ? '#221d30' : v < 0.66 ? '#272236' : '#1e1a2b'
      out.push(`<rect x="${x}" y="${y}" width="76" height="36" fill="${c}"/>`)
    }
  }
  return out.join('')
})()

const TORCH = ['..y..', '.yoy.', 'yorry', '.orr.', '..r..', 'bbbbb', '.bbb.', '.bbb.', '.bbb.', '..b..']

const DRAGON = [
  '..............gg....',
  '.............gggg...',
  '...........ggglggd..',
  '..gg......gggggggg..',
  '.gggg...ggggggk.....',
  'ggllggggggllgggg....',
  'gggllllllllllggggg..',
  '.ggggggggggggggggggg',
  '..gg..gg...gg..gg..g',
]

export const DONJON = svg(
  `<defs><radialGradient id="tg"><stop offset="0" stop-color="#ff9a3c" stop-opacity="0.35"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient></defs>
<rect width="1600" height="900" fill="#141120"/>
${bricks}
<rect width="1600" height="900" fill="#0a0812" opacity="0.35"/>
<circle class="glow" cx="160" cy="300" r="240" fill="url(#tg)"/>
<circle class="glow g2" cx="1440" cy="300" r="240" fill="url(#tg)"/>
<g class="flame">${px(TORCH.slice(0, 5), { y: '#ffe36b', o: '#ff9a3c', r: '#e04a2a' }, 130, 250, 12)}</g>
${px(TORCH.slice(5), { b: '#5a4a3a' }, 130, 310, 12)}
<g class="flame f2">${px(TORCH.slice(0, 5), { y: '#ffe36b', o: '#ff9a3c', r: '#e04a2a' }, 1410, 250, 12)}</g>
${px(TORCH.slice(5), { b: '#5a4a3a' }, 1410, 310, 12)}
<rect y="820" width="1600" height="80" fill="#0e0b16"/>
<g>${px(DRAGON, { g: '#3d9a5c', l: '#6fd08a', d: '#1e5c35', k: '#0e0b16' }, 1160, 712, 14)}</g>
<g class="zz"><rect x="1400" y="690" width="16" height="4" fill="#cfc4ff"/><rect x="1412" y="694" width="4" height="4" fill="#cfc4ff"/><rect x="1408" y="698" width="4" height="4" fill="#cfc4ff"/><rect x="1404" y="702" width="4" height="4" fill="#cfc4ff"/><rect x="1400" y="706" width="16" height="4" fill="#cfc4ff"/></g>
<g>${px(['.cc.', 'cggc', 'cggc', '.cc.'], { c: '#b08a3a', g: '#ffd54a' }, 300, 790, 8)}${px(['.cc.', 'cggc', 'cggc', '.cc.'], { c: '#b08a3a', g: '#ffd54a' }, 340, 800, 8)}</g>`,
  `.flame { animation: flame 1.6s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
.f2 { animation-delay: -0.8s; }
@keyframes flame { 0%, 100% { transform: scale(1, 1); } 50% { transform: scale(0.9, 1.12); } }
.glow { animation: glow 3s ease-in-out infinite; }
.g2 { animation-delay: -1.5s; }
@keyframes glow { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
.zz { animation: zz 4s ease-in-out infinite; }
@keyframes zz { 0% { transform: translate(0, 0); opacity: 0; } 30% { opacity: 1; } 100% { transform: translate(30px, -80px); opacity: 0; } }`,
)

// ---------- 5. Jardin japonais ----------
const blossoms = (() => {
  const r = rng(31)
  const out: string[] = []
  const branch = [[0, 120], [80, 150], [160, 170], [240, 160], [320, 190], [400, 180], [460, 210]]
  branch.forEach(([bx = 0, by = 0]) => {
    out.push(`<rect x="${bx}" y="${by}" width="84" height="12" fill="#3a2230"/>`)
    for (let i = 0; i < 9; i++) {
      const x = bx + Math.round((r() - 0.3) * 90)
      const y = by + Math.round((r() - 0.6) * 80)
      const c = r() < 0.5 ? '#ffb7d0' : r() < 0.5 ? '#ff8fb8' : '#ffe0ec'
      out.push(`<rect x="${x}" y="${y}" width="14" height="14" fill="${c}"/>`)
    }
  })
  return out.join('')
})()

const petals = (() => {
  const r = rng(13)
  return Array.from({ length: 28 }, () => {
    const x = Math.round(r() * 1300)
    return `<rect class="petal" style="animation-delay:-${(r() * 16).toFixed(1)}s;animation-duration:${(12 + r() * 8).toFixed(1)}s" x="${x}" y="-20" width="7" height="7" fill="#ffc4da"/>`
  }).join('')
})()

const lantern = (x: number, y: number, cls: string) =>
  `<g>${px(['..b..', 'bbbbb', '.lll.', 'lyyyl', 'lyyyl', 'lyyyl', '.lll.', 'bbbbb', '.b.b.'], { b: '#2a1a22', l: '#e0574e', y: '#ffcf7a' }, x, y, 12)}<circle class="${cls}" cx="${x + 30}" cy="${y + 54}" r="70" fill="#ffb05a" opacity="0.14"/></g>`

export const JARDIN = svg(
  `<defs><linearGradient id="jsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#160e26"/><stop offset="0.7" stop-color="#2c1838"/><stop offset="1" stop-color="#3a1e3c"/></linearGradient></defs>
<rect width="1600" height="900" fill="url(#jsk)"/>
${stars(44, 40, '#ffe8f2', 500)}
${disc(1380, 170, 80, 10, () => '#ffe9d6')}
${blossoms}
<rect y="800" width="1600" height="100" fill="#1d1028"/>
<g>${lantern(90, 560, 'lg')}${lantern(220, 610, 'lg l2')}</g>
<g transform="translate(1150 740)"><path d="M0 70 Q200 -30 400 70" fill="none" stroke="#c8323a" stroke-width="16"/>${Array.from({ length: 6 }, (_, i) => `<rect x="${40 + i * 64}" y="${i === 0 || i === 5 ? 34 : 4 + Math.abs(2.5 - i) * 10}" width="10" height="70" fill="#a8262e"/>`).join('')}<rect x="-10" y="64" width="420" height="10" fill="#c8323a"/></g>
<rect y="860" width="1600" height="40" fill="#2a2450" opacity="0.8"/>
${petals}`,
  `.petal { animation: petal 15s linear infinite; }
@keyframes petal { 0% { transform: translate(0, 0) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translate(320px, 940px) rotate(200deg); opacity: 0.4; } }
.lg { animation: lg 5s ease-in-out infinite; }
.l2 { animation-delay: -2s; }
@keyframes lg { 0%, 100% { opacity: 0.14; } 50% { opacity: 0.22; } }`,
)

// ---------- 6. Lagon ----------
const FISH = ['..oo....', '.oooo.o.', 'okooooo.', 'oooooooo', '.oooo.o.', '..oo....']
const FISH2 = ['...bb...', '.bbbbb.b', 'bkbbbbbb', '.bbbbb.b', '...bb...']

const seaweed = (x: number, h: number, cls: string) =>
  `<g class="${cls}" style="transform-origin:${x}px 900px">${Array.from({ length: Math.floor(h / 16) }, (_, i) => {
    const dx = Math.round(Math.sin(i / 2) * 10)
    return `<rect x="${x + dx}" y="${900 - (i + 1) * 16}" width="16" height="15" fill="${i % 3 === 0 ? '#2f9e6a' : '#237a52'}"/>`
  }).join('')}</g>`

const bubbles = (() => {
  const r = rng(61)
  return Array.from({ length: 26 }, () => {
    const x = r() < 0.5 ? r() * 420 : 1180 + r() * 420
    const s = r() < 0.3 ? 10 : 6
    return `<rect class="bub" style="animation-delay:-${(r() * 12).toFixed(1)}s;animation-duration:${(9 + r() * 6).toFixed(1)}s" x="${Math.round(x)}" y="900" width="${s}" height="${s}" fill="none" stroke="#bff4ff" stroke-width="2"/>`
  }).join('')
})()

export const LAGON = svg(
  `<defs><linearGradient id="lsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b4b5e"/><stop offset="0.6" stop-color="#062c3b"/><stop offset="1" stop-color="#03161f"/></linearGradient></defs>
<rect width="1600" height="900" fill="url(#lsk)"/>
<g class="rays"><polygon points="200,0 300,0 120,900 0,900" fill="#bff4ff" opacity="0.05"/><polygon points="700,0 760,0 640,900 520,900" fill="#bff4ff" opacity="0.04"/><polygon points="1250,0 1340,0 1460,900 1300,900" fill="#bff4ff" opacity="0.05"/></g>
<rect y="860" width="1600" height="40" fill="#c9a86a" opacity="0.35"/>
${seaweed(60, 380, 'sw')}${seaweed(110, 260, 'sw s2')}${seaweed(170, 320, 'sw')}
${seaweed(1420, 340, 'sw s2')}${seaweed(1480, 420, 'sw')}${seaweed(1540, 260, 'sw s2')}
<g class="fish">${px(FISH, { o: '#ff9a3c', k: '#1a1a1a' }, 0, 220, 10)}</g>
<g class="fish f2">${px(FISH2, { b: '#ffd54a', k: '#1a1a1a' }, 0, 640, 10)}</g>
<g class="fish f3">${px(FISH, { o: '#ff6fa5', k: '#1a1a1a' }, 0, 420, 8)}</g>
${bubbles}`,
  `.fish { animation: swim 34s linear infinite; }
.f2 { animation-duration: 44s; animation-delay: -20s; }
.f3 { animation-duration: 28s; animation-delay: -9s; }
@keyframes swim { from { transform: translateX(-120px); } to { transform: translateX(1720px); } }
.sw { animation: sway 6s ease-in-out infinite; }
.s2 { animation-delay: -3s; }
@keyframes sway { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
.bub { animation: bub 12s linear infinite; }
@keyframes bub { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 0.8; } 100% { transform: translateY(-900px); opacity: 0; } }
.rays { animation: rays 12s ease-in-out infinite; }
@keyframes rays { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`,
)
