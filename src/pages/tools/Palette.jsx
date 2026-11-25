import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../PageShell.jsx';

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const to = (x) => Math.round(255 * x).toString(16).padStart(2, '0');
  return `#${to(f(0))}${to(f(8))}${to(f(4))}`.toUpperCase();
}

function makePalette() {
  const base = Math.floor(Math.random() * 360);
  // balanced scheme: dark anchor, two mids, a light, an accent across the wheel
  return [
    hslToHex(base, 28, 16),
    hslToHex((base + 12) % 360, 55, 42),
    hslToHex((base + 24) % 360, 62, 58),
    hslToHex((base + 180) % 360, 70, 60),
    hslToHex((base + 30) % 360, 30, 94),
  ];
}

export default function Palette() {
  const [colors, setColors] = useState(makePalette);
  const [locks, setLocks] = useState([false, false, false, false, false]);
  const [copied, setCopied] = useState(-1);

  const regen = useCallback(() => {
    const next = makePalette();
    setColors((cur) => cur.map((c, i) => (locks[i] ? c : next[i])));
  }, [locks]);

  useEffect(() => {
    const onKey = (e) => { if (e.code === 'Space') { e.preventDefault(); regen(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [regen]);

  const copy = async (hex, i) => {
    try { await navigator.clipboard.writeText(hex); } catch { /* ignore */ }
    setCopied(i); setTimeout(() => setCopied(-1), 1200);
  };

  const light = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) > 150;
  };

  return (
    <PageShell>
      <main className="quote-main">
        <div className="quote-intro">
          <p className="eyebrow">Free Tool</p>
          <h1>Colour palette generator.</h1>
          <p className="quote-sub">Press <b>Generate</b> (or the spacebar) for a fresh palette. Click a swatch to copy its hex; lock the ones you love.</p>
        </div>

        <div className="palette">
          {colors.map((c, i) => (
            <div className="swatch" key={i} style={{ background: c, color: light(c) ? '#1d1e22' : '#fff' }}>
              <button className="swatch-lock" onClick={() => setLocks((l) => l.map((x, j) => (j === i ? !x : x)))} aria-label="Lock colour">
                {locks[i] ? '🔒' : '🔓'}
              </button>
              <button className="swatch-hex" onClick={() => copy(c, i)}>{copied === i ? 'Copied!' : c}</button>
            </div>
          ))}
        </div>

        <div className="palette-actions">
          <button className="btn btn-primary" onClick={regen}>Generate palette</button>
          <Link to="/start" className="btn btn-ghost">Want us to design it for you? →</Link>
        </div>
      </main>
    </PageShell>
  );
}
