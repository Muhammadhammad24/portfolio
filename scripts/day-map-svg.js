// Emits public/day-map.svg: the same day in production the page runs, re-cut as
// one looping CSS timeline so GitHub can render it as a plain image.
const fs = require('fs')

const T = 20 // seconds, one whole day
const p = (t) => +(t / T * 100).toFixed(3)

const NODE_X = 152, NODE_W = 272, NODE_H = 44, TOP = 10
const nodeY = (i) => TOP + i * (NODE_H + 8)
const CTL_X = 4, CTL_W = 106, CTL_H = 48
const ctlY = (i) => TOP + 44 + i * (CTL_H + 40)
const RAIL_X = NODE_X - 11
const STRIP_Y = 400, CHIP_W = 100
const chipX = (i) => CTL_X + i * (CHIP_W + 8)
const MARK = 19

const PAD_X = 12, HEAD = 34
const W = 432 + PAD_X * 2
const H = 436 + HEAD + 8

const DANGER = '#E5484D'
const WASH = 'rgba(229,72,77,0.09)'
const LINE = 'rgba(229,72,77,0.58)'

const DAY = [
  { id:'check',    tag:'SRE',        name:'Monitoring & alerts', does:'all green',          win:[0,2] },
  { id:'triage',   tag:'IT SUPPORT', name:'Service desk',        does:'sorted by impact',   win:[2,4] },
  { id:'change',   tag:'DEVOPS',     name:'Change management',   does:'shipped safely',     win:[4,6] },
  { id:'automate', tag:'AUTOMATION', name:'Automation & IaC',    does:'25 h/week returned', win:[6,9] },
  { id:'identity', tag:'SECURITY',   name:'Identity & access',   does:'least privilege',    win:[9,11] },
  { id:'incident', tag:'ON-CALL',    name:'Incident response',   does:'contained first',    win:[11,17] },
  { id:'fleet',    tag:'ENDPOINTS',  name:'Endpoint management', does:'fleet in line',      win:[17,20] },
]
const BREAK = 5

const GLYPH = {
  check: ['M2 12h4l2.5-6 3.5 12 2.5-6H22'],
  triage: ['M3 5h18M3 10h18M3 15h11','M18.5 14.3a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z'],
  change: ['M6 2.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z','M6 16.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z','M18 9.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z','M6 7.4v9.2M8.4 5h4.6a2.6 2.6 0 0 1 2.6 2.6v2'],
  automate: ['M8.5 6 3.5 12l5 6M15.5 6l5 6-5 6'],
  identity: ['M12 3 20 6v6c0 4.4-3.3 7.9-8 9-4.7-1.1-8-4.6-8-9V6Z','M9.3 12.2l1.9 1.9 3.5-3.8'],
  incident: ['M12 3.5 22 20H2Z','M12 10v4M12 17h.01'],
  fleet: ['M3.6 4.5h9.8a1.6 1.6 0 0 1 1.6 1.6v6.3a1.6 1.6 0 0 1-1.6 1.6H3.6A1.6 1.6 0 0 1 2 12.4V6.1a1.6 1.6 0 0 1 1.6-1.6Z','M1 18h15','M18.4 9h3.1a1.4 1.4 0 0 1 1.4 1.4v8.2a1.4 1.4 0 0 1-1.4 1.4h-3.1a1.4 1.4 0 0 1-1.4-1.4v-8.2A1.4 1.4 0 0 1 18.4 9Z'],
}

const ALWAYS = [
  { name:'Monitor', sub:'Grafana · Datadog' },
  { name:'Network', sub:'Fortinet · Cisco' },
  { name:'Systems', sub:'Windows · Linux' },
  { name:'Cloud',   sub:'Azure · AWS' },
]

const WATCHING = ['monitoring','backups','endpoints','on-call']
const CONTAINING = ['isolate','revoke','block','restore']

const css = []

/** An element that is simply on for [a,b) of the loop and off otherwise. */
function onFor(name, a, b, opts) {
  const max = (opts && opts.max) || 1
  const fade = (opts && opts.fade !== undefined) ? opts.fade : 0.25
  const k = []
  k.push('0%{opacity:' + (a <= 0 ? max : 0) + '}')
  if (a > 0) k.push(p(a) + '%{opacity:0}')
  k.push(p(a + fade) + '%{opacity:' + max + '}')
  k.push(p(b - fade) + '%{opacity:' + max + '}')
  k.push(p(b) + '%{opacity:0}')
  k.push('100%{opacity:' + (b >= T ? max : 0) + '}')
  css.push('@keyframes ' + name + '{' + k.join('') + '}')
  css.push('.' + name + '{opacity:0;animation:' + name + ' ' + T + 's linear infinite}')
}

const esc = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')

const out = []
const push = (s) => out.push(s)

// the lit hour, block by block
DAY.forEach((n, i) => {
  if (i === BREAK) return
  onFor('lit' + i, n.win[0], n.win[1])
})
// the incident, in its two states
onFor('alert', 11, 16.4)
onFor('broken', 11, 17, { fade: 0.2 })
// everything that is not the incident steps back
css.push('@keyframes dim{0%{opacity:1}' + p(11) + '%{opacity:1}' + p(11.3) + '%{opacity:.3}' + p(16.8) + '%{opacity:.3}' + p(17.1) + '%{opacity:1}100%{opacity:1}}')
css.push('.dim{animation:dim ' + T + 's linear infinite}')

// the dot running down the rail
{
  const stops = DAY.map((n, i) => [n.win[0], nodeY(i) - TOP])
  const k = ['0%{transform:translateY(0)}']
  stops.forEach((s, i) => {
    if (i === 0) return
    k.push(p(s[0]) + '%{transform:translateY(' + stops[i-1][1] + 'px)}')
    k.push(p(s[0] + 0.4) + '%{transform:translateY(' + s[1] + 'px)}')
  })
  k.push(p(T - 0.4) + '%{transform:translateY(' + stops[stops.length-1][1] + 'px)}')
  k.push('100%{transform:translateY(0)}')
  css.push('@keyframes rail{' + k.join('') + '}')
  css.push('.rail-dot{animation:rail ' + T + 's cubic-bezier(.5,0,.3,1) infinite}')
}
css.push('@keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}')
css.push('.dot-pulse{animation:pulse 2.4s ease-in-out infinite}')

// containment, landing one step at a time
CONTAINING.forEach((_, i) => onFor('hold' + i, 12.2 + i * 0.85, 17, { fade: 0.12 }))

// the two counters
const CLOCK = ['T+00:37','T+01:15','T+01:52','T+02:30','T+03:07']
CLOCK.forEach((_, i) => onFor('clk' + i, 11 + i * 1.05, i === CLOCK.length - 1 ? 17 : 11 + (i+1) * 1.05, { fade: 0.08 }))
const HOURS = ['+6 h/wk','+13 h/wk','+20 h/wk','+25 h/wk']
HOURS.forEach((_, i) => onFor('hr' + i, 6 + i * 0.55, i === HOURS.length - 1 ? 9 : 6 + (i+1) * 0.55, { fade: 0.08 }))
onFor('idle', 0, 6, { fade: 0.1 })
onFor('idle2', 9, 11, { fade: 0.1 })
onFor('idle3', 17, 20, { fade: 0.1 })

// the status line
onFor('st_calm1', 0, 6, { fade: 0.1 })
onFor('st_toil', 6, 9, { fade: 0.1 })
onFor('st_calm2', 9, 11, { fade: 0.1 })
onFor('st_p1', 11, 12.2, { fade: 0.1 })
onFor('st_cont', 12.2, 16.4, { fade: 0.1 })
onFor('st_done', 16.4, 17, { fade: 0.1 })
onFor('st_calm3', 17, 20, { fade: 0.1 })

// ───────────────────────── markup ─────────────────────────
const ALT = 'A day in production: monitoring and alerts, service desk triage from L1 to L3, change management, infrastructure automation, identity and access, and endpoint management — over an estate of monitoring, network, systems and cloud that never stops. Partway through, monitoring catches an incident, the day stops, and containment runs before the day resumes.'

push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="' + ALT + '">')
push('<defs>')
push('<marker id="h" markerWidth="5" markerHeight="5" refX="4.2" refY="2.5" orient="auto"><path d="M0 0 L5 2.5 L0 5 z" fill="rgba(255,255,255,0.32)"/></marker>')
push('<marker id="hr" markerWidth="5" markerHeight="5" refX="4.2" refY="2.5" orient="auto"><path d="M0 0 L5 2.5 L0 5 z" fill="' + DANGER + '"/></marker>')
push('<filter id="glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="2.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>')
push('</defs>')
push('<style>')
push("text{font-family:'IBM Plex Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}")
push(".mono{font-family:'IBM Plex Mono',ui-monospace,'SF Mono',Menlo,Consolas,monospace}")
push('@media (prefers-reduced-motion:reduce){*{animation:none!important}}')
push(css.join('\n'))
push('</style>')
push('<rect width="' + W + '" height="' + H + '" rx="10" fill="#000000" stroke="rgba(255,255,255,0.14)"/>')
push('<text x="' + PAD_X + '" y="22" font-size="10.5" letter-spacing="0.12em" fill="rgba(255,255,255,0.45)">A DAY IN PRODUCTION</text>')
push('<g transform="translate(' + PAD_X + ' ' + HEAD + ')">')

// the estate
push('<g class="dim">')
push('<rect x="' + (CTL_X-4) + '" y="' + (TOP+4) + '" width="' + (CTL_W+16) + '" height="' + (ctlY(3)+CTL_H-TOP+6) + '" rx="9" fill="rgba(255,255,255,0.012)" stroke="rgba(255,255,255,0.12)" stroke-dasharray="4 4"/>')
push('<text x="' + (CTL_X+2) + '" y="' + (TOP+17) + '" font-size="10.5" letter-spacing="0.08em" fill="rgba(255,255,255,0.45)">ALWAYS RUNNING</text>')
push('<text x="' + (CTL_X+2) + '" y="' + (TOP+30) + '" font-size="10.5" fill="rgba(255,255,255,0.28)">underneath every hour</text>')
ALWAYS.forEach((c, i) => {
  push('<rect x="' + CTL_X + '" y="' + ctlY(i) + '" width="' + CTL_W + '" height="' + CTL_H + '" rx="7" fill="rgba(255,255,255,0.022)" stroke="rgba(255,255,255,0.14)"/>')
  push('<text x="' + (CTL_X+9) + '" y="' + (ctlY(i)+20) + '" font-size="12.5" font-weight="500" fill="#EDEDEF">' + c.name + '</text>')
  push('<text x="' + (CTL_X+9) + '" y="' + (ctlY(i)+36) + '" font-size="10.5" fill="rgba(255,255,255,0.45)">' + esc(c.sub) + '</text>')
  push('<path d="M' + (CTL_X+CTL_W) + ' ' + (ctlY(i)+CTL_H/2) + ' H' + (NODE_X-16) + '" fill="none" stroke="rgba(255,255,255,0.18)" stroke-dasharray="3 3" marker-end="url(#h)"/>')
})
push('</g>')
// monitoring, once it is the thing that caught it
push('<g class="alert">')
push('<rect x="' + CTL_X + '" y="' + ctlY(0) + '" width="' + CTL_W + '" height="' + CTL_H + '" rx="7" fill="' + WASH + '" stroke="' + DANGER + '"/>')
push('<text x="' + (CTL_X+9) + '" y="' + (ctlY(0)+20) + '" font-size="12.5" font-weight="500" fill="' + DANGER + '">Monitor</text>')
push('<text x="' + (CTL_X+9) + '" y="' + (ctlY(0)+36) + '" font-size="10.5" fill="rgba(229,72,77,0.75)">Grafana · Datadog</text>')
push('<path d="M' + (CTL_X+CTL_W) + ' ' + (ctlY(0)+CTL_H/2) + ' H' + (NODE_X-16) + '" fill="none" stroke="' + DANGER + '" stroke-dasharray="3 3" marker-end="url(#hr)"/>')
push('</g>')

// the rail
push('<path class="dim" d="M' + RAIL_X + ' ' + (nodeY(0)+NODE_H/2) + ' V' + (nodeY(6)+NODE_H/2) + '" stroke="rgba(255,255,255,0.14)" fill="none"/>')
push('<path class="broken" d="M' + RAIL_X + ' ' + (ctlY(0)+CTL_H/2) + ' V' + (nodeY(BREAK)+NODE_H/2) + '" stroke="' + DANGER + '" stroke-width="1.5" fill="none"/>')

const glyphAt = (id, y, stroke) =>
  '<g transform="translate(' + (NODE_X+12) + ' ' + (y+(NODE_H-MARK)/2) + ') scale(' + (MARK/24).toFixed(4) + ')" fill="none" stroke="' + stroke + '" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
  GLYPH[id].map((d) => '<path d="' + d + '"/>').join('') + '</g>'

// the hours
DAY.forEach((n, i) => {
  const y = nodeY(i)
  const isBreak = i === BREAK
  push(isBreak ? '<g>' : '<g class="dim">')
  if (i > 0) {
    push('<path d="M' + (NODE_X+NODE_W/2) + ' ' + (nodeY(i-1)+NODE_H) + ' V' + (y-3) + '" stroke="rgba(255,255,255,0.18)" fill="none"' + (isBreak ? ' stroke-dasharray="3 3"' : '') + ' marker-end="url(#h)"/>')
  }
  // resting state
  push('<rect x="' + NODE_X + '" y="' + y + '" width="' + NODE_W + '" height="' + NODE_H + '" rx="8" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.14)"' + (isBreak ? ' stroke-dasharray="5 4"' : '') + '/>')
  push('<rect x="' + NODE_X + '" y="' + y + '" width="2.5" height="' + NODE_H + '" rx="1.2" fill="rgba(255,255,255,0.16)"/>')
  push(glyphAt(n.id, y, 'rgba(255,255,255,0.42)'))
  push('<text x="' + (NODE_X+41) + '" y="' + (y+19) + '" font-size="14" font-weight="500" fill="#EDEDEF">' + esc(n.name) + '</text>')
  push('<text class="mono" x="' + (NODE_X+41) + '" y="' + (y+33) + '" font-size="9.5" letter-spacing="0.07em" fill="rgba(255,255,255,0.32)">' + n.tag + '</text>')

  if (!isBreak) {
    // lit state, laid over the resting one
    push('<g class="lit' + i + '">')
    push('<rect x="' + NODE_X + '" y="' + y + '" width="' + NODE_W + '" height="' + NODE_H + '" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.46)"/>')
    push('<rect x="' + NODE_X + '" y="' + y + '" width="2.5" height="' + NODE_H + '" rx="1.2" fill="#FFFFFF"/>')
    push(glyphAt(n.id, y, '#FFFFFF'))
    push('<text x="' + (NODE_X+41) + '" y="' + (y+19) + '" font-size="14" font-weight="500" fill="#EDEDEF">' + esc(n.name) + '</text>')
    push('<text class="mono" x="' + (NODE_X+41) + '" y="' + (y+33) + '" font-size="9.5" letter-spacing="0.07em" fill="rgba(255,255,255,0.32)">' + n.tag + '</text>')
    push('<text x="' + (NODE_X+NODE_W-12) + '" y="' + (y+33) + '" text-anchor="end" font-size="10.5" fill="rgba(255,255,255,0.7)">' + esc(n.does) + '</text>')
    push('</g>')
  } else {
    // the one place the page spends colour
    push('<g class="broken"><rect x="' + NODE_X + '" y="' + y + '" width="' + NODE_W + '" height="' + NODE_H + '" rx="8" fill="' + WASH + '" stroke="' + LINE + '"/></g>')
    push('<g class="alert">')
    push('<rect x="' + NODE_X + '" y="' + y + '" width="' + NODE_W + '" height="' + NODE_H + '" rx="8" fill="' + WASH + '" stroke="' + DANGER + '"/>')
    push('<rect x="' + NODE_X + '" y="' + y + '" width="2.5" height="' + NODE_H + '" rx="1.2" fill="' + DANGER + '"/>')
    push(glyphAt(n.id, y, DANGER))
    push('<text x="' + (NODE_X+41) + '" y="' + (y+19) + '" font-size="14" font-weight="500" fill="#EDEDEF">' + esc(n.name) + '</text>')
    push('<text class="mono" x="' + (NODE_X+41) + '" y="' + (y+33) + '" font-size="9.5" letter-spacing="0.07em" fill="' + DANGER + '">' + n.tag + '</text>')
    push('<text x="' + (NODE_X+NODE_W-12) + '" y="' + (y+33) + '" text-anchor="end" font-size="10.5" fill="' + DANGER + '">contained first</text>')
    push('</g>')
  }
  push('</g>')
})

// where the day currently is
push('<g class="rail-dot"><circle cx="' + RAIL_X + '" cy="' + (nodeY(0)+NODE_H/2) + '" r="3.2" fill="#FFFFFF" filter="url(#glow)"/></g>')
push('<g class="broken"><g class="rail-dot"><circle cx="' + RAIL_X + '" cy="' + (nodeY(0)+NODE_H/2) + '" r="3.2" fill="' + DANGER + '" filter="url(#glow)"/></g></g>')

// the strip
push('<g class="dim"><circle class="dot-pulse" cx="' + (CTL_X+4) + '" cy="' + (STRIP_Y-4) + '" r="3" fill="rgba(255,255,255,0.55)"/></g>')
push('<g class="broken"><circle cx="' + (CTL_X+4) + '" cy="' + (STRIP_Y-4) + '" r="3" fill="' + DANGER + '"/></g>')

const status = [
  ['st_calm1','NOTHING ON FIRE','rgba(255,255,255,0.45)'],
  ['st_toil','TOIL REMOVED FROM THE WEEK','rgba(255,255,255,0.45)'],
  ['st_calm2','NOTHING ON FIRE','rgba(255,255,255,0.45)'],
  ['st_p1','P1 · CAUGHT BY MONITORING',DANGER],
  ['st_cont','P1 · CONTAINING',DANGER],
  ['st_done','CONTAINED · DAY RESUMES',DANGER],
  ['st_calm3','NOTHING ON FIRE','rgba(255,255,255,0.45)'],
]
status.forEach((s) => {
  push('<text class="' + s[0] + '" x="' + (CTL_X+15) + '" y="' + STRIP_Y + '" font-size="10.5" letter-spacing="0.08em" fill="' + s[2] + '">' + esc(s[1]) + '</text>')
})

// the readout, in whichever vocabulary the moment calls for
;['idle','idle2','idle3'].forEach((cls) => {
  push('<text class="mono ' + cls + '" x="' + (432-CTL_X) + '" y="' + STRIP_Y + '" text-anchor="end" font-size="10.5" fill="rgba(255,255,255,0.22)">--:--</text>')
})
HOURS.forEach((v, i) => push('<text class="mono hr' + i + '" x="' + (432-CTL_X) + '" y="' + STRIP_Y + '" text-anchor="end" font-size="10.5" fill="#EDEDEF">' + v + '</text>'))
CLOCK.forEach((v, i) => push('<text class="mono clk' + i + '" x="' + (432-CTL_X) + '" y="' + STRIP_Y + '" text-anchor="end" font-size="10.5" fill="' + DANGER + '">' + v + '</text>'))

// four slots: what watches, or what acts once the day breaks
WATCHING.forEach((label, i) => {
  push('<g class="dim">')
  push('<rect x="' + chipX(i) + '" y="' + (STRIP_Y+8) + '" width="' + CHIP_W + '" height="20" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)"/>')
  push('<text x="' + (chipX(i)+CHIP_W/2) + '" y="' + (STRIP_Y+22) + '" text-anchor="middle" font-size="11" fill="rgba(255,255,255,0.45)">' + label + '</text>')
  push('</g>')
})
CONTAINING.forEach((label, i) => {
  push('<g class="broken"><rect x="' + chipX(i) + '" y="' + (STRIP_Y+8) + '" width="' + CHIP_W + '" height="20" rx="5" fill="#000000" stroke="rgba(255,255,255,0.12)"/><text x="' + (chipX(i)+CHIP_W/2) + '" y="' + (STRIP_Y+22) + '" text-anchor="middle" font-size="11" fill="rgba(255,255,255,0.3)">' + label + '</text></g>')
  push('<g class="hold' + i + '"><rect x="' + chipX(i) + '" y="' + (STRIP_Y+8) + '" width="' + CHIP_W + '" height="20" rx="5" fill="' + WASH + '" stroke="' + LINE + '"/><text x="' + (chipX(i)+CHIP_W/2) + '" y="' + (STRIP_Y+22) + '" text-anchor="middle" font-size="11" fill="' + DANGER + '">' + label + '</text></g>')
})

push('</g></svg>')

fs.writeFileSync('public/day-map.svg', out.join('\n'))
console.log('wrote public/day-map.svg', fs.statSync('public/day-map.svg').size, 'bytes')
