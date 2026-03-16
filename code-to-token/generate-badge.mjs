// generate-badge.mjs — Generates Badge.json as declarative variant components
// 6 badge variants, each with auto-layout, text + border, bound to Figma variables.
//
// Run: node code-to-token/generate-badge.mjs
// Output: code-to-token/components/Badge.json

import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const badges = [
  { variant: 'yes',  text: 'YES',     colorVar: 'accent/positive', colorFallback: '#2a7a4a' },
  { variant: 'warn', text: 'LIMITED',  colorVar: 'accent/warning',  colorFallback: '#c97b2e' },
  { variant: 'no',   text: 'NO',      colorVar: 'text/tertiary',   colorFallback: '#9a948e' },
  { variant: 'vh',   text: 'V.HIGH',  colorVar: 'accent/info',     colorFallback: '#1a4db8' },
  { variant: 'hi',   text: 'HIGH',    colorVar: 'data/bar-primary', colorFallback: '#4a4845' },
  { variant: 'med',  text: 'MED',     colorVar: 'text/tertiary',   colorFallback: '#9a948e' },
]

const spec = {
  name: 'Badge',
  renderType: 'declarative',
  variantProperties: {
    type: badges.map(b => b.variant),
  },
  base: {
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    primaryAxisSizingMode: 'AUTO',
    counterAxisSizingMode: 'AUTO',
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    fontFamily: 'IBM Plex Sans',
  },
  variants: badges.map(b => ({
    name: `type=${b.variant}`,
    strokeColor: { var: b.colorVar, fallback: b.colorFallback },
    strokeWeight: 1,
    fontSize: { var: 'fontSize/badge', fallback: 10 },
    letterSpacing: 0.5,
    textCase: 'UPPER',
    textColor: { var: b.colorVar, fallback: b.colorFallback },
    labelText: b.text,
  })),
}

const outPath = join(__dirname, 'components', 'Badge.json')
writeFileSync(outPath, JSON.stringify(spec, null, 2))
console.log(`✓ Badge.json — ${badges.length} declarative variants written to ${outPath}`)
