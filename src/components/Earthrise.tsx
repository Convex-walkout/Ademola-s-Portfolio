import {useEffect, useRef, type ReactNode} from 'react';
import {hero} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {clamp, easeOutCubic, lerp, pinProgress, range} from '../lib/math';
import {onFrame} from '../lib/scroll';

/**
 * The hero. Six layers, stacked and pinned; one scroll range moves each at
 * its own rate:
 *
 *   0.00 – 0.18  a veil of cosmic dust drifts off the lens
 *   0.04 – 0.50  the Earth climbs out from behind the horizon
 *   0.10 – 0.50  the title resolves between the plains and the crater
 *   0.28 – 0.60  the crater rim closes in around the view, the figure and ground rise
 *   0.70 – 1.00  everything tilts away upward and the ground swallows the
 *                frame to black, which is where the page continues
 *
 * The layers are drawn as SVG (no raster assets), all sharing one 1600×900
 * viewBox and one crop so they stay registered at every viewport.
 */

const STAGE_VH = 440;

type LayerName = 'sky' | 'earth' | 'moonscape' | 'frame' | 'astronaut' | 'ground';
const ORDER: LayerName[] = ['sky', 'earth', 'moonscape', 'frame', 'astronaut', 'ground'];

const SVG_PROPS = {
  viewBox: '0 0 1600 900',
  preserveAspectRatio: 'xMidYMid slice',
  className: 'absolute inset-0 size-full',
  'aria-hidden': true,
} as const;

const STARS = Array.from({length: 120}, (_, i) => ({
  x: (i * 211) % 1600,
  y: (i * 131) % 620,
  r: i % 9 === 0 ? 1.6 : 0.8,
  o: 0.25 + ((i * 53) % 60) / 100,
}));

const ART: Record<LayerName, ReactNode> = {
  sky: (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id="sky-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#03050a" />
          <stop offset="0.75" stopColor="#0f1a30" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#sky-g)" />
      <g fill="#fff">
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} opacity={s.o} />
        ))}
      </g>
    </svg>
  ),
  earth: (
    <svg {...SVG_PROPS}>
      <defs>
        <radialGradient id="eh-glow">
          <stop offset="0.7" stopColor="#6fb6ff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#6fb6ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="eh-disc" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#a9d6ff" />
          <stop offset="0.5" stopColor="#3f86d6" />
          <stop offset="1" stopColor="#0e2a55" />
        </radialGradient>
        <radialGradient id="eh-shade" cx="30%" cy="30%" r="85%">
          <stop offset="0.45" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.6" />
        </radialGradient>
        <clipPath id="eh-clip">
          <circle cx="900" cy="520" r="170" />
        </clipPath>
      </defs>
      <circle cx="900" cy="520" r="250" fill="url(#eh-glow)" />
      <circle cx="900" cy="520" r="170" fill="url(#eh-disc)" />
      <g clipPath="url(#eh-clip)" fill="#fff" opacity="0.38">
        <ellipse cx="840" cy="450" rx="90" ry="14" />
        <ellipse cx="930" cy="500" rx="110" ry="16" />
        <ellipse cx="860" cy="560" rx="80" ry="12" />
        <ellipse cx="950" cy="610" rx="70" ry="10" />
      </g>
      <circle cx="900" cy="520" r="170" fill="url(#eh-shade)" />
    </svg>
  ),
  moonscape: (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id="ms-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b909b" />
          <stop offset="1" stopColor="#2a2e36" />
        </linearGradient>
      </defs>
      <path d="M0 640 C 220 590 420 612 640 596 S 1100 578 1300 600 S 1520 592 1600 602 L1600 900 L0 900Z" fill="url(#ms-g)" />
      <g fill="none" stroke="#1a1d24" strokeOpacity="0.5" strokeWidth="2">
        <ellipse cx="300" cy="700" rx="120" ry="18" />
        <ellipse cx="1180" cy="690" rx="150" ry="20" />
        <ellipse cx="760" cy="740" rx="90" ry="12" />
      </g>
    </svg>
  ),
  frame: (
    <svg {...SVG_PROPS}>
      <g fill="#0a0c11">
        <path d="M0 0 L300 0 C 200 200 120 420 0 560Z" />
        <path d="M1600 0 L1260 0 C 1380 220 1480 420 1600 540Z" />
        <path d="M0 0 H1600 V60 C 1100 110 500 110 0 60Z" />
      </g>
    </svg>
  ),
  astronaut: (
    <svg {...SVG_PROPS}>
      <ellipse cx="700" cy="772" rx="130" ry="30" fill="#14171e" />
      <g fill="#07090d" stroke="#c9ccd3" strokeOpacity="0.3" strokeWidth="1.5">
        <rect x="650" y="614" width="22" height="64" rx="8" />
        <rect x="672" y="602" width="56" height="92" rx="22" />
        <rect x="678" y="690" width="18" height="72" rx="6" />
        <rect x="704" y="690" width="18" height="72" rx="6" />
        <circle cx="702" cy="578" r="27" />
      </g>
      <ellipse cx="712" cy="578" rx="14" ry="11" fill="#6fb6ff" opacity="0.3" />
    </svg>
  ),
  ground: (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id="gr-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#262a33" />
          <stop offset="1" stopColor="#0b0d12" />
        </linearGradient>
      </defs>
      <path d="M0 800 C 400 772 900 792 1600 762 L1600 900 L0 900Z" fill="url(#gr-g)" />
    </svg>
  ),
};

type Mote = {x: number; y: number; r: number; s: number; a: number};

export function Earthrise() {
  const rootRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<Partial<Record<LayerName, HTMLDivElement>>>({});
  const veilRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLParagraphElement>(null);
  const elevRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  // Dust canvas size.
  useEffect(() => {
    const c = dustRef.current!;
    const sync = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = dustRef.current!;
    const ctx = canvas.getContext('2d')!;
    let seed = 11;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const motes: Mote[] = Array.from({length: 140}, () => ({x: rand(), y: rand(), r: 0.4 + rand() * 1.6, s: 0.3 + rand(), a: 0.2 + rand() * 0.6}));
    let lastP = -1;
    let lastTime = 0;

    const set = (name: LayerName, y: number, scale = 1, opacity = 1) => {
      const el = layerRefs.current[name];
      if (!el) return;
      el.style.transform = `translate3d(0, ${y}vh, 0) scale(${scale})`;
      el.style.opacity = String(opacity);
    };

    return onFrame((time) => {
      const dt = lastTime ? Math.min(0.1, (time - lastTime) / 1000) : 1 / 60;
      lastTime = time;
      const root = rootRef.current;
      if (!root) return;
      const {p, rect} = pinProgress(root);
      if (rect.bottom < 0) return;

      // Dust drifts every frame while it's visible.
      const veil = 1 - range(p, 0, 0.18);
      if (veil > 0.001) {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        const dpr = canvas.width / Math.max(1, w);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#dfe6f2';
        for (const m of motes) {
          if (!reducedRef.current) {
            m.x += 0.006 * m.s * dt;
            m.y -= 0.004 * m.s * dt;
            if (m.x > 1) m.x -= 1;
            if (m.y < 0) m.y += 1;
          }
          ctx.globalAlpha = m.a * veil;
          ctx.beginPath();
          ctx.arc(m.x * w, (m.y - p * 0.6) * h, m.r * (1 + p * 4), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      if (Math.abs(p - lastP) < 0.00005) return;
      lastP = p;

      const exit = range(p, 0.7, 1);
      const settle = easeOutCubic(range(p, 0, 0.5));

      // Veil clears upward.
      veilRef.current!.style.opacity = String(veil);
      veilRef.current!.style.transform = `translate3d(0, ${-range(p, 0, 0.18) * 24}vh, 0) scale(${1 + range(p, 0, 0.18) * 0.25})`;
      canvas.style.opacity = String(veil);

      // Far → near, each faster than the one behind it.
      set('sky', lerp(0, -6, p), lerp(1.14, 1, settle));
      const rise = easeOutCubic(range(p, 0.04, 0.5));
      set('earth', lerp(34, 0, rise) - exit * 12, lerp(0.92, 1, rise));
      set('moonscape', lerp(9, 0, settle) - exit * 26);
      const rim = easeOutCubic(range(p, 0.28, 0.58));
      set('frame', -exit * 44, lerp(1.6, 1, rim), rim);
      const up = easeOutCubic(range(p, 0.36, 0.62));
      set('astronaut', lerp(28, 0, up) - exit * 58, 1, clamp(up * 2));
      const ground = easeOutCubic(range(p, 0.34, 0.6));
      set('ground', lerp(36, 0, ground) - exit * 78);

      // Title: resolves (tracking closes in), then yields to the crater.
      const tIn = easeOutCubic(range(p, 0.08, 0.24));
      const tOut = range(p, 0.42, 0.52);
      const title = titleRef.current!;
      title.style.opacity = String(tIn * (1 - tOut));
      title.style.letterSpacing = `${lerp(0.4, 0.06, tIn)}em`;
      title.style.transform = `translate3d(0, ${-p * 6}vh, 0)`;
      title.style.filter = tIn < 0.99 ? `blur(${(1 - tIn) * 10}px)` : '';

      // Telemetry.
      hudRef.current!.style.opacity = String(range(p, 0.02, 0.1) * (1 - range(p, 0.62, 0.72)));
      const secs = p * 5400;
      clockRef.current!.textContent = `T+ ${String(Math.floor(secs / 3600)).padStart(2, '0')}:${String(Math.floor((secs % 3600) / 60)).padStart(2, '0')}:${String(Math.floor(secs % 60)).padStart(2, '0')}`;
      elevRef.current!.textContent = `${(rise * 12.4).toFixed(1)}°`;
    });
  }, []);

  const layer = (name: LayerName) => (
    <div
      key={name}
      ref={(el) => {
        if (el) layerRefs.current[name] = el;
      }}
      className="absolute inset-0 will-change-transform"
    >
      {ART[name]}
      {/* The ground carries a black apron below it, so when it climbs it
          fills the screen and hands straight over to the page below. */}
      {name === 'ground' && <div className="absolute inset-x-0 top-full h-[110vh] bg-void" />}
    </div>
  );

  return (
    <section id="top" ref={rootRef} aria-label="Introduction" className="relative" style={{height: `${STAGE_VH}svh`}}>
      <div className="sticky top-0 h-screen-s overflow-hidden bg-void">
        {ORDER.slice(0, 3).map((n) => layer(n))}

        {/* Title sits between the plains and the crater. */}
        <div ref={titleRef} className="pointer-events-none absolute inset-x-0 top-[22%] text-center md:top-[26%]" style={{opacity: 0}}>
          <h1 className="font-display text-hero text-white [text-shadow:0_4px_40px_rgb(0_0_0/0.5)]" style={{marginRight: '-0.06em'}}>
            {hero.title}
          </h1>
          <p className="mt-4 font-mono text-label text-regolith/80 uppercase">{hero.kicker}</p>
        </div>

        {ORDER.slice(3).map((n) => layer(n))}

        {/* Cosmic dust on the lens. */}
        <div
          ref={veilRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 30% 40%, rgba(170,184,210,0.55), transparent 70%), radial-gradient(50% 60% at 75% 60%, rgba(120,140,180,0.5), transparent 70%), radial-gradient(80% 80% at 50% 50%, rgba(20,26,40,0.85), rgba(5,7,12,0.95))',
          }}
        >
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
            <p className="font-mono text-label text-regolith/80 uppercase">{hero.kicker}</p>
            <p className="mt-3 text-[0.8125rem] font-semibold tracking-[0.2em] text-white/90 uppercase" style={{marginRight: '-0.2em'}}>
              Scroll to clear the dust
            </p>
            <span aria-hidden="true" className="mt-6 inline-block animate-bounce text-regolith/70 motion-reduce:animate-none">
              ↓
            </span>
          </div>
        </div>
        <canvas ref={dustRef} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />

        {/* Telemetry HUD. */}
        <div ref={hudRef} aria-hidden="true" className="pointer-events-none absolute inset-4 font-mono text-[0.625rem] tracking-[0.06em] text-regolith/75 uppercase sm:inset-6 md:text-label" style={{opacity: 0}}>
          <div className="brackets absolute inset-0 text-regolith/40" />
          <div className="absolute top-16 left-3 space-y-1 md:top-20 md:left-4">
            <p ref={clockRef}>T+ 00:00:00</p>
            <p className="text-regolith/50">Mission clock</p>
          </div>
          <div className="absolute top-16 right-3 space-y-1 text-right md:top-20 md:right-4">
            <p>
              Altitude <span ref={elevRef} className="text-earth">0.0°</span>
            </p>
            <p className="text-regolith/50">Above horizon</p>
          </div>
          <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">{hero.site}</div>
          <div className="absolute right-3 bottom-3 flex items-center gap-2 md:right-4 md:bottom-4">
            Scroll <span className="inline-block animate-bounce motion-reduce:animate-none">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
