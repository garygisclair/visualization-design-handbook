/**
 * generate-chart-anatomy.mjs
 * Generates ChartAnatomy.json — 7 annotated reference chart SVGs.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "components");
const outFile = join(outDir, "ChartAnatomy.json");

// ── SVG templates ──────────────────────────────────────────────

const horizontalBar = `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="310" viewBox="0 0 700 310">
  <!-- Range-frame Y axis line -->
  <line x1="140" y1="8" x2="140" y2="300" stroke="#9a948e" stroke-width="1"/>

  <!-- Bars -->
  <!-- ChatGPT 5846 -->
  <text x="133" y="36" text-anchor="end" font-size="11" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">ChatGPT</text>
  <rect x="140" y="20" width="500" height="22" fill="#4a4845"/>
  <text x="633" y="35" text-anchor="end" font-size="10" fill="#fff" font-weight="500" font-family="'IBM Plex Mono',monospace">5.8B</text>

  <!-- Gemini 723 -->
  <text x="133" y="71" text-anchor="end" font-size="11" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Gemini</text>
  <rect x="140" y="55" width="62" height="22" fill="#4a4845"/>
  <text x="209" y="70" text-anchor="start" font-size="10" fill="#5a5650" font-family="'IBM Plex Mono',monospace">723M</text>

  <!-- DeepSeek 319 -->
  <text x="133" y="106" text-anchor="end" font-size="11" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">DeepSeek</text>
  <rect x="140" y="90" width="27" height="22" fill="#4a4845"/>
  <text x="174" y="105" text-anchor="start" font-size="10" fill="#5a5650" font-family="'IBM Plex Mono',monospace">319M</text>

  <!-- Perplexity -->
  <text x="133" y="141" text-anchor="end" font-size="11" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Perplexity</text>
  <rect x="140" y="125" width="13" height="22" fill="#4a4845"/>
  <text x="160" y="140" text-anchor="start" font-size="10" fill="#5a5650" font-family="'IBM Plex Mono',monospace">148M</text>

  <!-- Claude -->
  <text x="133" y="176" text-anchor="end" font-size="11" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Claude</text>
  <rect x="140" y="160" width="13" height="22" fill="#4a4845"/>
  <text x="160" y="175" text-anchor="start" font-size="10" fill="#5a5650" font-family="'IBM Plex Mono',monospace">148M</text>

  <!-- Google AI Studio -->
  <text x="133" y="211" text-anchor="end" font-size="11" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">G.AI Studio</text>
  <rect x="140" y="195" width="8" height="22" fill="#4a4845"/>
  <text x="155" y="210" text-anchor="start" font-size="10" fill="#5a5650" font-family="'IBM Plex Mono',monospace">99M</text>

  <!-- Callout arrows / annotations -->
  <line x1="640" y1="31" x2="670" y2="31" stroke="#1a4db8" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="672" y="35" font-size="9" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2460 sorted desc</text>

  <line x1="140" y1="240" x2="140" y2="260" stroke="#1a4db8" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="145" y="255" font-size="9" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2461 zero baseline (Lie Factor = 1.0)</text>

  <text x="3" y="100" font-size="9" fill="#1a4db8" font-family="'IBM Plex Mono',monospace" transform="rotate(-90,24,100)">\u2462 range-frame</text>

  <line x1="634" y1="35" x2="634" y2="60" stroke="#1a4db8" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="640" y="75" font-size="9" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2463 direct label</text>

  <text x="672" y="90" font-size="9" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2464 bar/main</text>
</svg>`;

const slopeLine = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="200" viewBox="0 0 600 200">
  <!-- Y axis -->
  <line x1="10" y1="10" x2="10" y2="185" stroke="#9a948e" stroke-width="1"/>
  <!-- Year guide lines -->
  <line x1="60" y1="10" x2="60" y2="185" stroke="#d8d4ce" stroke-width="0.5"/>
  <line x1="310" y1="10" x2="310" y2="185" stroke="#d8d4ce" stroke-width="0.5"/>
  <line x1="560" y1="10" x2="560" y2="185" stroke="#d8d4ce" stroke-width="0.5"/>
  <!-- Year labels -->
  <text x="60" y="197" text-anchor="middle" font-size="9" fill="#9a948e" font-family="'IBM Plex Mono',monospace">2023</text>
  <text x="310" y="197" text-anchor="middle" font-size="9" fill="#9a948e" font-family="'IBM Plex Mono',monospace">2024</text>
  <text x="560" y="197" text-anchor="middle" font-size="9" fill="#9a948e" font-family="'IBM Plex Mono',monospace">2025</text>
  <!-- ChatGPT line -->
  <polyline points="60,130 310,80 560,30" fill="none" stroke="#4a4845" stroke-width="2"/>
  <text x="565" y="33" font-size="9" fill="#4a4845" font-weight="600" font-family="'IBM Plex Sans',sans-serif">ChatGPT 388M</text>
  <!-- Claude line -->
  <polyline points="60,175 310,165 560,145" fill="none" stroke="#4a4845" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="565" y="148" font-size="9" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">Claude 20M</text>
  <!-- DeepSeek line (launches 2024) -->
  <polyline points="310,175 560,143" fill="none" stroke="#b0aaa4" stroke-width="1.5"/>
  <text x="565" y="146" font-size="8" fill="#b0aaa4" font-family="'IBM Plex Sans',sans-serif">DeepSeek 49.5M</text>
  <!-- Annotations -->
  <text x="12" y="130" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2460 year guides (muted)</text>
  <text x="12" y="150" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2461 log Y scale</text>
  <text x="12" y="170" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2462 end-value labels only</text>
</svg>`;

const scatter = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="240" viewBox="0 0 600 240">
  <!-- Range-frame axes -->
  <line x1="60" y1="200" x2="540" y2="200" stroke="#9a948e" stroke-width="1"/>
  <line x1="60" y1="10" x2="60" y2="200" stroke="#9a948e" stroke-width="1"/>
  <!-- Regression line -->
  <line x1="60" y1="190" x2="520" y2="40" stroke="#d8d4ce" stroke-width="1" stroke-dasharray="4,2"/>
  <!-- Data points -->
  <circle cx="520" cy="30" r="5" fill="#4a4845"/>
  <text x="527" y="33" font-size="9" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">ChatGPT</text>
  <circle cx="120" cy="80" r="4" fill="#4a4845"/>
  <text x="127" y="83" font-size="9" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">Gemini</text>
  <circle cx="95" cy="155" r="4" fill="#4a4845"/>
  <text x="102" y="158" font-size="9" fill="#4a4845" font-family="'IBM Plex Sans',sans-serif">DeepSeek</text>
  <circle cx="75" cy="60" r="4" fill="#4a4845"/>
  <text x="82" y="63" font-size="9" font-family="'IBM Plex Sans',sans-serif"><tspan fill="#4a4845">Claude </tspan><tspan fill="#c0392b">\u2460</tspan></text>
  <circle cx="75" cy="170" r="3" fill="#b0aaa4"/>
  <text x="82" y="173" font-size="9" fill="#b0aaa4" font-family="'IBM Plex Sans',sans-serif">Perplexity</text>
  <!-- Axis labels -->
  <text x="300" y="218" text-anchor="middle" font-size="9" fill="#9a948e" font-family="'IBM Plex Mono',monospace">Monthly Visits \u2192</text>
  <text x="20" y="110" text-anchor="middle" font-size="9" fill="#9a948e" font-family="'IBM Plex Mono',monospace" transform="rotate(-90,20,110)">Revenue \u2192</text>
  <!-- Regression label -->
  <text x="350" y="110" font-size="8" fill="#9a948e" font-family="'IBM Plex Mono',monospace" transform="rotate(-20,350,110)">trend</text>
  <!-- Annotations -->
  <text x="65" y="230" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2461 range-frame axis</text>
  <text x="200" y="230" font-size="8" fill="#c0392b" font-family="'IBM Plex Mono',monospace">\u2460 outlier label</text>
  <text x="280" y="70" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2462 regression line</text>
</svg>`;

const divergingBar = `<svg xmlns="http://www.w3.org/2000/svg" width="580" height="220" viewBox="0 0 580 220">
  <!-- Center line -->
  <line x1="290" y1="10" x2="290" y2="210" stroke="#9a948e" stroke-width="1"/>
  <text x="148" y="8" text-anchor="middle" font-size="8" fill="#9a948e" font-family="'IBM Plex Mono',monospace">\u2190 Enterprise</text>
  <text x="432" y="8" text-anchor="middle" font-size="8" fill="#9a948e" font-family="'IBM Plex Mono',monospace">Consumer \u2192</text>

  <!-- G.AI Studio: 60/40 -->
  <text x="283" y="32" text-anchor="end" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">G.AI Studio</text>
  <rect x="50" y="18" width="240" height="18" fill="#4a4845"/>
  <text x="47" y="30" text-anchor="end" font-size="9" fill="#4a4845" font-family="'IBM Plex Mono',monospace">60%</text>
  <rect x="290" y="18" width="120" height="18" fill="#b0aaa4"/>
  <text x="413" y="30" font-size="9" fill="#b0aaa4" font-family="'IBM Plex Mono',monospace">40%</text>

  <!-- Claude: 40/60 -->
  <text x="283" y="57" text-anchor="end" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Claude</text>
  <rect x="130" y="43" width="160" height="18" fill="#4a4845"/>
  <text x="127" y="55" text-anchor="end" font-size="9" fill="#4a4845" font-family="'IBM Plex Mono',monospace">40%</text>
  <rect x="290" y="43" width="182" height="18" fill="#b0aaa4"/>
  <text x="475" y="55" font-size="9" fill="#b0aaa4" font-family="'IBM Plex Mono',monospace">60%</text>

  <!-- ChatGPT: 35/65 -->
  <text x="283" y="82" text-anchor="end" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">ChatGPT</text>
  <rect x="148" y="68" width="142" height="18" fill="#4a4845"/>
  <text x="145" y="80" text-anchor="end" font-size="9" fill="#4a4845" font-family="'IBM Plex Mono',monospace">35%</text>
  <rect x="290" y="68" width="200" height="18" fill="#b0aaa4"/>
  <text x="493" y="80" font-size="9" fill="#b0aaa4" font-family="'IBM Plex Mono',monospace">65%</text>

  <!-- Gemini: 30/70 -->
  <text x="283" y="107" text-anchor="end" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Gemini</text>
  <rect x="172" y="93" width="118" height="18" fill="#4a4845"/>
  <text x="169" y="105" text-anchor="end" font-size="9" fill="#4a4845" font-family="'IBM Plex Mono',monospace">30%</text>
  <rect x="290" y="93" width="220" height="18" fill="#b0aaa4"/>
  <text x="513" y="105" font-size="9" fill="#b0aaa4" font-family="'IBM Plex Mono',monospace">70%</text>

  <!-- DeepSeek: 25/75 -->
  <text x="283" y="132" text-anchor="end" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">DeepSeek</text>
  <rect x="193" y="118" width="97" height="18" fill="#4a4845"/>
  <text x="190" y="130" text-anchor="end" font-size="9" fill="#4a4845" font-family="'IBM Plex Mono',monospace">25%</text>
  <rect x="290" y="118" width="230" height="18" fill="#b0aaa4"/>
  <text x="523" y="130" font-size="9" fill="#b0aaa4" font-family="'IBM Plex Mono',monospace">75%</text>

  <!-- Annotations -->
  <text x="290" y="160" text-anchor="middle" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2460 center baseline</text>
  <text x="290" y="175" text-anchor="middle" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2461 bar/main left \u00b7 bar/dim right</text>
  <text x="290" y="190" text-anchor="middle" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2462 % labels both sides</text>
  <text x="290" y="205" text-anchor="middle" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2463 sorted by enterprise %</text>
</svg>`;

const deviationBar = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="220" viewBox="0 0 320 220">
  <line x1="140" y1="10" x2="140" y2="205" stroke="#9a948e" stroke-width="1"/>
  <text x="140" y="215" text-anchor="middle" font-size="8" fill="#9a948e" font-family="'IBM Plex Mono',monospace">0%</text>

  <!-- Claude +18.6 -->
  <text x="133" y="35" text-anchor="end" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Claude</text>
  <rect x="140" y="22" width="100" height="16" fill="#4a4845"/>
  <text x="243" y="34" font-size="9" fill="#4a4845" font-family="'IBM Plex Mono',monospace">+18.6%</text>

  <!-- G.AI Studio +12.5 -->
  <text x="133" y="57" text-anchor="end" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">G.AI Studio</text>
  <rect x="140" y="44" width="67" height="16" fill="#4a4845"/>
  <text x="210" y="56" font-size="9" fill="#4a4845" font-family="'IBM Plex Mono',monospace">+12.5%</text>

  <!-- Perplexity +5.4 -->
  <text x="133" y="79" text-anchor="end" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Perplexity</text>
  <rect x="140" y="66" width="29" height="16" fill="#4a4845"/>
  <text x="172" y="78" font-size="9" fill="#4a4845" font-family="'IBM Plex Mono',monospace">+5.4%</text>

  <!-- ChatGPT +2.2 -->
  <text x="133" y="101" text-anchor="end" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">ChatGPT</text>
  <rect x="140" y="88" width="12" height="16" fill="#4a4845"/>
  <text x="155" y="100" font-size="9" fill="#4a4845" font-family="'IBM Plex Mono',monospace">+2.2%</text>

  <!-- Quark -1.2 -->
  <text x="145" y="123" text-anchor="start" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Quark AI</text>
  <rect x="115" y="110" width="25" height="16" fill="#c0392b"/>
  <text x="112" y="122" text-anchor="end" font-size="9" fill="#c0392b" font-family="'IBM Plex Mono',monospace">-1.2%</text>

  <!-- Meta -3.8 -->
  <text x="145" y="145" text-anchor="start" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Meta AI</text>
  <rect x="96" y="132" width="44" height="16" fill="#c0392b"/>
  <text x="93" y="144" text-anchor="end" font-size="9" fill="#c0392b" font-family="'IBM Plex Mono',monospace">-3.8%</text>

  <!-- DeepSeek -8.9 -->
  <text x="145" y="167" text-anchor="start" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">DeepSeek</text>
  <rect x="52" y="154" width="88" height="16" fill="#c0392b"/>
  <text x="49" y="166" text-anchor="end" font-size="9" fill="#c0392b" font-family="'IBM Plex Mono',monospace">-8.9%</text>

  <!-- Annotations -->
  <text x="160" y="190" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2460 bar/main = positive</text>
  <text x="160" y="205" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2461 accent/critical = negative</text>
</svg>`;

const bulletGraph = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="200" viewBox="0 0 640 200">
  <!-- ChatGPT: budget=200K, actual=270K -->
  <text x="90" y="28" text-anchor="end" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">ChatGPT</text>
  <!-- Qualitative bands: poor / ok / good -->
  <rect x="95" y="15" width="133" height="20" fill="#e8e5e0"/>
  <rect x="228" y="15" width="133" height="20" fill="#d8d4ce"/>
  <rect x="361" y="15" width="133" height="20" fill="#c8c4be"/>
  <!-- Actual bar -->
  <rect x="95" y="19" width="362" height="12" fill="#4a4845"/>
  <!-- Budget marker (vertical line) -->
  <line x1="362" y1="13" x2="362" y2="37" stroke="#1a1917" stroke-width="3"/>
  <text x="363" y="11" font-size="8" fill="#9a948e" font-family="'IBM Plex Mono',monospace">Budget $200K</text>
  <text x="460" y="28" font-size="9" fill="#c0392b" font-family="'IBM Plex Mono',monospace">$270K (+35%) \u2460</text>

  <!-- Claude: budget=100K, actual=130K -->
  <text x="90" y="68" text-anchor="end" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Claude</text>
  <rect x="95" y="55" width="133" height="20" fill="#e8e5e0"/>
  <rect x="228" y="55" width="133" height="20" fill="#d8d4ce"/>
  <rect x="361" y="55" width="133" height="20" fill="#c8c4be"/>
  <rect x="95" y="59" width="175" height="12" fill="#4a4845"/>
  <line x1="228" y1="53" x2="228" y2="77" stroke="#1a1917" stroke-width="3"/>
  <text x="229" y="51" font-size="8" fill="#9a948e" font-family="'IBM Plex Mono',monospace">Budget $100K</text>
  <text x="275" y="68" font-size="9" fill="#c0392b" font-family="'IBM Plex Mono',monospace">$130K (+30%)</text>

  <!-- Gemini: budget=120K, actual=95K -->
  <text x="90" y="108" text-anchor="end" font-size="10" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Gemini</text>
  <rect x="95" y="95" width="133" height="20" fill="#e8e5e0"/>
  <rect x="228" y="95" width="133" height="20" fill="#d8d4ce"/>
  <rect x="361" y="95" width="133" height="20" fill="#c8c4be"/>
  <rect x="95" y="99" width="128" height="12" fill="#4a4845"/>
  <line x1="276" y1="93" x2="276" y2="117" stroke="#1a1917" stroke-width="3"/>
  <text x="277" y="91" font-size="8" fill="#9a948e" font-family="'IBM Plex Mono',monospace">Budget $120K</text>
  <text x="282" y="108" font-size="9" fill="#2a7a4a" font-family="'IBM Plex Mono',monospace">$95K (\u221221%)</text>

  <!-- Annotations -->
  <text x="95" y="150" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2460 actual bar: bar/main</text>
  <text x="95" y="163" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2461 perpendicular budget marker: 3px text-1</text>
  <text x="95" y="176" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2462 qualitative bands: 3 muted grays (poor/ok/good)</text>
  <text x="95" y="189" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2463 no gauge \u2014 bullet replaces speedometer (Few 2006)</text>
</svg>`;

const heatmap = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
  <!-- Column headers -->
  <text x="105" y="14" text-anchor="middle" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">ChatGPT</text>
  <text x="165" y="14" text-anchor="middle" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">Claude</text>
  <text x="225" y="14" text-anchor="middle" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">Gemini</text>
  <text x="285" y="14" text-anchor="middle" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">Copilot</text>
  <text x="345" y="14" text-anchor="middle" font-size="8" fill="#5a5650" font-family="'IBM Plex Mono',monospace">Perplexity</text>

  <!-- Eng -->
  <text x="70" y="34" text-anchor="end" font-size="9" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Eng</text>
  <rect x="75" y="20" width="55" height="20" fill="#4a4845" opacity="0.95"/>
  <rect x="135" y="20" width="55" height="20" fill="#4a4845" opacity="0.7"/>
  <rect x="195" y="20" width="55" height="20" fill="#4a4845" opacity="0.4"/>
  <rect x="255" y="20" width="55" height="20" fill="#4a4845" opacity="0.85"/>
  <rect x="315" y="20" width="55" height="20" fill="#4a4845" opacity="0.3"/>

  <!-- Mktg -->
  <text x="70" y="59" text-anchor="end" font-size="9" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Mktg</text>
  <rect x="75" y="45" width="55" height="20" fill="#4a4845" opacity="0.8"/>
  <rect x="135" y="45" width="55" height="20" fill="#4a4845" opacity="0.5"/>
  <rect x="195" y="45" width="55" height="20" fill="#4a4845" opacity="0.6"/>
  <rect x="255" y="45" width="55" height="20" fill="#4a4845" opacity="0.2"/>
  <rect x="315" y="45" width="55" height="20" fill="#4a4845" opacity="0.7"/>

  <!-- Finance -->
  <text x="70" y="84" text-anchor="end" font-size="9" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Finance</text>
  <rect x="75" y="70" width="55" height="20" fill="#4a4845" opacity="0.6"/>
  <rect x="135" y="70" width="55" height="20" fill="#4a4845" opacity="0.8"/>
  <rect x="195" y="70" width="55" height="20" fill="#4a4845" opacity="0.3"/>
  <rect x="255" y="70" width="55" height="20" fill="#4a4845" opacity="0.5"/>
  <rect x="315" y="70" width="55" height="20" fill="#4a4845" opacity="0.2"/>

  <!-- Legal -->
  <text x="70" y="109" text-anchor="end" font-size="9" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Legal</text>
  <rect x="75" y="95" width="55" height="20" fill="#4a4845" opacity="0.4"/>
  <rect x="135" y="95" width="55" height="20" fill="#4a4845" opacity="0.9"/>
  <rect x="195" y="95" width="55" height="20" fill="#4a4845" opacity="0.2"/>
  <rect x="255" y="95" width="55" height="20" fill="#4a4845" opacity="0.1"/>
  <rect x="315" y="95" width="55" height="20" fill="#4a4845" opacity="0.3"/>

  <!-- Design -->
  <text x="70" y="134" text-anchor="end" font-size="9" fill="#5a5650" font-family="'IBM Plex Sans',sans-serif">Design</text>
  <rect x="75" y="120" width="55" height="20" fill="#4a4845" opacity="0.7"/>
  <rect x="135" y="120" width="55" height="20" fill="#4a4845" opacity="0.4"/>
  <rect x="195" y="120" width="55" height="20" fill="#4a4845" opacity="0.5"/>
  <rect x="255" y="120" width="55" height="20" fill="#4a4845" opacity="0.3"/>
  <rect x="315" y="120" width="55" height="20" fill="#4a4845" opacity="0.6"/>

  <!-- Legend: saturation scale -->
  <text x="75" y="158" font-size="8" fill="#9a948e" font-family="'IBM Plex Mono',monospace">Low adoption</text>
  <rect x="75" y="162" width="30" height="10" fill="#4a4845" opacity="0.15"/>
  <rect x="107" y="162" width="30" height="10" fill="#4a4845" opacity="0.4"/>
  <rect x="139" y="162" width="30" height="10" fill="#4a4845" opacity="0.65"/>
  <rect x="171" y="162" width="30" height="10" fill="#4a4845" opacity="0.9"/>
  <text x="205" y="170" font-size="8" fill="#9a948e" font-family="'IBM Plex Mono',monospace">High</text>

  <!-- Annotations -->
  <text x="75" y="185" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2460 single hue: saturation-only variation</text>
  <text x="75" y="197" font-size="8" fill="#1a4db8" font-family="'IBM Plex Mono',monospace">\u2461 no color legend \u2014 gradient strip inline</text>
</svg>`;

// ── Build JSON ─────────────────────────────────────────────────

const chartTypes = [
  "horizontal-bar",
  "slope-line",
  "scatter",
  "diverging-bar",
  "deviation-bar",
  "bullet-graph",
  "heatmap",
];

const svgs = [horizontalBar, slopeLine, scatter, divergingBar, deviationBar, bulletGraph, heatmap];
const sizes = [
  { width: 700, height: 310 },
  { width: 600, height: 200 },
  { width: 600, height: 240 },
  { width: 580, height: 220 },
  { width: 320, height: 220 },
  { width: 640, height: 200 },
  { width: 400, height: 200 },
];

const output = [
  {
    name: "Chart Anatomy",
    renderType: "svg",
    variantProperties: {
      chart: chartTypes,
    },
    variants: chartTypes.map((type, i) => ({
      name: `chart=${type}`,
      width: sizes[i].width,
      height: sizes[i].height,
      svg: svgs[i],
    })),
  },
];

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JSON.stringify(output, null, 2), "utf-8");
console.log(`ChartAnatomy.json written → ${outFile} (${chartTypes.length} variants)`);
