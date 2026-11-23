/**
 * Every word on the page.
 */

export const brand = {
  name: 'Ademola Lawal',
  wordmark: 'ADEMOLA',
  email: 'imanlanrelawal@gmail.com',
};

export const nav = [
  {label: 'Work', href: '#log'},
  {label: 'About', href: '#about'},
  {label: 'Path', href: '#trajectory'},
  {label: 'Services', href: '#missions'},
  {label: 'Contact', href: '#reserve'},
];

export const hero = {
  title: 'ADEMOLA',
  kicker: 'Full-stack developer · Available for freelance',
  site: 'Nigeria · 4th Realm',
};

export const intro = {
  eyebrow: 'Work',
  heading: 'Things I have built.',
  body: 'Websites, web apps and digital products, shipped under the 4th Realm name. Hands-on, practical, and meant to be used.',
};

export const log = [
  {
    tag: 'Website',
    title: 'Oakwood Academy',
    body: 'A responsive school website built with HTML, CSS and JavaScript, so students and parents can find information easily.',
    href: 'https://convex-walkout.github.io/Oakwood-Academy/index.html',
    hrefLabel: 'Live demo',
    visual: 'oakwood',
    art: 'radial-gradient(60% 60% at 50% 40%, rgba(139,144,155,0.55), transparent 72%), linear-gradient(180deg, #11151f, #05070c)',
  },
  {
    tag: '4th Realm',
    visual: 'toolkit',
    title: 'AI Career Toolkit',
    body: '50 prompts across 8 categories, with the ebook copy, sales page and social content. Sold on Gumroad and Selar.',
    art: 'radial-gradient(80% 60% at 70% 20%, rgba(111,182,255,0.55), transparent 70%), linear-gradient(160deg, #0b1426, #05070c)',
  },
  {
    tag: 'Website',
    visual: 'portfolio',
    title: 'Portfolio site',
    body: 'Built from scratch in HTML5, CSS3 and vanilla JavaScript, with a dark aesthetic. Live on Vercel.',
    art: 'radial-gradient(70% 50% at 25% 75%, rgba(242,230,201,0.4), transparent 70%), linear-gradient(200deg, #151a26, #05070c)',
  },
  {
    tag: 'Design',
    visual: 'assets',
    title: '4th Realm assets',
    body: 'Promotional flyers, Pinterest pins and a website UI, built as hands-on practice in Affinity and Figma.',
    art: 'radial-gradient(70% 55% at 75% 70%, rgba(111,182,255,0.4), transparent 70%), radial-gradient(50% 40% at 20% 20%, rgba(242,230,201,0.3), transparent 70%), linear-gradient(140deg, #0b0f18, #05070c)',
  },
];

export const about = {
  eyebrow: 'About',
  heading: 'Websites and web apps, end to end.',
  body: [
    'I build websites and web apps from the interface to the server. I care about clean, maintainable code, responsive layouts, performance and accessibility.',
    'I’m looking for full-stack team roles or freelance projects where I can own a product end to end.',
  ],
  tags: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'React Native', 'Responsive Design', 'Git', 'API Integration', 'Google Ads'],
  stats: [
    {value: '4+', label: 'Projects completed'},
    {value: '2+', label: 'Years building'},
    {value: '100%', label: 'Responsive sites'},
    {value: 'Open', label: 'To opportunities'},
  ],
  skillsLabel: 'Skills',
  skills: [
    {group: 'Structure & markup', items: ['Semantic HTML5', 'Accessibility (ARIA, WCAG)', 'Mobile-first media queries']},
    {group: 'Styling & layout', items: ['CSS3 variables', 'Flexbox & CSS Grid', 'Keyframes & transitions', 'Responsive design']},
    {group: 'JavaScript & TypeScript', items: ['ES6+ & TypeScript', 'DOM manipulation & events', 'Fetch & async/await', 'React Native']},
    {group: 'Backend', items: ['Node.js', 'Python', 'API integration']},
    {group: 'Tools & process', items: ['Git & GitHub', 'UI/UX fundamentals', 'Lighthouse & Core Web Vitals', 'Google Ads for business']},
  ],
};

/** Chapters of the path, in drawing order. */
export const trajectory = {
  eyebrow: 'Path',
  heading: 'From code to product to deals.',
  counterLabel: 'Toolkit prompts',
  counterTotal: 50,
  start: 'WEBSITES',
  end: 'FULL-STACK',
  legs: [
    {day: 'Start', title: 'Full-stack developer', body: 'Websites and web apps built from scratch, from the interface to the server.'},
    {day: '4th Realm', title: 'Digital product builder', body: 'Launched the AI Career Toolkit and the brand around it.'},
    {day: 'Now', title: 'Business Development at Victus Global', body: 'Finding Web3 projects, building relationships and connecting them to the right team.'},
    {day: 'Stack', title: 'Across the stack', body: 'Node.js and Python on the server, with TypeScript and React Native across web and mobile.'},
  ],
};

export const missions = {
  eyebrow: 'Services',
  heading: 'Six ways to work together.',
  note: 'Open to freelance work.',
  items: [
    {name: 'Websites & web apps', num: '01', unit: 'service', rings: 3, topic: 'Website or web app', lines: ['Business sites, web apps and dashboards', 'Full-stack: interface, server and database', 'Responsive, accessible and deployed live'], cta: 'Ask about a website or app', featured: true},
    {name: 'Portfolio websites', num: '02', unit: 'service', rings: 2, topic: 'Portfolio website', lines: ['For creatives, developers and freelancers', 'Custom-coded, no templates or builders, so you own the code'], cta: 'Ask about a portfolio'},
    {name: 'Responsive conversion', num: '03', unit: 'service', rings: 1, topic: 'Responsive conversion', lines: ['Fix layouts that break on mobile', 'Your existing design stays as it is'], cta: 'Ask about a fix'},
    {name: 'Website redesign', num: '04', unit: 'service', rings: 2, topic: 'Website redesign', lines: ['Rebuild outdated websites', 'Cleaner code, better performance, a visual refresh'], cta: 'Ask about a redesign'},
    {name: 'Google Ads', num: '05', unit: 'service', rings: 3, topic: 'Google Ads', lines: ['Search campaigns and ad copy for your business', 'Keyword research, targeting and conversion tracking', 'Pairs with a website built to convert'], cta: 'Ask about Google Ads'},
    {name: 'AI automation', num: '06', unit: 'service', rings: 1, topic: 'AI automation', lines: ['Custom AI workflows', 'Customer support, lead generation, data entry and internal processes'], cta: 'Ask about automation'},
  ],
};

export const reserve = {
  eyebrow: 'Contact',
  heading: 'Let’s build something.',
  body: 'Tell me what you need and I’ll write back, usually within 24 hours. Available for freelance projects, remote full-stack roles and contract work (not full-time on-site).',
  stackLabel: 'Tools of the trade',
  stack: [
    ['Markup', 'HTML'],
    ['Style', 'CSS'],
    ['Script', 'JS'],
    ['Typed', 'TS'],
    ['Server', 'NODE'],
    ['Backend', 'PY'],
    ['Version', 'GIT'],
  ] as [string, string][],
  linksLabel: 'Reach me directly',
  links: [
    {label: 'Email', value: 'imanlanrelawal@gmail.com', href: 'mailto:imanlanrelawal@gmail.com'},
    {label: 'WhatsApp', value: '+234 708 604 1908', href: 'https://wa.me/2347086041908'},
    {label: 'GitHub', value: 'Convex-walkout', href: 'https://github.com/Convex-walkout'},
    {label: 'X', value: '@Arrdee__2', href: 'https://x.com/Arrdee__2'},
  ],
  topics: ['Website or web app', 'Portfolio website', 'Responsive conversion', 'Website redesign', 'Google Ads', 'AI automation', 'Something else'],
};
