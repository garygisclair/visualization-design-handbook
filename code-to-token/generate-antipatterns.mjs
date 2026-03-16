// generate-antipatterns.mjs — Generates AntiPatterns.json with 8 Do/Don't SVG pairs
// Extracted from lib-antipatterns.html
//
// Run: node code-to-token/generate-antipatterns.mjs
// Output: code-to-token/components/AntiPatterns.json

import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Dont SVGs ────────────────────────────────────────────

// 1. Pie Chart
const dontPieChart = `<svg xmlns="http://www.w3.org/2000/svg" width="210" height="120" viewBox="0 0 210 120">
  <path d="M80,10 A50,50 0 0,1 95.5,107.6 L80,60 Z" fill="#e74c3c"/>
  <path d="M95.5,107.6 A50,50 0 0,1 39.6,89.4 L80,60 Z" fill="#3498db"/>
  <path d="M39.6,89.4 A50,50 0 0,1 32.5,44.6 L80,60 Z" fill="#2ecc71"/>
  <path d="M32.5,44.6 A50,50 0 0,1 56.1,16.1 L80,60 Z" fill="#f39c12"/>
  <path d="M56.1,16.1 A50,50 0 0,1 80,10 L80,60 Z" fill="#9b59b6"/>
  <rect x="145" y="25" width="8" height="8" fill="#e74c3c"/>
  <text x="155" y="33" font-size="8" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">ChatGPT</text>
  <rect x="145" y="38" width="8" height="8" fill="#3498db"/>
  <text x="155" y="46" font-size="8" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Gemini</text>
  <rect x="145" y="51" width="8" height="8" fill="#2ecc71"/>
  <text x="155" y="59" font-size="8" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">DeepSeek</text>
  <rect x="145" y="64" width="8" height="8" fill="#f39c12"/>
  <text x="155" y="72" font-size="8" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Claude</text>
  <rect x="145" y="77" width="8" height="8" fill="#9b59b6"/>
  <text x="155" y="85" font-size="8" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Other</text>
</svg>`

// 2. Non-Zero Baseline
const dontNonZeroBaseline = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <line x1="20" y1="10" x2="20" y2="100" stroke="#9a948e" stroke-width="1"/>
  <text x="18" y="14" text-anchor="end" font-size="7" fill="#c0392b" font-family="'IBM Plex Mono',monospace">80</text>
  <text x="18" y="100" text-anchor="end" font-size="7" fill="#c0392b" font-family="'IBM Plex Mono',monospace">50</text>
  <rect x="30" y="15" width="28" height="85" fill="#c0392b" opacity="0.5"/>
  <rect x="65" y="40" width="28" height="60" fill="#c0392b" opacity="0.5"/>
  <rect x="100" y="55" width="28" height="45" fill="#c0392b" opacity="0.5"/>
  <rect x="135" y="78" width="28" height="22" fill="#c0392b" opacity="0.5"/>
  <text x="45" y="107" text-anchor="middle" font-size="7" fill="#c0392b" font-family="'IBM Plex Sans',sans-serif">A</text>
  <text x="80" y="107" text-anchor="middle" font-size="7" fill="#c0392b" font-family="'IBM Plex Sans',sans-serif">B</text>
  <text x="115" y="107" text-anchor="middle" font-size="7" fill="#c0392b" font-family="'IBM Plex Sans',sans-serif">C</text>
  <text x="150" y="107" text-anchor="middle" font-size="7" fill="#c0392b" font-family="'IBM Plex Sans',sans-serif">D</text>
  <text x="100" y="10" text-anchor="middle" font-size="7" fill="#c0392b" font-family="'IBM Plex Sans',sans-serif">Axis starts at 50 > Lie Factor > 1</text>
</svg>`

// 3. 3D Bars
const dont3dBars = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <polygon points="30,95 60,95 68,80 38,80" fill="#c0392b" opacity="0.4"/>
  <rect x="30" y="30" width="30" height="65" fill="#c0392b" opacity="0.6"/>
  <polygon points="60,30 68,15 68,80 60,95" fill="#c0392b" opacity="0.3"/>
  <polygon points="80,95 110,95 118,80 88,80" fill="#3498db" opacity="0.4"/>
  <rect x="80" y="50" width="30" height="45" fill="#3498db" opacity="0.6"/>
  <polygon points="110,50 118,35 118,80 110,95" fill="#3498db" opacity="0.3"/>
  <polygon points="130,95 160,95 168,80 138,80" fill="#2ecc71" opacity="0.4"/>
  <rect x="130" y="65" width="30" height="30" fill="#2ecc71" opacity="0.6"/>
  <polygon points="160,65 168,50 168,80 160,95" fill="#2ecc71" opacity="0.3"/>
  <text x="100" y="10" text-anchor="middle" font-size="7" fill="#c0392b" font-family="'IBM Plex Sans',sans-serif">Occlusion + distortion + non-data ink</text>
</svg>`

// 4. Color Legend
const dontColorLegend = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <polyline points="10,80 50,50 90,60 130,30 170,40" fill="none" stroke="#e74c3c" stroke-width="2"/>
  <polyline points="10,70 50,65 90,40 130,55 170,20" fill="none" stroke="#3498db" stroke-width="2"/>
  <circle cx="130" cy="30" r="3" fill="#e74c3c"/>
  <circle cx="170" cy="40" r="3" fill="#e74c3c"/>
  <circle cx="130" cy="55" r="3" fill="#3498db"/>
  <circle cx="170" cy="20" r="3" fill="#3498db"/>
  <rect x="140" y="65" width="55" height="40" fill="white" stroke="#d8d4ce"/>
  <rect x="144" y="71" width="8" height="4" fill="#e74c3c"/>
  <text x="155" y="75" font-size="7" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">ChatGPT</text>
  <rect x="144" y="80" width="8" height="4" fill="#3498db"/>
  <text x="155" y="84" font-size="7" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Claude</text>
  <text x="98" y="106" text-anchor="middle" font-size="7" fill="#c0392b" font-family="'IBM Plex Sans',sans-serif">legend = eye travel on every read</text>
</svg>`

// 5. Rainbow Palette
const dontRainbowPalette = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <line x1="20" y1="10" x2="20" y2="95" stroke="#9a948e" stroke-width="1"/>
  <rect x="25" y="15" width="100" height="16" fill="#e74c3c"/>
  <rect x="25" y="36" width="70" height="16" fill="#e67e22"/>
  <rect x="25" y="57" width="50" height="16" fill="#2ecc71"/>
  <rect x="25" y="78" width="35" height="16" fill="#3498db"/>
  <text x="100" y="108" text-anchor="middle" font-size="7" fill="#c0392b" font-family="'IBM Plex Sans',sans-serif">rainbow = implied ordering + visual vibration</text>
</svg>`

// 6. Heavy Gridlines
const dontHeavyGridlines = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <line x1="20" y1="20" x2="190" y2="20" stroke="#999" stroke-width="1"/>
  <line x1="20" y1="40" x2="190" y2="40" stroke="#999" stroke-width="1"/>
  <line x1="20" y1="60" x2="190" y2="60" stroke="#999" stroke-width="1"/>
  <line x1="20" y1="80" x2="190" y2="80" stroke="#999" stroke-width="1"/>
  <line x1="20" y1="100" x2="190" y2="100" stroke="#999" stroke-width="1"/>
  <line x1="20" y1="10" x2="20" y2="100" stroke="#999" stroke-width="1"/>
  <polyline points="20,80 65,55 110,65 155,30 190,40" fill="none" stroke="#e74c3c" stroke-width="2"/>
  <text x="100" y="10" text-anchor="middle" font-size="7" fill="#c0392b" font-family="'IBM Plex Sans',sans-serif">gridlines compete with data signal</text>
</svg>`

// 7. Dots Every Point
const dontDotsEveryPoint = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <polyline points="10,80 50,55 90,65 130,35 170,45" fill="none" stroke="#e74c3c" stroke-width="2"/>
  <circle cx="10" cy="80" r="5" fill="#e74c3c"/>
  <circle cx="50" cy="55" r="5" fill="#e74c3c"/>
  <circle cx="90" cy="65" r="5" fill="#e74c3c"/>
  <circle cx="130" cy="35" r="5" fill="#e74c3c"/>
  <circle cx="170" cy="45" r="5" fill="#e74c3c"/>
  <text x="100" y="105" text-anchor="middle" font-size="7" fill="#c0392b" font-family="'IBM Plex Sans',sans-serif">dots add noise · line already encodes position</text>
</svg>`

// 8. Gauge
const dontGauge = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <path d="M30,90 A70,70 0 0,1 170,90" fill="none" stroke="#e8e5e0" stroke-width="20"/>
  <path d="M30,90 A70,70 0 0,1 130,30" fill="none" stroke="#c0392b" stroke-width="20"/>
  <text x="100" y="85" text-anchor="middle" font-size="16" fill="#1a1917" font-family="'IBM Plex Mono',monospace" font-weight="700">74%</text>
  <text x="100" y="105" text-anchor="middle" font-size="8" fill="#c0392b" font-family="'IBM Plex Sans',sans-serif">wastes space · angle imprecise · no target</text>
</svg>`

// ── Do SVGs ──────────────────────────────────────────────

// 1. Stacked Bar
const doStackedBar = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <text x="5" y="30" font-size="9" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">ChatGPT</text>
  <rect x="60" y="18" width="130" height="14" fill="#4a4845"/>
  <text x="192" y="30" text-anchor="end" font-size="8" fill="#fff" font-family="'IBM Plex Mono',monospace">69%</text>
  <text x="5" y="50" font-size="9" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Gemini</text>
  <rect x="60" y="38" width="16" height="14" fill="#4a4845"/>
  <text x="78" y="50" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">8.5%</text>
  <text x="5" y="70" font-size="9" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">DeepSeek</text>
  <rect x="60" y="58" width="8" height="14" fill="#4a4845"/>
  <text x="70" y="70" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">4%</text>
  <text x="5" y="90" font-size="9" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Claude</text>
  <rect x="60" y="78" width="4" height="14" fill="#b0aaa4"/>
  <text x="66" y="90" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">2%</text>
</svg>`

// 2. Zero Baseline
const doZeroBaseline = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <line x1="20" y1="10" x2="20" y2="100" stroke="#9a948e" stroke-width="1"/>
  <text x="18" y="100" text-anchor="end" font-size="7" fill="#5a5650" font-family="'IBM Plex Mono',monospace">0</text>
  <rect x="30" y="30" width="28" height="70" fill="#4a4845"/>
  <rect x="65" y="50" width="28" height="50" fill="#4a4845"/>
  <rect x="100" y="65" width="28" height="35" fill="#4a4845"/>
  <rect x="135" y="80" width="28" height="20" fill="#4a4845"/>
  <text x="45" y="107" text-anchor="middle" font-size="7" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">A</text>
  <text x="80" y="107" text-anchor="middle" font-size="7" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">B</text>
  <text x="115" y="107" text-anchor="middle" font-size="7" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">C</text>
  <text x="150" y="107" text-anchor="middle" font-size="7" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">D</text>
</svg>`

// 3. Flat 2D Bars
const doFlat2dBars = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <line x1="20" y1="10" x2="20" y2="100" stroke="#9a948e" stroke-width="1"/>
  <rect x="25" y="15" width="120" height="18" fill="#4a4845"/>
  <rect x="25" y="40" width="80" height="18" fill="#4a4845"/>
  <rect x="25" y="65" width="50" height="18" fill="#4a4845"/>
  <text x="148" y="27" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">120</text>
  <text x="108" y="52" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">80</text>
  <text x="78" y="77" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">50</text>
</svg>`

// 4. Direct Labels
const doDirectLabels = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <polyline points="10,80 50,50 90,60 130,30 170,35" fill="none" stroke="#4a4845" stroke-width="2"/>
  <polyline points="10,70 50,65 90,40 130,55 170,20" fill="none" stroke="#4a4845" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="173" y="38" font-size="9" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">ChatGPT</text>
  <text x="173" y="23" font-size="9" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">Claude</text>
</svg>`

// 5. Single Hue
const doSingleHue = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <line x1="20" y1="10" x2="20" y2="95" stroke="#9a948e" stroke-width="1"/>
  <rect x="25" y="15" width="100" height="16" fill="#4a4845"/>
  <rect x="25" y="36" width="70" height="16" fill="#4a4845" opacity="0.75"/>
  <rect x="25" y="57" width="50" height="16" fill="#4a4845" opacity="0.5"/>
  <rect x="25" y="78" width="35" height="16" fill="#4a4845" opacity="0.3"/>
  <text x="100" y="108" text-anchor="middle" font-size="7" fill="#2a7a4a" font-family="'IBM Plex Sans',sans-serif">single hue · saturation encodes magnitude</text>
</svg>`

// 6. Range Frame
const doRangeFrame = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <line x1="20" y1="30" x2="20" y2="80" stroke="#9a948e" stroke-width="1"/>
  <line x1="17" y1="30" x2="20" y2="30" stroke="#9a948e" stroke-width="1"/>
  <line x1="17" y1="80" x2="20" y2="80" stroke="#9a948e" stroke-width="1"/>
  <text x="15" y="34" text-anchor="end" font-size="7" fill="#9a948e" font-family="'IBM Plex Mono',monospace">high</text>
  <text x="15" y="84" text-anchor="end" font-size="7" fill="#9a948e" font-family="'IBM Plex Mono',monospace">low</text>
  <polyline points="20,80 65,55 110,65 155,30 190,40" fill="none" stroke="#4a4845" stroke-width="2"/>
  <text x="190" y="43" font-size="8" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">Claude</text>
</svg>`

// 7. Line End Label
const doLineEndLabel = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <polyline points="10,80 50,55 90,65 130,35 170,45" fill="none" stroke="#4a4845" stroke-width="2"/>
  <text x="173" y="48" font-size="9" fill="#4a4845" font-family="'IBM Plex Mono',monospace">45M</text>
</svg>`

// 8. Bullet Graph
const doBulletGraph = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="110" viewBox="0 0 200 110">
  <rect x="20" y="35" width="60" height="30" fill="#e8e5e0"/>
  <rect x="80" y="35" width="60" height="30" fill="#d8d4ce"/>
  <rect x="140" y="35" width="40" height="30" fill="#c8c4be"/>
  <rect x="20" y="40" width="110" height="20" fill="#4a4845"/>
  <line x1="120" y1="33" x2="120" y2="67" stroke="#1a1917" stroke-width="3"/>
  <text x="5" y="52" text-anchor="end" font-size="9" fill="#5a5650" font-family="'IBM Plex Mono',monospace">Spend</text>
  <text x="122" y="32" font-size="8" fill="#9a948e" font-family="'IBM Plex Mono',monospace">Target</text>
  <text x="131" y="52" font-size="8" fill="#c0392b" font-family="'IBM Plex Mono',monospace">$74K (+23%)</text>
  <text x="100" y="90" text-anchor="middle" font-size="7" fill="#2a7a4a" font-family="'IBM Plex Sans',sans-serif">actual · target · qualitative bands — 1 bar</text>
</svg>`

// ── Build output ─────────────────────────────────────────

const dontPatterns = ['pie-chart', 'non-zero-baseline', '3d-bars', 'color-legend', 'rainbow-palette', 'heavy-gridlines', 'dots-every-point', 'gauge']
const doPatterns = ['stacked-bar', 'zero-baseline', 'flat-2d-bars', 'direct-labels', 'single-hue', 'range-frame', 'line-end-label', 'bullet-graph']

const dontSvgs = [dontPieChart, dontNonZeroBaseline, dont3dBars, dontColorLegend, dontRainbowPalette, dontHeavyGridlines, dontDotsEveryPoint, dontGauge]
const doSvgs = [doStackedBar, doZeroBaseline, doFlat2dBars, doDirectLabels, doSingleHue, doRangeFrame, doLineEndLabel, doBulletGraph]

const dontDims = [
  { width: 210, height: 120 },
  { width: 200, height: 110 },
  { width: 200, height: 110 },
  { width: 200, height: 110 },
  { width: 200, height: 110 },
  { width: 200, height: 110 },
  { width: 200, height: 110 },
  { width: 200, height: 110 },
]

const doDims = Array(8).fill({ width: 200, height: 110 })

const dontVariants = dontPatterns.map((p, i) => ({
  name: `pattern=${p}`,
  width: dontDims[i].width,
  height: dontDims[i].height,
  svg: dontSvgs[i],
}))

const doVariants = doPatterns.map((p, i) => ({
  name: `pattern=${p}`,
  width: doDims[i].width,
  height: doDims[i].height,
  svg: doSvgs[i],
}))

const output = [
  {
    name: 'Anti-Pattern Dont',
    renderType: 'svg',
    variantProperties: { pattern: dontPatterns },
    variants: dontVariants,
  },
  {
    name: 'Anti-Pattern Do',
    renderType: 'svg',
    variantProperties: { pattern: doPatterns },
    variants: doVariants,
  },
]

const outPath = join(__dirname, 'components', 'AntiPatterns.json')
writeFileSync(outPath, JSON.stringify(output, null, 2))
console.log(`Done — AntiPatterns.json written with ${dontVariants.length + doVariants.length} SVG variants to ${outPath}`)
