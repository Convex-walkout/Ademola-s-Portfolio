import {useState, type FormEvent} from 'react';
import {brand, reserve} from '../content';
import {useReveals} from '../hooks/useReveals';

type Status = 'idle' | 'invalid' | 'sent';

/**
 * Contact. The tools panel on one side, the enquiry form on the other; the
 * form hands a drafted message to the visitor's mail app.
 */
export function Reserve() {
  const ref = useReveals<HTMLElement>();
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus('invalid');
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const subject = encodeURIComponent(`Enquiry: ${String(data.get('mission'))}`);
    const body = encodeURIComponent(`Name: ${String(data.get('name'))}\nEmail: ${String(data.get('email'))}\nTopic: ${String(data.get('mission'))}`);
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  const field =
    'w-full rounded-[4px] bg-white/[0.04] px-4 py-3.5 text-body text-white ring-1 ring-white/15 outline-none placeholder:text-regolith/40 focus:ring-earth user-invalid:ring-red-400/70';

  return (
    <section ref={ref} id="reserve" aria-labelledby="reserve-title" className="relative overflow-hidden bg-void px-4 pb-28 sm:px-6 md:px-[6vw] md:pb-40">
      {/* A sliver of the Earth rising at the bottom edge — the hero, bookended. */}
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[62vw] left-1/2 size-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_30%,rgba(111,182,255,0.35),rgba(111,182,255,0.05)_55%,transparent_70%)]" />

      <div className="relative grid gap-12 border-t border-white/10 pt-20 md:grid-cols-2 md:gap-16 md:pt-28">
        <div data-reveal>
          <p className="font-mono text-label text-earth uppercase">{reserve.eyebrow}</p>
          <h2 id="reserve-title" className="mt-4 font-display text-display text-white">
            {reserve.heading}
          </h2>
          <p className="mt-5 max-w-[28rem] text-body text-regolith/70">{reserve.body}</p>

          <div className="mt-10">
            <p className="font-mono text-label text-regolith/50 uppercase">{reserve.stackLabel}</p>
            <div className="mt-3 flex flex-wrap gap-2 md:gap-3">
              {reserve.stack.map(([label, v]) => (
                <div key={label} className="brackets min-w-[4.25rem] px-3 py-3 text-center text-white/25 md:min-w-[5.5rem]">
                  <span className="block font-display text-[1.125rem] text-white md:text-[1.5rem]">{v}</span>
                  <span className="mt-1 block font-mono text-[0.625rem] tracking-[0.06em] text-regolith/60 uppercase">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <p className="font-mono text-label text-regolith/50 uppercase">{reserve.linksLabel}</p>
            <ul className="mt-3 divide-y divide-white/10 border-y border-white/10">
              {reserve.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target={l.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" className="flex items-baseline justify-between gap-4 py-3 text-regolith/85 transition-colors hover:text-white">
                    <span className="font-mono text-label text-regolith/50 uppercase">{l.label}</span>
                    <span className="text-[0.9375rem] break-all">{l.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form noValidate onSubmit={onSubmit} aria-describedby="reserve-status" className="space-y-3" data-reveal>
          <label className="block">
            <span className="mb-1.5 block font-mono text-label text-regolith/60 uppercase">Name</span>
            <input name="name" required autoComplete="name" placeholder="Your name" className={field} onInput={() => setStatus('idle')} />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-label text-regolith/60 uppercase">Email</span>
            <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} onInput={() => setStatus('idle')} />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-label text-regolith/60 uppercase">What do you need?</span>
            <select name="mission" defaultValue={reserve.topics[0]} className={`${field} appearance-none`}>
              {reserve.topics.map((t) => (
                <option key={t} value={t} className="bg-void">
                  {t}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="mt-2 w-full rounded-[4px] bg-white px-5 py-4 font-mono text-label text-void uppercase transition-colors hover:bg-earth">
            Send the enquiry
          </button>
          <p id="reserve-status" role="status" className="min-h-[1.25rem] text-[0.8125rem] text-regolith/70">
            {status === 'invalid' && 'Name and a valid email, please.'}
            {status === 'sent' && `Your mail app should be open with your request drafted. If not: ${brand.email}.`}
          </p>
        </form>
      </div>
    </section>
  );
}
