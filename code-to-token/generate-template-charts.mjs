// generate-template-charts.mjs — Generates TemplateCharts.json for the Few/Tufte Design Library
// Two SVG components: the horizontal bar chart and scatter plot from lib-template.html.
//
// Run: node code-to-token/generate-template-charts.mjs
// Output: code-to-token/components/TemplateCharts.json

import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── SECTION 1: Horizontal Bar Chart — Market Scale — Monthly Visits ──

const barW = 900, barH = 310
const barSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${barW}" height="${barH}" viewBox="0 0 ${barW} ${barH}">
  <line x1="140" y1="8" x2="140" y2="300" stroke="#9a948e" stroke-width="1"/>
  <!-- ChatGPT -->
  <text x="133" y="36" text-anchor="end" font-size="12" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">ChatGPT</text>
  <rect x="140" y="20" width="620" height="26" fill="#4a4845"/>
  <text x="752" y="37" text-anchor="end" font-size="11" fill="#fff" font-weight="500" font-family="'IBM Plex Mono',monospace">5.8B</text>
  <!-- Gemini -->
  <text x="133" y="72" text-anchor="end" font-size="12" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Gemini</text>
  <rect x="140" y="56" width="77" height="26" fill="#4a4845"/>
  <text x="224" y="73" font-size="11" fill="#5a5650" font-family="'IBM Plex Mono',monospace">723M</text>
  <!-- DeepSeek -->
  <text x="133" y="108" text-anchor="end" font-size="12" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">DeepSeek</text>
  <rect x="140" y="92" width="34" height="26" fill="#4a4845"/>
  <text x="181" y="109" font-size="11" fill="#5a5650" font-family="'IBM Plex Mono',monospace">319M</text>
  <!-- Perplexity -->
  <text x="133" y="144" text-anchor="end" font-size="12" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Perplexity</text>
  <rect x="140" y="128" width="16" height="26" fill="#4a4845"/>
  <text x="162" y="145" font-size="11" fill="#5a5650" font-family="'IBM Plex Mono',monospace">148M</text>
  <!-- Claude -->
  <text x="133" y="180" text-anchor="end" font-size="12" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Claude</text>
  <rect x="140" y="164" width="16" height="26" fill="#4a4845"/>
  <text x="162" y="181" font-size="11" fill="#5a5650" font-family="'IBM Plex Mono',monospace">148M</text>
  <!-- G.AI Studio -->
  <text x="133" y="216" text-anchor="end" font-size="12" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">G.AI Studio</text>
  <rect x="140" y="200" width="11" height="26" fill="#4a4845"/>
  <text x="157" y="217" font-size="11" fill="#5a5650" font-family="'IBM Plex Mono',monospace">99M</text>
  <!-- Quark -->
  <text x="133" y="252" text-anchor="end" font-size="12" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Quark AI</text>
  <rect x="140" y="236" width="9" height="26" fill="#4a4845"/>
  <text x="155" y="253" font-size="11" fill="#5a5650" font-family="'IBM Plex Mono',monospace">87M</text>
  <!-- Doubao -->
  <text x="133" y="288" text-anchor="end" font-size="12" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Doubao</text>
  <rect x="140" y="272" width="8" height="26" fill="#4a4845"/>
  <text x="154" y="289" font-size="11" fill="#5a5650" font-family="'IBM Plex Mono',monospace">74M</text>
</svg>`

// ── SECTION 3: Scatter Plot — Revenue vs. Scale ──

const scatterW = 860, scatterH = 260
const scatterSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${scatterW}" height="${scatterH}" viewBox="0 0 ${scatterW} ${scatterH}">
  <line x1="60" y1="230" x2="820" y2="230" stroke="#9a948e" stroke-width="1"/>
  <line x1="60" y1="10" x2="60" y2="230" stroke="#9a948e" stroke-width="1"/>
  <line x1="60" y1="225" x2="60" y2="240" stroke="#9a948e" stroke-width="0.5"/>
  <line x1="820" y1="225" x2="820" y2="240" stroke="#9a948e" stroke-width="0.5"/>
  <line x1="55" y1="10" x2="65" y2="10" stroke="#9a948e" stroke-width="0.5"/>
  <line x1="55" y1="230" x2="65" y2="230" stroke="#9a948e" stroke-width="0.5"/>
  <!-- Regression line -->
  <line x1="60" y1="220" x2="820" y2="50" stroke="#d8d4ce" stroke-width="1" stroke-dasharray="4,2"/>
  <!-- ChatGPT: far right, high revenue -->
  <circle cx="780" cy="30" r="6" fill="#4a4845"/>
  <text x="789" y="34" font-size="10" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">ChatGPT</text>
  <!-- Gemini -->
  <circle cx="160" cy="110" r="5" fill="#4a4845"/>
  <text x="169" y="114" font-size="10" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">Gemini</text>
  <!-- Claude: high rev outlier -->
  <circle cx="95" cy="60" r="5" fill="#4a4845"/>
  <text x="104" y="64" font-size="10" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">Claude &#x2191; revenue outlier</text>
  <!-- DeepSeek -->
  <circle cx="120" cy="185" r="5" fill="#4a4845"/>
  <text x="129" y="189" font-size="10" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">DeepSeek</text>
  <!-- Perplexity -->
  <circle cx="90" cy="195" r="4" fill="#b0aaa4"/>
  <text x="99" y="199" font-size="10" fill="#b0aaa4" font-family="'IBM Plex Sans',sans-serif">Perplexity</text>
  <!-- Axis labels -->
  <text x="440" y="248" text-anchor="middle" font-size="10" fill="#9a948e" font-family="'IBM Plex Mono',monospace">Monthly Visits &#x2192;</text>
  <text x="22" y="130" text-anchor="middle" font-size="10" fill="#9a948e" font-family="'IBM Plex Mono',monospace" transform="rotate(-90,22,130)">Est. Revenue &#x2192;</text>
  <text x="60" y="248" text-anchor="middle" font-size="9" fill="#9a948e" font-family="'IBM Plex Mono',monospace">min</text>
  <text x="820" y="248" text-anchor="middle" font-size="9" fill="#9a948e" font-family="'IBM Plex Mono',monospace">5.8B</text>
</svg>`

// ── Build output ──

const spec = [
  {
    name: 'Template Bar Chart',
    renderType: 'svg',
    variantProperties: {
      data: ['ai-market-2025'],
    },
    variants: [
      {
        name: 'data=ai-market-2025',
        width: barW,
        height: barH,
        svg: barSvg,
      },
    ],
  },
  {
    name: 'Template Scatter',
    renderType: 'svg',
    variantProperties: {
      data: ['ai-market-2025'],
    },
    variants: [
      {
        name: 'data=ai-market-2025',
        width: scatterW,
        height: scatterH,
        svg: scatterSvg,
      },
    ],
  },
]

const outPath = join(__dirname, 'components', 'TemplateCharts.json')
writeFileSync(outPath, JSON.stringify(spec, null, 2))
console.log(`Done — TemplateCharts.json (2 components) written to ${outPath}`)
