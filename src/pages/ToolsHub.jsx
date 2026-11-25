import { Link } from 'react-router-dom';
import PageShell from './PageShell.jsx';

const TOOLS = [
  { to: '/tools/palette', title: 'Colour palette generator', blurb: 'Spin up a balanced colour palette and copy the hex codes.' },
  { to: '/tools/fonts', title: 'Font pairing tool', blurb: 'Browse designer-approved heading + body combinations.' },
  { to: '/tools/mockup', title: 'Logo mockup previewer', blurb: 'Drop in a logo and see it on a card, an app icon and a sign.' },
];

export default function ToolsHub() {
  return (
    <PageShell>
      <main className="quote-main">
        <div className="quote-intro">
          <p className="eyebrow">Free Tools</p>
          <h1>Little tools, on the house.</h1>
          <p className="quote-sub">Handy bits for your own projects. When you'd rather have it done properly — that's us.</p>
        </div>
        <div className="tools-grid">
          {TOOLS.map((t) => (
            <Link to={t.to} className="tool-card" key={t.to}>
              <h3>{t.title}</h3>
              <p>{t.blurb}</p>
              <span className="tool-go">Open →</span>
            </Link>
          ))}
        </div>
        <p className="tools-cta">Want us to design it for you? <Link to="/start">Start a project →</Link></p>
      </main>
    </PageShell>
  );
}
