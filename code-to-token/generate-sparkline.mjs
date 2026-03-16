// generate-sparkline.mjs — Generates Sparkline.json for the Few/Tufte Design Library
// 5 sparkline variants showing different trend shapes.
//
// Run: node code-to-token/generate-sparkline.mjs
// Output: code-to-token/components/Sparkline.json

import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const W = 60, H = 16
const stroke = '#4a4845'
const strokeWidth = 1.5

const sparklines = [
  { variant: 'up',        points: '0,13 20,10 40,7 60,4' },
  { variant: 'up-steep',  points: '0,13 20,10 40,6 60,2' },
  { variant: 'up-gentle', points: '0,12 20,9 40,7 60,5' },
  { variant: 'down',      points: '0,4 20,7 40,10 60,13' },
  { variant: 'spike',     points: '0,14 20,5 40,8 60,11' },
  { variant: 'flat',      points: '0,8 20,9 40,8 60,7' },
]

const variants = sparklines.map(s => {
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`,
    `  <polyline points="${s.points}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}"/>`,
    `</svg>`,
  ].join('\n')

  return {
    name: `trend=${s.variant}`,
    width: W,
    height: H,
    svg,
  }
})

const spec = [
  {
    name: 'Sparkline',
    renderType: 'svg',
    variantProperties: {
      trend: sparklines.map(s => s.variant),
    },
    variants,
  },
]

const outPath = join(__dirname, 'components', 'Sparkline.json')
writeFileSync(outPath, JSON.stringify(spec, null, 2))
console.log(`✓ Sparkline.json — ${variants.length} variants written to ${outPath}`)
