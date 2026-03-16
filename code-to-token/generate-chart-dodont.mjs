// generate-chart-dodont.mjs — Generates ChartDoDont.json with Do/Don't SVG pairs
// Three chart types: horizontal-bar, slope-line, scatter
//
// Run: node code-to-token/generate-chart-dodont.mjs
// Output: code-to-token/components/ChartDoDont.json

import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Chart 1: Horizontal Bar ────────────────────────────

const hbarDoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="90" viewBox="0 0 260 90">
            <line x1="60" y1="4" x2="60" y2="82" stroke="#9a948e" stroke-width="1"/>
            <rect x="60" y="8" width="160" height="14" fill="#4a4845"/>
            <text x="223" y="20" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">160</text>
            <rect x="60" y="28" width="100" height="14" fill="#4a4845"/>
            <text x="163" y="40" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">100</text>
            <rect x="60" y="48" width="60" height="14" fill="#4a4845"/>
            <text x="123" y="60" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">60</text>
            <rect x="60" y="68" width="30" height="14" fill="#4a4845"/>
            <text x="93" y="76" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">30</text>
          </svg>`

const hbarDontSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="95" viewBox="0 0 260 95">
            <!-- Truncated axis starting at 50 -->
            <line x1="60" y1="4" x2="60" y2="82" stroke="#9a948e" stroke-width="1"/>
            <text x="50" y="76" text-anchor="end" font-size="7" fill="#c0392b" font-family="'IBM Plex Mono',monospace">50</text>
            <text x="50" y="8" text-anchor="end" font-size="7" fill="#c0392b" font-family="'IBM Plex Mono',monospace">160</text>
            <!-- Bars look very similar in height due to truncation -->
            <rect x="60" y="8" width="130" height="14" fill="#c0392b" opacity="0.6"/>
            <rect x="60" y="28" width="100" height="14" fill="#c0392b" opacity="0.6"/>
            <rect x="60" y="48" width="60" height="14" fill="#c0392b" opacity="0.6"/>
            <rect x="60" y="68" width="8" height="14" fill="#c0392b" opacity="0.6"/>
            <text x="135" y="90" font-size="7" fill="#c0392b" font-family="'IBM Plex Sans',sans-serif" text-anchor="middle">axis starts at 50 → differences exaggerated</text>
          </svg>`

// ── Chart 2: Slope / Line ──────────────────────────────

const slopeDoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="70" viewBox="0 0 240 70">
          <polyline points="10,55 120,35 230,10" fill="none" stroke="#4a4845" stroke-width="2"/>
          <polyline points="10,60 120,55 230,45" fill="none" stroke="#4a4845" stroke-width="1.5" stroke-dasharray="4,2"/>
          <text x="232" y="13" font-size="8" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">A</text>
          <text x="232" y="48" font-size="8" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">B</text>
        </svg>`

const slopeDontSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="70" viewBox="0 0 240 70">
          <polyline points="10,20 60,45 120,15 180,50 230,25" fill="none" stroke="#e74c3c" stroke-width="1.5"/>
          <polyline points="10,50 60,20 120,45 180,15 230,55" fill="none" stroke="#3498db" stroke-width="1.5"/>
          <polyline points="10,35 60,60 120,30 180,55 230,20" fill="none" stroke="#2ecc71" stroke-width="1.5"/>
          <polyline points="10,60 60,35 120,55 180,30 230,45" fill="none" stroke="#f39c12" stroke-width="1.5"/>
          <polyline points="10,15 60,50 120,20 180,45 230,35" fill="none" stroke="#9b59b6" stroke-width="1.5"/>
          <text x="5" y="68" font-size="7" fill="#c0392b" font-family="'IBM Plex Sans',sans-serif">rainbow palette + legend = eye travel</text>
        </svg>`

// ── Chart 3: Scatter ───────────────────────────────────

const scatterDoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="70" viewBox="0 0 240 70">
          <line x1="20" y1="60" x2="220" y2="60" stroke="#9a948e" stroke-width="1"/>
          <line x1="20" y1="10" x2="20" y2="60" stroke="#9a948e" stroke-width="1"/>
          <circle cx="80" cy="40" r="4" fill="#4a4845"/>
          <text x="87" y="43" font-size="8" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">Tool A</text>
          <circle cx="160" cy="20" r="4" fill="#4a4845"/>
          <text x="167" y="23" font-size="8" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">Tool B</text>
        </svg>`

const scatterDontSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="70" viewBox="0 0 240 70">
          <circle cx="80" cy="40" r="18" fill="#e74c3c" opacity="0.4"/>
          <circle cx="160" cy="20" r="10" fill="#3498db" opacity="0.4"/>
          <text x="80" y="44" text-anchor="middle" font-size="7" fill="#c0392b" font-family="'IBM Plex Sans',sans-serif">2×dia→4×area</text>
        </svg>`

// ── Build output ───────────────────────────────────────

const chartTypes = ['horizontal-bar', 'slope-line', 'scatter']

const doVariants = [
  { name: 'chart=horizontal-bar', width: 260, height: 90,  svg: hbarDoSvg },
  { name: 'chart=slope-line',     width: 240, height: 70,  svg: slopeDoSvg },
  { name: 'chart=scatter',        width: 240, height: 70,  svg: scatterDoSvg },
]

const dontVariants = [
  { name: 'chart=horizontal-bar', width: 260, height: 95,  svg: hbarDontSvg },
  { name: 'chart=slope-line',     width: 240, height: 70,  svg: slopeDontSvg },
  { name: 'chart=scatter',        width: 240, height: 70,  svg: scatterDontSvg },
]

const output = [
  {
    name: 'Chart Do',
    renderType: 'svg',
    variantProperties: { chart: chartTypes },
    variants: doVariants,
  },
  {
    name: 'Chart Dont',
    renderType: 'svg',
    variantProperties: { chart: chartTypes },
    variants: dontVariants,
  },
]

const outPath = join(__dirname, 'components', 'ChartDoDont.json')
writeFileSync(outPath, JSON.stringify(output, null, 2))
console.log(`Done — ChartDoDont.json written with ${doVariants.length + dontVariants.length} SVG variants to ${outPath}`)
