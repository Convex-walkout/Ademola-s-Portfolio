import {about} from '../content';
import {useReveals} from '../hooks/useReveals';

/** About, headline numbers and the skill set. */
export function About() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} id="about" aria-labelledby="about-title" className="relative bg-void px-4 py-28 sm:px-6 md:px-[6vw] md:py-40">
      <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div data-reveal>
          <p className="font-mono text-label text-earth uppercase">{about.eyebrow}</p>
          <h2 id="about-title" className="mt-4 font-display text-display text-white">
            {about.heading}
          </h2>
          <div className="mt-6 space-y-4">
            {about.body.map((t) => (
              <p key={t} className="max-w-[32rem] text-lead text-regolith/80">
                {t}
              </p>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {about.tags.map((t) => (
              <li key={t} className="rounded-[3px] px-2.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.1em] text-regolith/80 uppercase ring-1 ring-white/15">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <dl className="grid grid-cols-2 gap-3 self-start" data-reveal style={{transitionDelay: '120ms'}}>
          {about.stats.map((s) => (
            <div key={s.label} className="brackets px-5 py-6 text-white/25">
              <dt className="order-2 mt-2 font-mono text-label text-regolith/60 uppercase">{s.label}</dt>
              <dd className="font-display text-[2rem] leading-none text-white md:text-[2.5rem]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-20 border-t border-white/10 pt-10 md:mt-28" data-reveal>
        <p className="font-mono text-label text-regolith/50 uppercase">{about.skillsLabel}</p>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-8">
          {about.skills.map((g) => (
            <div key={g.group}>
              <h3 className="font-display text-[0.8125rem] tracking-[0.06em] text-white uppercase">{g.group}</h3>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((i) => (
                  <li key={i} className="flex gap-3 text-[0.9375rem] text-regolith/75">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-earth" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
