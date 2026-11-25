import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

/*
 * Instant Quote Builder (Stage 1).
 * NOTE: prices below are PLACEHOLDERS for the owner to confirm.
 * Edit the numbers in SERVICES / RUSH and they flow through everywhere.
 */
const SERVICES = [
  {
    key: 'logo',
    title: 'Logo & Brand',
    blurb: 'A custom logo and the essentials to use it everywhere.',
    base: [150, 400],
    options: [
      { id: 'concepts', label: 'Initial concepts', choices: [
        { label: '1 concept', add: [0, 0] },
        { label: '3 concepts', add: [80, 150] },
        { label: '5 concepts', add: [160, 300] },
      ] },
      { id: 'kit', label: 'Brand kit', choices: [
        { label: 'Logo files only', add: [0, 0] },
        { label: '+ Colours & fonts', add: [60, 120] },
        { label: 'Full brand kit', add: [160, 350] },
      ] },
    ],
  },
  {
    key: 'print',
    title: 'Poster / Flyer',
    blurb: 'Eye-catching print, ready for the press.',
    base: [60, 180],
    options: [
      { id: 'sides', label: 'Sides', choices: [
        { label: 'Single-sided', add: [0, 0] },
        { label: 'Double-sided', add: [40, 90] },
      ] },
      { id: 'qty', label: 'Variations', choices: [
        { label: '1 design', add: [0, 0] },
        { label: '3 designs', add: [70, 150] },
      ] },
    ],
  },
  {
    key: 'deck',
    title: 'Presentation',
    blurb: 'A polished, persuasive slide deck.',
    base: [120, 350],
    options: [
      { id: 'slides', label: 'Slides', choices: [
        { label: 'Up to 10', add: [0, 0] },
        { label: '10–25', add: [90, 200] },
        { label: '25+', add: [200, 450] },
      ] },
      { id: 'style', label: 'Style', choices: [
        { label: 'Template-based', add: [0, 0] },
        { label: 'Fully custom', add: [120, 300] },
      ] },
    ],
  },
  {
    key: 'web',
    title: 'Website',
    blurb: 'A clean, professional site tailored to you.',
    base: [400, 1200],
    options: [
      { id: 'pages', label: 'Pages', choices: [
        { label: '1-page', add: [0, 0] },
        { label: 'Up to 5', add: [250, 700] },
        { label: '5+', add: [600, 1600] },
      ] },
      { id: 'shop', label: 'Online store', choices: [
        { label: 'No store', add: [0, 0] },
        { label: 'Add a store', add: [350, 900] },
      ] },
    ],
  },
  {
    key: 'cards',
    title: 'Cards & Stickers',
    blurb: 'Business cards and stickers, designed to your liking.',
    base: [50, 160],
    options: [
      { id: 'what', label: 'Items', choices: [
        { label: 'Business cards', add: [0, 0] },
        { label: 'Stickers', add: [20, 70] },
        { label: 'Both', add: [40, 120] },
      ] },
      { id: 'print', label: 'Printing', choices: [
        { label: 'Design only', add: [0, 0] },
        { label: 'Design + print & ship', add: [60, 220] },
      ] },
    ],
  },
];

const RUSH_MULTIPLIER = 1.3; // +30% for rush delivery

const money = (n) => `$${Math.round(n).toLocaleString()}`;

export default function QuoteBuilder() {
  const [serviceKey, setServiceKey] = useState('logo');
  const [picks, setPicks] = useState({}); // { serviceKey: { optId: choiceIndex } }
  const [rush, setRush] = useState(false);

  const service = SERVICES.find((s) => s.key === serviceKey);
  const sel = picks[serviceKey] || {};

  const setPick = (optId, idx) =>
    setPicks((p) => ({ ...p, [serviceKey]: { ...(p[serviceKey] || {}), [optId]: idx } }));

  const [min, max] = useMemo(() => {
    let lo = service.base[0];
    let hi = service.base[1];
    service.options.forEach((opt) => {
      const idx = sel[opt.id] ?? 0;
      const add = opt.choices[idx].add;
      lo += add[0];
      hi += add[1];
    });
    if (rush) { lo *= RUSH_MULTIPLIER; hi *= RUSH_MULTIPLIER; }
    return [lo, hi];
  }, [service, sel, rush]);

  return (
    <div className="quote-page">
      <header className="quote-topbar">
        <Link to="/" className="brand">
          <img src="/logo.png" alt="" className="brand-logo" />
          Northdraft<span>Studios</span>
        </Link>
        <Link to="/" className="quote-back">← Back to site</Link>
      </header>

      <main className="quote-main">
        <div className="quote-intro">
          <p className="eyebrow">Instant Quote</p>
          <h1>Build your quote.</h1>
          <p className="quote-sub">Pick a service and a few options to see an instant estimate. No sign-up, no obligation.</p>
        </div>

        <div className="quote-grid">
          <div className="quote-config">
            <div className="quote-field">
              <span className="quote-label">1 — Choose a service</span>
              <div className="service-chips">
                {SERVICES.map((s) => (
                  <button
                    key={s.key}
                    className={`chip ${serviceKey === s.key ? 'active' : ''}`}
                    onClick={() => setServiceKey(s.key)}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
              <p className="service-blurb">{service.blurb}</p>
            </div>

            {service.options.map((opt, i) => (
              <div className="quote-field" key={opt.id}>
                <span className="quote-label">{i + 2} — {opt.label}</span>
                <div className="opt-chips">
                  {opt.choices.map((c, idx) => (
                    <button
                      key={c.label}
                      className={`chip ${(sel[opt.id] ?? 0) === idx ? 'active' : ''}`}
                      onClick={() => setPick(opt.id, idx)}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="quote-field">
              <label className="rush-row">
                <input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} />
                <span>Rush delivery <em>(+30%)</em></span>
              </label>
            </div>
          </div>

          <aside className="quote-summary">
            <div className="quote-price-card">
              <span className="quote-label">Estimated range</span>
              <div className="quote-price">{money(min)} – {money(max)}</div>
              <p className="quote-note">A ballpark, not a bill. Your final quote is confirmed after a quick brief.</p>
              <a className="btn btn-primary quote-cta" href={`/start?service=${encodeURIComponent(service.title)}&est=${encodeURIComponent(`${money(min)} – ${money(max)}`)}`}>Start my project →</a>
              <a className="btn btn-ghost" href="/#services">See what's included</a>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
