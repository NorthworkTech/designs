import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../PageShell.jsx';

const DEFAULT_COLORS = ['#26262A', '#2B5CF0', '#2CD1F5', '#7C3AED', '#F4F3F0'];
const FORMATS = ['CSS', 'Figma tokens', 'Canva', 'Word'];

export default function KitExport() {
  const [colors, setColors] = useState(DEFAULT_COLORS);
  const [head, setHead] = useState('EB Garamond');
  const [body, setBody] = useState('Bricolage Grotesque');
  const [tab, setTab] = useState('CSS');
  const [copied, setCopied] = useState(false);

  const setColor = (i, v) => setColors((c) => c.map((x, j) => (j === i ? v.toUpperCase() : x)));

  const output = useMemo(() => {
    const names = ['ink', 'primary', 'accent', 'violet', 'paper'];
    if (tab === 'CSS') {
      return [
        ':root {',
        ...colors.map((c, i) => `  --color-${names[i]}: ${c};`),
        `  --font-heading: "${head}", serif;`,
        `  --font-body: "${body}", sans-serif;`,
        '}',
        '',
        'h1, h2, h3 { font-family: var(--font-heading); }',
        'body { font-family: var(--font-body); }',
      ].join('\n');
    }
    if (tab === 'Figma tokens') {
      const tokens = {
        color: Object.fromEntries(colors.map((c, i) => [names[i], { value: c, type: 'color' }])),
        font: { heading: { value: head, type: 'fontFamily' }, body: { value: body, type: 'fontFamily' } },
      };
      return JSON.stringify(tokens, null, 2);
    }
    if (tab === 'Canva') {
      return [
        'Brand colours (paste into Canva → Brand Kit → Colours):',
        ...colors.map((c) => `  ${c}`),
        '',
        'Fonts (Canva → Brand Kit → Fonts):',
        `  Heading: ${head}`,
        `  Body: ${body}`,
      ].join('\n');
    }
    // Word
    return [
      'Microsoft Word theme:',
      '  Design → Colors → Customize Colors — set Accent 1–5 to:',
      ...colors.map((c, i) => `    Accent ${i + 1}: ${c}`),
      '  Design → Fonts → Customize Fonts:',
      `    Heading font: ${head}`,
      `    Body font: ${body}`,
    ].join('\n');
  }, [colors, head, body, tab]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch { /* ignore */ }
  };

  return (
    <PageShell>
      <main className="quote-main">
        <div className="quote-intro">
          <p className="eyebrow">Free Tool</p>
          <h1>Colour &amp; font kit export.</h1>
          <p className="quote-sub">Set your brand colours and fonts, then export ready-to-paste styles for Figma, Canva, CSS and Word.</p>
        </div>

        <div className="kit-grid">
          <div className="kit-inputs">
            <span className="quote-label">Colours</span>
            <div className="kit-colors">
              {colors.map((c, i) => (
                <label className="kit-color" key={i}>
                  <input type="color" value={c} onChange={(e) => setColor(i, e.target.value)} />
                  <input className="w-input kit-hex" value={c} onChange={(e) => setColor(i, e.target.value)} />
                </label>
              ))}
            </div>
            <div className="quote-field">
              <label className="quote-label" htmlFor="hf">Heading font</label>
              <input id="hf" className="w-input" value={head} onChange={(e) => setHead(e.target.value)} />
            </div>
            <div className="quote-field">
              <label className="quote-label" htmlFor="bf">Body font</label>
              <input id="bf" className="w-input" value={body} onChange={(e) => setBody(e.target.value)} />
            </div>
          </div>

          <div className="kit-output">
            <div className="kit-tabs">
              {FORMATS.map((f) => (
                <button key={f} className={`chip ${tab === f ? 'active' : ''}`} onClick={() => setTab(f)}>{f}</button>
              ))}
            </div>
            <pre className="kit-pre">{output}</pre>
            <button className="btn btn-primary" onClick={copy}>{copied ? 'Copied!' : `Copy ${tab}`}</button>
          </div>
        </div>

        <p className="tools-cta">Want a full brand kit built for you? <Link to="/start?service=Logo%20%26%20Brand">Start a project →</Link></p>
      </main>
    </PageShell>
  );
}
