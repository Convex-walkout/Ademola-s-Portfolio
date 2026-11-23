import type {ReactNode} from 'react';

/**
 * Hand-drawn mockups of each project, one per reel frame. Every one shares a
 * 300×400 viewBox so they crop identically in the 3:4 frame.
 */

const SVG = {
  viewBox: '0 0 300 400',
  preserveAspectRatio: 'xMidYMid slice',
  className: 'size-full',
  'aria-hidden': true,
} as const;

const F = 'Inter, system-ui, sans-serif';

function Oakwood() {
  return (
    <svg {...SVG}>
      <rect width="300" height="400" fill="#0e1a14" />
      {/* Browser window */}
      <rect x="22" y="38" width="256" height="324" rx="8" fill="#f6f1e4" />
      <rect x="22" y="38" width="256" height="20" rx="8" fill="#dcd5c0" />
      <rect x="22" y="50" width="256" height="8" fill="#dcd5c0" />
      <g fill="#b9b19a">
        <circle cx="34" cy="48" r="3" />
        <circle cx="44" cy="48" r="3" />
        <circle cx="54" cy="48" r="3" />
      </g>
      {/* Site nav */}
      <rect x="22" y="58" width="256" height="24" fill="#1f4d36" />
      <text x="32" y="74" fontFamily={F} fontWeight="700" fontSize="9" fill="#f6f1e4" letterSpacing="1">
        OAKWOOD ACADEMY
      </text>
      <g fill="#cfe3d5" opacity="0.8">
        <rect x="186" y="68" width="16" height="3" rx="1.5" />
        <rect x="208" y="68" width="16" height="3" rx="1.5" />
        <rect x="230" y="68" width="16" height="3" rx="1.5" />
      </g>
      {/* Hero: school building */}
      <rect x="22" y="82" width="256" height="118" fill="#cfe3d5" />
      <circle cx="238" cy="106" r="14" fill="#f2d77a" />
      <path d="M22 200 V176 C 80 164 200 164 278 178 V200Z" fill="#7fae8c" />
      <g>
        <rect x="96" y="132" width="108" height="56" fill="#b4523a" />
        <path d="M88 132 L150 100 L212 132Z" fill="#8f3f2c" />
        <rect x="136" y="150" width="28" height="38" fill="#f6f1e4" />
        <g fill="#f6f1e4">
          <rect x="104" y="144" width="16" height="14" />
          <rect x="180" y="144" width="16" height="14" />
          <rect x="104" y="166" width="16" height="14" />
          <rect x="180" y="166" width="16" height="14" />
        </g>
        <rect x="148" y="86" width="4" height="16" fill="#5a3326" />
        <path d="M152 86 h14 l-4 4 l4 4 h-14Z" fill="#f2d77a" />
      </g>
      {/* Headline + CTA */}
      <text x="36" y="226" fontFamily={F} fontWeight="800" fontSize="15" fill="#1f4d36">
        Learn. Grow. Belong.
      </text>
      <rect x="36" y="234" width="170" height="4" rx="2" fill="#b9b19a" />
      <rect x="36" y="244" width="130" height="4" rx="2" fill="#b9b19a" />
      <rect x="36" y="258" width="64" height="18" rx="9" fill="#1f4d36" />
      <text x="68" y="270" textAnchor="middle" fontFamily={F} fontWeight="700" fontSize="8" fill="#f6f1e4">
        Apply now
      </text>
      {/* Info cards */}
      {[
        ['Admissions', '#7fae8c'],
        ['Events', '#f2d77a'],
        ['Parents', '#b4523a'],
      ].map(([label, c], i) => (
        <g key={label} transform={`translate(${36 + i * 78} 296)`}>
          <rect width="70" height="52" rx="6" fill="#fff" stroke="#e5dec9" />
          <circle cx="14" cy="16" r="6" fill={c} />
          <text x="8" y="38" fontFamily={F} fontWeight="700" fontSize="8" fill="#1f4d36">
            {label}
          </text>
          <rect x="8" y="43" width="40" height="3" rx="1.5" fill="#d8d1bc" />
        </g>
      ))}
    </svg>
  );
}

function Toolkit() {
  const cats = ['Resume', 'Interview', 'Networking', 'Salary', 'LinkedIn', 'Cover letters', 'Skills', 'Career change'];
  return (
    <svg {...SVG}>
      <defs>
        <linearGradient id="tk-cover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10264d" />
          <stop offset="1" stopColor="#06101f" />
        </linearGradient>
        <radialGradient id="tk-glow" cx="70%" cy="20%" r="70%">
          <stop offset="0" stopColor="#6fb6ff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#6fb6ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="400" fill="#05070c" />
      <ellipse cx="156" cy="376" rx="96" ry="10" fill="#000" opacity="0.5" />
      {/* Ebook cover */}
      <rect x="62" y="30" width="190" height="338" rx="4" fill="url(#tk-cover)" />
      <rect x="62" y="30" width="190" height="338" rx="4" fill="url(#tk-glow)" />
      <rect x="62" y="30" width="10" height="338" rx="3" fill="#000" opacity="0.35" />
      <text x="86" y="62" fontFamily="Inter, system-ui, sans-serif" fontSize="8" letterSpacing="2" fill="#6fb6ff">
        4TH REALM
      </text>
      <text x="86" y="104" fontFamily={F} fontWeight="800" fontSize="28" fill="#fff">
        AI
      </text>
      <text x="86" y="134" fontFamily={F} fontWeight="800" fontSize="28" fill="#fff">
        CAREER
      </text>
      <text x="86" y="164" fontFamily={F} fontWeight="800" fontSize="28" fill="#6fb6ff">
        TOOLKIT
      </text>
      <rect x="86" y="178" width="44" height="2" fill="#f2e6c9" />
      <text x="86" y="198" fontFamily={F} fontWeight="600" fontSize="10" fill="#c9ccd3">
        50 prompts · 8 categories
      </text>
      {/* 8 category chips */}
      {cats.map((c, i) => (
        <g key={c} transform={`translate(${86 + (i % 2) * 80} ${216 + Math.floor(i / 2) * 26})`}>
          <rect width="74" height="20" rx="10" fill="#fff" opacity="0.08" stroke="#6fb6ff" strokeOpacity="0.4" />
          <text x="37" y="13.5" textAnchor="middle" fontFamily={F} fontWeight="600" fontSize="8" fill="#e8ecf4">
            {c}
          </text>
        </g>
      ))}
      <text x="86" y="344" fontFamily="Inter, system-ui, sans-serif" fontSize="7" letterSpacing="1.5" fill="#8b909b">
        PROMPT PACK · EBOOK
      </text>
    </svg>
  );
}

function Portfolio() {
  return (
    <svg {...SVG}>
      <rect width="300" height="400" fill="#05070c" />
      <rect x="22" y="38" width="256" height="324" rx="8" fill="#0b0f18" stroke="#232a3a" />
      <rect x="22" y="38" width="256" height="20" rx="8" fill="#151b29" />
      <rect x="22" y="50" width="256" height="8" fill="#151b29" />
      <g fill="#3a4258">
        <circle cx="34" cy="48" r="3" />
        <circle cx="44" cy="48" r="3" />
        <circle cx="54" cy="48" r="3" />
      </g>
      {/* Nav */}
      <text x="36" y="80" fontFamily={F} fontWeight="800" fontSize="9" fill="#fff" letterSpacing="2">
        ADEMOLA
      </text>
      <g fill="#6b7389">
        <rect x="180" y="75" width="18" height="3" rx="1.5" />
        <rect x="204" y="75" width="18" height="3" rx="1.5" />
        <rect x="228" y="75" width="18" height="3" rx="1.5" />
      </g>
      {/* Hero */}
      <text x="36" y="124" fontFamily={F} fontWeight="800" fontSize="22" fill="#fff">
        Full-stack
      </text>
      <text x="36" y="148" fontFamily={F} fontWeight="800" fontSize="22" fill="#6fb6ff">
        developer.
      </text>
      <rect x="36" y="160" width="150" height="4" rx="2" fill="#2a3144" />
      <rect x="36" y="170" width="112" height="4" rx="2" fill="#2a3144" />
      <rect x="36" y="186" width="58" height="18" rx="4" fill="#6fb6ff" />
      <rect x="100" y="186" width="58" height="18" rx="4" fill="none" stroke="#3a4258" />
      {/* Skill chips */}
      {['HTML5', 'CSS3', 'JS', 'Git'].map((s, i) => (
        <g key={s} transform={`translate(${36 + i * 56} 224)`}>
          <rect width="48" height="16" rx="8" fill="#151b29" stroke="#2a3144" />
          <text x="24" y="11" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fill="#c9ccd3">
            {s}
          </text>
        </g>
      ))}
      {/* Project cards */}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${36 + i * 120} 256)`}>
          <rect width="112" height="88" rx="5" fill="#101624" stroke="#232a3a" />
          <rect x="6" y="6" width="100" height="46" rx="3" fill={i === 0 ? '#1f4d36' : '#10264d'} />
          <rect x="6" y="60" width="62" height="4" rx="2" fill="#c9ccd3" />
          <rect x="6" y="70" width="86" height="3" rx="1.5" fill="#3a4258" />
        </g>
      ))}
    </svg>
  );
}

function Assets() {
  return (
    <svg {...SVG}>
      <rect width="300" height="400" fill="#07090f" />
      {/* Flyer (back, tilted) */}
      <g transform="translate(40 52) rotate(-6)">
        <rect width="128" height="180" rx="4" fill="#f2e6c9" />
        <rect x="10" y="12" width="108" height="64" rx="3" fill="#10264d" />
        <circle cx="86" cy="36" r="14" fill="#6fb6ff" />
        <text x="12" y="104" fontFamily={F} fontWeight="800" fontSize="15" fill="#10264d">
          LAUNCH
        </text>
        <text x="12" y="120" fontFamily={F} fontWeight="800" fontSize="15" fill="#10264d">
          SALE
        </text>
        <rect x="12" y="130" width="84" height="3" rx="1.5" fill="#10264d" opacity="0.4" />
        <rect x="12" y="138" width="64" height="3" rx="1.5" fill="#10264d" opacity="0.4" />
        <rect x="12" y="152" width="50" height="16" rx="8" fill="#10264d" />
      </g>
      {/* Pinterest pin (right, tall) */}
      <g transform="translate(166 30) rotate(5)">
        <rect width="98" height="170" rx="12" fill="#0e2a55" />
        <rect x="8" y="8" width="82" height="96" rx="8" fill="#3f86d6" />
        <circle cx="52" cy="48" r="22" fill="#a9d6ff" opacity="0.8" />
        <path d="M8 90 q 30 -26 50 -6 t 32 -14 V104 H8Z" fill="#0e2a55" opacity="0.7" />
        <text x="10" y="126" fontFamily={F} fontWeight="800" fontSize="10" fill="#fff">
          Prompts that
        </text>
        <text x="10" y="140" fontFamily={F} fontWeight="800" fontSize="10" fill="#fff">
          land jobs
        </text>
        <circle cx="80" cy="152" r="8" fill="#e60023" />
      </g>
      {/* Website UI card (front) */}
      <g transform="translate(34 252)">
        <rect width="232" height="124" rx="8" fill="#0b0f18" stroke="#2a3144" />
        <rect width="232" height="16" rx="8" fill="#151b29" />
        <rect y="8" width="232" height="8" fill="#151b29" />
        <text x="12" y="46" fontFamily={F} fontWeight="800" fontSize="14" fill="#fff">
          4th Realm
        </text>
        <rect x="12" y="54" width="100" height="3" rx="1.5" fill="#3a4258" />
        <rect x="12" y="62" width="76" height="3" rx="1.5" fill="#3a4258" />
        <rect x="12" y="78" width="54" height="16" rx="4" fill="#6fb6ff" />
        <rect x="136" y="28" width="84" height="84" rx="6" fill="#10264d" />
        <circle cx="178" cy="62" r="16" fill="#6fb6ff" opacity="0.8" />
      </g>
    </svg>
  );
}

const VISUALS: Record<string, () => ReactNode> = {
  oakwood: Oakwood,
  toolkit: Toolkit,
  portfolio: Portfolio,
  assets: Assets,
};

export function Visual({name}: {name: string}) {
  const V = VISUALS[name];
  return V ? <V /> : null;
}
