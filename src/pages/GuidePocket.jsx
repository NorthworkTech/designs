import { Link } from 'react-router-dom';
import PageShell from './PageShell.jsx';

const OFFERINGS = [
  {
    title: 'App icons',
    body: 'Crisp, legible icons tuned for the Guide app grid — every size exported and ready to ship.',
    art: (
      <svg viewBox="0 0 320 200" className="gp-art" aria-hidden="true">
        <defs>
          <linearGradient id="gpa" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2cd1f5" /><stop offset="0.5" stopColor="#2b5cf0" /><stop offset="1" stopColor="#7c3aed" /></linearGradient>
        </defs>
        <rect width="320" height="200" fill="#f1efe9" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${40 + i * 86} 60)`}>
            <rect width="66" height="66" rx="15" fill={i === 1 ? 'url(#gpa)' : '#191a1f'} />
            <path d={`M18 50 L33 20 L48 50`} fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
        <rect x="44" y="140" width="58" height="7" rx="3.5" fill="#d9d7cf" />
        <rect x="130" y="140" width="58" height="7" rx="3.5" fill="#d9d7cf" />
        <rect x="216" y="140" width="58" height="7" rx="3.5" fill="#d9d7cf" />
      </svg>
    ),
  },
  {
    title: 'Pocket screens',
    body: 'Purpose-built 1-bit artwork for Pocket’s 480×800 e-ink display — high-contrast, dither-aware, and sharp on paper-like screens.',
    art: (
      <svg viewBox="0 0 320 200" className="gp-art" aria-hidden="true">
        <rect width="320" height="200" fill="#1b1c20" />
        <rect x="120" y="24" width="80" height="150" rx="10" fill="#0b0b0c" stroke="#3a3b40" strokeWidth="2" />
        <rect x="128" y="32" width="64" height="134" rx="4" fill="#f6f6f2" />
        {/* 1-bit content: bold title + dithered block */}
        <rect x="136" y="42" width="48" height="8" fill="#0b0b0c" />
        <rect x="136" y="54" width="34" height="5" fill="#0b0b0c" />
        <g fill="#0b0b0c">
          {Array.from({ length: 8 }).map((_, r) => Array.from({ length: 12 }).map((_, c) => ((r + c) % 2 === 0 ? <rect key={`${r}-${c}`} x={136 + c * 4} y={70 + r * 4} width="2" height="2" /> : null)))}
        </g>
        <rect x="136" y="112" width="48" height="6" fill="#0b0b0c" />
        <rect x="136" y="122" width="40" height="6" fill="#0b0b0c" />
        <rect x="136" y="150" width="48" height="10" rx="3" fill="#0b0b0c" />
      </svg>
    ),
  },
  {
    title: 'Store screenshots',
    body: 'Scroll-stopping store screenshots that explain the app at a glance and lift installs — framed, captioned, and on-brand.',
    art: (
      <svg viewBox="0 0 320 200" className="gp-art" aria-hidden="true">
        <defs>
          <linearGradient id="gpb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2cd1f5" /><stop offset="1" stopColor="#7c3aed" /></linearGradient>
        </defs>
        <rect width="320" height="200" fill="#f1efe9" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${46 + i * 80} 34)`}>
            <rect width="62" height="132" rx="10" fill={i === 1 ? 'url(#gpb)' : '#fff'} stroke="#dcdad3" strokeWidth="1.5" />
            <rect x="12" y="16" width="38" height="7" rx="3.5" fill={i === 1 ? 'rgba(255,255,255,0.8)' : '#c9c7c0'} />
            <rect x="12" y="30" width="26" height="5" rx="2.5" fill={i === 1 ? 'rgba(255,255,255,0.5)' : '#e0ded7'} />
            <rect x="12" y="52" width="38" height="56" rx="6" fill={i === 1 ? 'rgba(255,255,255,0.25)' : '#eceae3'} />
          </g>
        ))}
      </svg>
    ),
  },
];

export default function GuidePocket() {
  return (
    <PageShell>
      <main className="quote-main">
        <div className="quote-intro">
          <p className="eyebrow">Design for Guide &amp; Pocket</p>
          <h1>Designed for the Guide ecosystem.</h1>
          <p className="quote-sub">App icons, Pocket e-ink screens, and store screenshots — made to spec for Guide and the Pocket device, by Northdraft Studios.</p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '1.6rem' }}>
            <Link to="/start?service=Something%20else" className="btn btn-primary">Start a project</Link>
            <Link to="/quote" className="btn btn-ghost">Get an estimate</Link>
          </div>
        </div>

        <div className="gp-grid">
          {OFFERINGS.map((o) => (
            <article className="gp-card" key={o.title}>
              <div className="gp-media">{o.art}</div>
              <h3>{o.title}</h3>
              <p>{o.body}</p>
            </article>
          ))}
        </div>

        <div className="gp-spec">
          <span className="quote-label">Pocket spec</span>
          <p>Pocket is a <strong>1-bit, 480×800 e-ink</strong> device. We design high-contrast, dither-aware artwork that stays crisp on its paper-like screen — no guesswork, no muddy greys.</p>
        </div>

        <p className="tools-cta">Building on Guide or Pocket? <Link to="/start?service=Something%20else">Tell us what you need →</Link></p>
      </main>
    </PageShell>
  );
}
