import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../PageShell.jsx';

const PAIRS = [
  { head: ['Playfair Display', 700], body: ['DM Sans', 400] },
  { head: ['Space Grotesk', 600], body: ['Lora', 400] },
  { head: ['Fraunces', 600], body: ['Work Sans', 400] },
  { head: ['Libre Baskerville', 700], body: ['Archivo', 400] },
  { head: ['DM Serif Display', 400], body: ['DM Sans', 400] },
  { head: ['Bricolage Grotesque', 600], body: ['EB Garamond', 400] },
];

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&family=Space+Grotesk:wght@600&family=Lora:wght@400&family=Fraunces:opsz,wght@9..144,600&family=Work+Sans:wght@400&family=Libre+Baskerville:wght@700&family=Archivo:wght@400&family=DM+Serif+Display&display=swap';

export default function FontPairing() {
  const [i, setI] = useState(0);
  const [sample, setSample] = useState('Design that speaks for itself');

  useEffect(() => {
    if (document.getElementById('fp-fonts')) return;
    const l = document.createElement('link');
    l.id = 'fp-fonts'; l.rel = 'stylesheet'; l.href = FONT_HREF;
    document.head.appendChild(l);
  }, []);

  const p = PAIRS[i];
  const next = () => setI((x) => (x + 1) % PAIRS.length);

  return (
    <PageShell>
      <main className="quote-main">
        <div className="quote-intro">
          <p className="eyebrow">Free Tool</p>
          <h1>Font pairing tool.</h1>
          <p className="quote-sub">Designer-approved heading &amp; body combinations. Type your own words and shuffle through.</p>
        </div>

        <input className="w-input fp-input" value={sample} onChange={(e) => setSample(e.target.value)} aria-label="Sample text" />

        <div className="fp-preview">
          <div className="fp-head" style={{ fontFamily: `"${p.head[0]}", serif`, fontWeight: p.head[1] }}>{sample || 'Your words here'}</div>
          <p className="fp-body" style={{ fontFamily: `"${p.body[0]}", sans-serif`, fontWeight: p.body[1] }}>
            A great pairing gives a brand a voice — a confident headline face set against a calm, readable body text. Clear hierarchy, easy reading, and a bit of personality.
          </p>
          <div className="fp-names">
            <span><b>Heading</b> {p.head[0]}</span>
            <span><b>Body</b> {p.body[0]}</span>
          </div>
        </div>

        <div className="palette-actions">
          <button className="btn btn-primary" onClick={next}>Shuffle pairing</button>
          <Link to="/start" className="btn btn-ghost">Want us to design it for you? →</Link>
        </div>
      </main>
    </PageShell>
  );
}
