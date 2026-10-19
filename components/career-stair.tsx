"use client"

/**
 * How I got here — the climb, drawn as the climb.
 *
 * The globe this replaces answered a question nobody asks a CV: *where*.
 * Two dots and a great circle are a travel story, and the distance between
 * Karachi and Göttingen is the least interesting thing about seven years of
 * the same job getting bigger. So the figure answers the question the section
 * actually asks — how did he get *here*, from a helpdesk to an estate — and
 * the geography survives as one dashed line where it belongs: a tick on the
 * x axis, in 2023, between two countries.
 *
 * It is a step plot, which is the honest shape of this career: nothing about
 * it was a smooth curve. Each job is a riser — a jump to a layer he had not
 * owned before — then a tread, the stretch where he actually ran it.
 *
 * One thing is encoded, and one only: height is the layer of the stack he was
 * responsible for. Eight rungs, each a thing you cannot skip, because you do
 * not harden a cloud you have never run.
 *
 * Two other encodings were tried here and both were taken out, which is worth
 * writing down so neither comes back:
 *
 *   thickness for how many people depended on it — a second scale to learn
 *   before you can read the first, paid for in legibility and returning
 *   almost nothing. Three things at once is a key to study, not a figure.
 *
 *   a line that began crooked and red and straightened into white as the
 *   years went on. It was handsome, and it argued something false: that the
 *   work arrives at *finished*, and that the man running it now has it
 *   perfect. Nobody does, and he would not claim it. An engineer is learning
 *   on the last rung exactly as he was on the first — the only honest thing
 *   that changed is how far up the stack he is trusted with, and the plot
 *   already says that with its shape.
 *
 * So: one clean line, going up, and a dashed step past the end because the
 * ladder does not stop at the rung he is on. The filled region underneath is
 * the quiet claim — everything below the line is still his, and taking on the
 * cloud never meant putting down the network.
 *
 * The figure is complete and correct in its first frame, with animation off,
 * and on paper. The motion only restates what the drawing already says: the
 * steps arrive in order, and a light climbs the flight on a loop, because the
 * climb is still going.
 */

/*
  The drawing already fills the card from edge to edge, so the only way left
  to make it bigger on screen is to stop spending viewBox units on nothing:
  what a label measures in pixels is its size in these units times (box width
  / W), and every unit of margin inside W shrinks everything in it.

  The gutter held 130 units for axis names that are 82 wide, and the tail
  past the plot held 95 for a dashed step that needs 55. Giving both back
  takes W from 960 to 888 and scales the whole figure up by eight per cent
  without moving a single thing relative to anything else — the steps are
  still 105 wide, so every label still finishes inside its own tread.
*/
const W = 888
const H = 444

/** The plot floor, and one rung per layer above it. */
const Y0 = 386
const ROW = 38
/* The gutter has to hold the longest rung name at 8.5px, or the axis reads
   as a column of half-words. STEP_W gives back exactly what X0 takes, so the
   plot still ends where the dashed step has room to climb off it. */
const X0 = 92
/* Wider columns are what buy the long names their margin: the gutter only
   needs to clear the longest rung label, and every unit taken off it goes
   straight into the seven steps. */
const STEP_W = 107
const STEPS_N = 7
const PLOT_R = X0 + STEP_W * STEPS_N
/** One clock for the whole figure, matching the hero's slow pulse. */
const BEAT = 6.4

const y = (layer: number) => Y0 - layer * ROW
const xAt = (i: number) => X0 + STEP_W * i
/**
 * ── A label belongs to its own step ──
 *
 * Each name and number is set from this inset past its knee, and the type is
 * sized so that even the longest of them — ACTIVE SOLUTIONS, TARGET LOGISTICS
 * — finishes with room to spare before the tread it sits under ends. Those
 * two set the size for all seven: a name that stops exactly on the line
 * reads as a name that ran out of room, even when it technically fits. That is what makes
 * the seven read as one column of equal blocks instead of seven captions of
 * whatever width their company happened to have: the text never leaves the
 * step it describes, so the eye can take the whole flight as a list.
 */
const LABEL_X = 5.5
/** The middle of a year's column, for the tick under the axis. */
const midAt = (i: number) => xAt(i) + STEP_W / 2

/**
 * ── The rungs ──
 *
 * This is not a word cloud of things he can do. It is the ladder the whole
 * trade has climbed over the last ten years, in the order it climbed it: the
 * help desk became sysadmin work, sysadmin work became the network, the
 * network became fleets of endpoints you never touch, those moved to cloud
 * and identity, that got scripted into infrastructure as code, which turned
 * into pipelines, and the thing every one of those is now judged by is
 * whether an attacker can get in. Each rung is a thing you have to be handed
 * before you are handed the next — you do not harden a cloud you have never
 * run — which is why the order is arguable only at the margins, and why his
 * line never goes down.
 *
 * The ninth rung is the one he has not been handed yet, and it is drawn
 * dashed because of it. It is also the only reason the rest of the figure is
 * worth drawing: an estate that runs itself, where the first line is
 * answered before a person is involved, nothing is done by hand twice, and
 * nothing gets in. Everything below it is how far he has come toward it.
 */
/* Kept to the length the gutter can hold at this size, in the trade's own
   shorthand — the longer spellings ran into the axis they label. */
const LAYERS = [
  "HELP DESK",
  "SYSADMIN · AD",
  "NETWORKING",
  "ENDPOINTS",
  "CLOUD · IAM",
  "AUTOMATION",
  "DEVOPS · CI/CD",
  "ZERO TRUST",
  "AUTONOMOUS OPS",
]
/** The rung he is climbing to, not one he has stood on. */
const AHEAD = LAYERS.length

type Step = {
  year: string
  /** Which rung this job put him on. */
  layer: number
  where: string
  /** The one number from that year worth standing behind. */
  metric: string
  now?: boolean
}

const STEPS: Step[] = [
  { year: "2019", layer: 2, where: "ACTIVE SOLUTIONS", metric: "30% FEWER FAULTS" },
  { year: "2020", layer: 3, where: "TARGET LOGISTICS", metric: "40% FASTER FIXES" },
  { year: "2021", layer: 4, where: "KTDMC", metric: "265 ENDPOINTS" },
  { year: "2022", layer: 5, where: "LIBERTY BOOKS", metric: "3 OS · MANY SITES" },
  { year: "2023", layer: 6, where: "TESTSOLUTIONS", metric: "12 COUNTRIES" },
  { year: "2024", layer: 7, where: "UNI GÖTTINGEN", metric: "4H → 35MIN" },
  { year: "NOW", layer: 8, where: "KONTINENTAL", metric: "ZERO BREACHES", now: true },
]

/** The step he took countries on, so the move is a tick rather than a map. */
const BORDER_I = 4

/** One job's run of the line: up the riser, then across the tread. */
const legD = (i: number) =>
  `M${xAt(i)} ${i === 0 ? Y0 : y(STEPS[i - 1].layer)} V${y(STEPS[i].layer)} H${xAt(i + 1)}`

/** The whole flight, for the fill and for the light that walks it. */
const FLIGHT = (() => {
  let d = `M${X0} ${Y0}`
  STEPS.forEach((s, i) => {
    d += ` V${y(s.layer)} H${xAt(i + 1)}`
  })
  return d
})()

/**
 * ── One clock, and everything on it ──
 *
 * The hero runs on a single beat: the comb falls, the method lights a step at
 * a time, and a band of light crosses the finished estate while each thing
 * hanging off it brightens as the light arrives. This figure is the same
 * machine on the same kind of clock, which is what makes the two read as one
 * engineer's sheet rather than two drawings sharing a palette.
 *
 * So the light here does not drift over the figure — it walks the flight,
 * riser by riser, from the first job to the current one, and everything it
 * passes answers it. Which means every lit thing has to know how far along
 * the flight it sits, in beats. That is geometry, so it is measured once.
 */
const SPANS = STEPS.map((s, i) => ({
  rise: Math.abs((i === 0 ? Y0 : y(STEPS[i - 1].layer)) - y(s.layer)),
  run: STEP_W,
}))
const FLIGHT_LEN = SPANS.reduce((n, l) => n + l.rise + l.run, 0)

/** Distance along the flight to the foot of each riser, and to each tread. */
const MARKS = (() => {
  let run = 0
  return SPANS.map((l) => {
    const foot = run
    run += l.rise
    const tread = run
    run += l.run
    return { foot, tread }
  })
})()

/**
 * How far in front of its own animation the light actually is.
 *
 * Nothing, now. The lit length used to run on a dash pattern that summed to
 * the whole path, so it wrapped: the first frame of every beat already had
 * the light sitting 8.5% up the flight, on the first company, instead of
 * growing out of the floor — the jump that read as a glitch at the start.
 * The dash now has a gap longer than the path, so it grows from the origin
 * and its front edge is exactly the animation's own progress.
 */
const HEAD_LEAD = 0

/**
 * And the climb only occupies the first 80% of the beat — the rest is the
 * pause at the top, while the marker there reports the arrival. So a point
 * four tenths of the way up the flight is not reached four tenths of the way
 * through the beat; it is reached four tenths of the way through the climbing
 * part of it. Both numbers have to match `.flight-trail` in the stylesheet.
 */
const CLIMB_PART = 0.8

const beatAt = (dist: number) =>
  (((dist / FLIGHT_LEN - HEAD_LEAD) / (1 - HEAD_LEAD)) * CLIMB_PART * BEAT).toFixed(2)

export function CareerStair() {
  return (
    <div className="space-y-10">
      <div className="card overflow-hidden">
        <div className="stair-card p-5 sm:p-7">
          <span className="eyebrow">2016 → now</span>
          <h3
            className="mt-3 font-semibold"
            style={{ fontSize: 26, lineHeight: 1.2, color: "var(--text)" }}
          >
            Every step up, nothing put down
          </h3>
          <p
            className="mt-3 max-w-2xl text-sm"
            style={{ lineHeight: 1.7, color: "var(--text-dim)" }}
          >
            The rungs are the ones the whole trade has climbed in ten years, in the order it
            climbed them. The dashed one at the top is where I am going: infrastructure that
            runs itself, AI on the first line, and nothing getting in.
          </p>

          {/* Narrow screens scroll the figure rather than shrink its labels
              into decoration: a plot you cannot read the axis of is a texture. */}
          <div className="stair-scroll mt-7">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="xMinYMid meet"
              className="stair-svg"
              role="img"
              aria-label="A step plot of seven years. The vertical axis is the layer of the stack I was responsible for, eight rungs from help desk at the bottom up through servers and identity, network, endpoints at scale, cloud, automation, CI/CD and machine-learning platforms, to zero trust security at the top of the ones I have stood on, and above that a ninth rung drawn dashed, autonomous operations, which I have not been handed yet and am climbing toward. The horizontal axis runs 2019 to now. The line starts on the floor at a 2016 bachelors in computational mathematics in Karachi and rises one rung per job — Active Solutions, Target Logistics, KTDMC, Liberty Books, TestSolutions, the University of Göttingen, and Kontinental Establishment now — never falling. The whole area beneath it is filled, because every layer below the current one is still mine. A dashed line at 2023 marks the move from Pakistan to Germany, and a dashed step past the end climbs onto that ninth rung: infrastructure that runs itself, AI answering the first line, and nothing getting in."
            >
              <defs>
                {/* Below the line is the ground he still holds. */}
                <linearGradient id="stairGround" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.022" />
                </linearGradient>
                <filter id="stairBloom" x="-20%" y="-300%" width="140%" height="700%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker
                  id="stairHead"
                  markerWidth="5"
                  markerHeight="5"
                  refX="2.5"
                  refY="4.6"
                  orient="auto"
                >
                  <path d="M2.5 0 L5 5 L0 5 z" fill="rgba(255,255,255,0.65)" />
                </marker>
              </defs>

              {/* ── The rungs, and what each one is called ── */}
              {LAYERS.map((name, i) => {
                const ly = y(i + 1)
                const ahead = i + 1 === AHEAD
                return (
                  <g key={name}>
                    <path
                      d={`M${X0} ${ly} H${PLOT_R}`}
                      stroke={ahead ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.055)"}
                      strokeWidth="1"
                      strokeDasharray={ahead ? "3 5" : undefined}
                    />
                    <text
                      className="mono"
                      x={6}
                      y={ly + 3}
                      textAnchor="start"
                      fontSize="8.2"
                      letterSpacing="0.07em"
                      fill={ahead ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.4)"}
                    >
                      {name}
                    </text>
                  </g>
                )
              })}

              <text
                className="mono"
                x={6}
                y={y(AHEAD) - 22}
                textAnchor="start"
                fontSize="8.5"
                letterSpacing="0.14em"
                fill="rgba(255,255,255,0.3)"
              >
                LAYER I RUN
              </text>

              {/* ── The ground he keeps ── */}
              <path
                className="stair-ground"
                d={`${FLIGHT} V${Y0} Z`}
                fill="url(#stairGround)"
                stroke="none"
              />

              {/* ── The flight, one job at a time ── */}
              {STEPS.map((s, i) => {
                const ya = y(s.layer)
                /* A negative delay, so the figure is already at the right
                   point of the beat on its first frame rather than waiting a
                   whole turn for it. The trick the hero runs its comb on. */
                const atTread = `${(Number(beatAt(MARKS[i].tread)) - BEAT).toFixed(2)}s`
                return (
                  <g
                    key={s.year}
                    className="stair-step"
                    style={{ animationDelay: `${0.06 + i * 0.095}s` }}
                  >
                    {/* One line, one weight, all the way up. The only thing
                        that changes from the first job to the current one is
                        how high it is, which is the one thing that is true. */}
                    <path
                      className="stair-in"
                      style={{ animationDelay: `${0.06 + i * 0.095}s` }}
                      pathLength={1}
                      d={legD(i)}
                      stroke={s.now ? "var(--accent)" : "rgba(255,255,255,0.74)"}
                      strokeWidth={s.now ? 2 : 1.7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />

                    {/*
                      The knee — where one job became the next, flaring as the
                      light arrives, because that is the moment.

                      The current step does not get one. Its left corner is
                      just another handover, and marking it put two dots on
                      the same tread competing to be "here". There is one
                      marker for that, at the far end of the line, and it is
                      the only thing on this figure that reports an arrival.
                    */}
                    {!s.now && (
                      <>
                        <circle
                          className="stair-knee"
                          style={{ animationDelay: `${0.12 + i * 0.095}s` }}
                          cx={xAt(i)}
                          cy={ya}
                          r="2.6"
                          fill="var(--bg-card)"
                          stroke="rgba(255,255,255,0.7)"
                          strokeWidth="1.2"
                        />
                        <circle
                          className="knee-flare"
                          style={{ animationDelay: atTread }}
                          cx={xAt(i)}
                          cy={ya}
                          r="2.6"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="1.4"
                          filter="url(#stairBloom)"
                        />
                      </>
                    )}

                    {/*
                      The job answers the light, the way each thing on the
                      hero's backbone brightens as the sweep reaches it.

                      Every one of these labels sits where something else is
                      already drawn — the rung guides run under all of them
                      and the dashed border at 2023 runs straight down through
                      two. A line through a word cuts the word, so each label
                      is knocked out the width of its own stroke and the lines
                      pass behind it and carry on. The run stays continuous,
                      the words stay whole; it is how a drawing sheet has
                      always handled a wire crossing a callout.
                    */}
                    <g className="stair-pass" style={{ animationDelay: atTread }}>
                      <text
                        className="mono"
                        x={xAt(i) + LABEL_X}
                        y={ya + 17}
                        textAnchor="start"
                        fontSize="9.3"
                        letterSpacing="0.015em"
                        fill="rgba(255,255,255,0.88)"
                        stroke="var(--bg-card)"
                        strokeWidth="2.8"
                        strokeLinejoin="round"
                        paintOrder="stroke"
                      >
                        {s.where}
                      </text>
                      <text
                        className="mono"
                        x={xAt(i) + LABEL_X}
                        y={ya + 31}
                        textAnchor="start"
                        fontSize="8.6"
                        letterSpacing="0.025em"
                        fill="rgba(255,255,255,0.52)"
                        stroke="var(--bg-card)"
                        strokeWidth="2.6"
                        strokeLinejoin="round"
                        paintOrder="stroke"
                      >
                        {s.metric}
                      </text>
                    </g>
                  </g>
                )
              })}

              {/*
                ── The thing that climbs ──

                Not a figure walking up. A person drawn here would be the one
                illustration in a sheet of schematics, and the moment you draw
                a little man on a plot you are making a cartoon of a career
                rather than plotting one.

                It is a light, and it climbs the stairs that are drawn: a lit
                length of the flight travelling riser by riser with a bright
                head at the front of it. Same beat as the hero's sweep, same
                bloom, same argument — the work is live, it is still going up,
                and it has not finished.
              */}
              {/*
                ── One clock, not two ──

                The head used to be a circle carried along the path by SMIL
                while the lit length behind it was a CSS dash animation. Two
                animations of the same duration, started by two different
                engines at two different moments: they drift, and once they
                have drifted the dot is no longer at the front of its own
                trail. Matching the durations does not fix that, because the
                problem was never the speed — it was the start.

                So there is no second engine. The head is the same path as
                the trail, drawn again with a dash so short and a stroke so
                round that it reads as a dot, running the same keyframes.
                Its one negative delay places it exactly at the leading edge
                of the lit length: the trail's dash is 8.5% of the climb
                long, the head's is a sliver, and advancing the head by half
                the difference puts its centre on the trail's front edge and
                keeps it there for good. Same animation, same start, same
                tick — they cannot come apart.
              */}
              <path
                className="flight-trail"
                d={FLIGHT}
                pathLength={1}
                stroke="#FFFFFF"
                strokeWidth="2.6"
                strokeLinecap="round"
                fill="none"
                filter="url(#stairBloom)"
              />
              <path
                className="flight-dot"
                d={FLIGHT}
                pathLength={1}
                stroke="#FFFFFF"
                strokeWidth="7.2"
                strokeLinecap="round"
                fill="none"
                filter="url(#stairBloom)"
              />

              {/*
                ── Where he is, and when it says so ──

                The knee at the left of the top tread is where this job began.
                Where he actually *is* is the other end of that line — the
                last point the climb has reached — so that is where the marker
                sits, on the junction between the tread he is on and the
                dashed step he has not taken.

                And it does not pulse on a clock of its own. It answers the
                light: the head of the climb reaches this point at 91.5% of
                the beat, so the marker is dark until then and flares exactly
                as the light lands on it. Arriving is the event; the blink is
                the report of it, not decoration running beside it.
              */}
              <circle
                className="now-core"
                cx={PLOT_R}
                cy={y(AHEAD - 1)}
                r="3.2"
                fill="var(--accent)"
                stroke="var(--accent)"
                strokeWidth="1.2"
                filter="url(#stairBloom)"
              />
              <circle
                className="now-ring"
                cx={PLOT_R}
                cy={y(AHEAD - 1)}
                r="3.2"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.4"
                filter="url(#stairBloom)"
              />
              <circle
                className="now-ring-2"
                cx={PLOT_R}
                cy={y(AHEAD - 1)}
                r="3.2"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1"
              />

              {/* ── 2016: where the floor is ── */}
              <circle cx={X0} cy={Y0} r="2.4" fill="rgba(255,255,255,0.55)" />
              <text
                className="mono"
                x={X0 + 8}
                y={Y0 - 10}
                fontSize="8.5"
                letterSpacing="0.08em"
                fill="rgba(255,255,255,0.42)"
                stroke="var(--bg-card)"
                strokeWidth="3"
                strokeLinejoin="round"
                paintOrder="stroke"
              >
                2016 · B.Sc COMPUTATIONAL MATHS, KARACHI
              </text>

              {/* ── The border, as one line on the axis ── */}
              <path
                d={`M${xAt(BORDER_I)} ${y(8) - 8} V${Y0}`}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              <text
                className="mono"
                x={xAt(BORDER_I) + 7}
                y={Y0 - 10}
                fontSize="8.5"
                letterSpacing="0.08em"
                fill="rgba(255,255,255,0.45)"
                stroke="var(--bg-card)"
                strokeWidth="3"
                strokeLinejoin="round"
                paintOrder="stroke"
              >
                5,617 km · KARACHI → GÖTTINGEN
              </text>

              {/*
                ── And where it is going ──

                The same shape as every other step on the plot — a riser, then
                a tread — because it is the same kind of move, just one he has
                not made yet. It is dashed for exactly that reason, and it
                lands on a rung that is named on the axis like all the others,
                so the figure ends on the work rather than on an arrow into
                empty space.
              */}
              <path
                className="stair-next"
                d={`M${PLOT_R} ${y(AHEAD - 1)} V${y(AHEAD)} H${W - 28}`}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.4"
                strokeDasharray="4 4"
                fill="none"
                markerEnd="url(#stairHead)"
              />
              <text
                className="mono"
                x={W - 6}
                y={y(AHEAD) - 12}
                textAnchor="end"
                fontSize="9"
                letterSpacing="0.1em"
                fill="rgba(255,255,255,0.6)"
              >
                NEXT · IT RUNS ITSELF, AI TAKES THE FIRST LINE, NOTHING GETS IN
              </text>

              {/* ── The floor, the years, and the two countries ── */}
              <path d={`M${X0} ${Y0} H${PLOT_R}`} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              {STEPS.map((s, i) => (
                <text
                  key={`yr-${s.year}`}
                  className="mono"
                  x={midAt(i)}
                  y={Y0 + 18}
                  textAnchor="middle"
                  fontSize="9.5"
                  letterSpacing="0.08em"
                  fill={s.now ? "var(--accent)" : "rgba(255,255,255,0.5)"}
                >
                  {s.year}
                </text>
              ))}

              <path
                d={`M${X0} ${Y0 + 30} H${xAt(BORDER_I) - 5}`}
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1"
              />
              <path
                d={`M${xAt(BORDER_I) + 5} ${Y0 + 30} H${PLOT_R}`}
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1"
              />
              <text
                className="mono"
                x={(X0 + xAt(BORDER_I)) / 2}
                y={Y0 + 43}
                textAnchor="middle"
                fontSize="8.5"
                letterSpacing="0.16em"
                fill="rgba(255,255,255,0.34)"
              >
                PAKISTAN
              </text>
              <text
                className="mono"
                x={(xAt(BORDER_I) + PLOT_R) / 2}
                y={Y0 + 43}
                textAnchor="middle"
                fontSize="8.5"
                letterSpacing="0.16em"
                fill="rgba(255,255,255,0.34)"
              >
                GERMANY
              </text>
            </svg>
          </div>

          <p className="stair-hint mono">Swipe the figure →</p>

          {/* One scale, said in one line. A figure that needs more key than
              this is a figure that has stopped working. */}
          <p className="stair-key">
            <span className="mono">HEIGHT</span> the layer of the stack I was responsible for
            <span className="stair-key-sep">·</span>
            <span className="mono">FILL</span> still mine
          </p>

        </div>
      </div>
    </div>
  )
}
