import { Link } from 'react-router-dom';

export default function PageShell({ children }) {
  return (
    <div className="quote-page">
      <header className="quote-topbar">
        <Link to="/" className="brand">
          <img src="/logo.png" alt="" className="brand-logo" />
          Northdraft<span>Studios</span>
        </Link>
        <Link to="/" className="quote-back">← Back to site</Link>
      </header>
      {children}
    </div>
  );
}
