// generate-mini-line-chart.mjs — Generates MiniLineChart.json
// Small multiple line charts with Y axis, baseline, endpoint label, year ticks.
//
// Run: node code-to-token/generate-mini-line-chart.mjs
// Output: code-to-token/components/MiniLineChart.json

import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const W = 260, H = 72
const padL = 8, padR = 40, padT = 4, padB = 16
const chartW = W - padL - padR
const chartH = H - padT - padB

// Colors from token system
const axisColor = '#9a948e'   // text/tertiary
const lineColor = '#4a4845'   // data/bar-primary
const labelColor = '#5a5650'  // text/secondary
const tickColor = '#9a948e'   // text/tertiary

// Shared Y scale: 0 to 400M (log would be ideal but linear is clearer for SVG)
const yMax = 400

function yPos(val) {
  return padT + chartH - (val / yMax) * chartH
}

function xPos(idx, total) {
  return padL + (idx / (total - 1)) * chartW
}

const charts = [
  {
    variant: 'chatgpt',
    data: [{ y: 100, yr: '2023' }, { y: 250, yr: '2024' }, { y: 388, yr: '2025' }],
    endLabel: '388M',
  },
  {
    variant: 'claude',
    data: [{ y: 2, yr: '2023' }, { y: 8, yr: '2024' }, { y: 20, yr: '2025' }],
    endLabel: '20M',
  },
  {
    variant: 'gemini',
    data: [{ y: 2, yr: '2023' }, { y: 15, yr: '2024' }, { y: 47.6, yr: '2025' }],
    endLabel: '47.6M',
  },
  {
    variant: 'deepseek',
    // DeepSeek only has 2024-2025 data
    data: [{ y: null, yr: '2023' }, { y: 5, yr: '2024' }, { y: 49.5, yr: '2025' }],
    endLabel: '49.5M',
  },
]

function generateChart(chart) {
  const validData = chart.data.filter(d => d.y !== null)
  const points = validData.map((d, i) => {
    const totalIdx = chart.data.indexOf(d)
    return `${xPos(totalIdx, chart.data.length).toFixed(1)},${yPos(d.y).toFixed(1)}`
  }).join(' ')

  const lastPoint = validData[validData.length - 1]
  const lastX = xPos(chart.data.indexOf(lastPoint), chart.data.length)
  const lastY = yPos(lastPoint.y)

  // Year tick labels
  const yearLabels = chart.data.map((d, i) => {
    const x = xPos(i, chart.data.length)
    return `<text x="${x.toFixed(1)}" y="${H - 2}" font-size="8" fill="${tickColor}" font-family="'IBM Plex Mono',monospace" text-anchor="middle">${d.yr}</text>`
  }).join('\n  ')

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`,
    `  <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + chartH}" stroke="${axisColor}" stroke-width="1"/>`,
    `  <line x1="${padL}" y1="${padT + chartH}" x2="${padL + chartW}" y2="${padT + chartH}" stroke="${axisColor}" stroke-width="0.5" stroke-dasharray="3,3"/>`,
    `  <polyline points="${points}" fill="none" stroke="${lineColor}" stroke-width="2"/>`,
    `  <text x="${(lastX + 5).toFixed(1)}" y="${(lastY + 3).toFixed(1)}" font-size="9" fill="${labelColor}" font-family="'IBM Plex Mono',monospace">${chart.endLabel}</text>`,
    `  ${yearLabels}`,
    `</svg>`,
  ].join('\n')

  return { svg, width: W, height: H }
}

const variants = charts.map(c => {
  const { svg, width, height } = generateChart(c)
  return {
    name: `tool=${c.variant}`,
    width,
    height,
    svg,
  }
})

const spec = [
  {
    name: 'Mini Line Chart',
    renderType: 'svg',
    variantProperties: {
      tool: charts.map(c => c.variant),
    },
    variants,
  },
]

const outPath = join(__dirname, 'components', 'MiniLineChart.json')
writeFileSync(outPath, JSON.stringify(spec, null, 2))
console.log(`✓ MiniLineChart.json — ${variants.length} variants written to ${outPath}`)
