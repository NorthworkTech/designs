import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../PageShell.jsx';

export default function LogoMockup() {
  const [src, setSrc] = useState('/logo.png');
  const inputRef = useRef(null);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (file) setSrc(URL.createObjectURL(file));
  };

  return (
    <PageShell>
      <main className="quote-main">
        <div className="quote-intro">
          <p className="eyebrow">Free Tool</p>
          <h1>Logo mockup previewer.</h1>
          <p className="quote-sub">Drop in a logo (PNG with transparency works best) and see it in the wild.</p>
        </div>

        <div className="mockup-upload">
          <button className="btn btn-primary" onClick={() => inputRef.current?.click()}>Upload a logo</button>
          <input ref={inputRef} type="file" accept="image/*" onChange={onFile} hidden />
          <button className="btn btn-ghost" onClick={() => setSrc('/logo.png')}>Use the Northdraft mark</button>
        </div>

        <div className="mockups">
          <figure className="mk mk-icon">
            <div className="mk-appicon"><img src={src} alt="logo" /></div>
            <figcaption>App icon</figcaption>
          </figure>

          <figure className="mk mk-card">
            <div className="mk-bizcard"><img src={src} alt="logo" /><span className="mk-line" /><span className="mk-line short" /></div>
            <figcaption>Business card</figcaption>
          </figure>

          <figure className="mk mk-browser">
            <div className="mk-win">
              <div className="mk-tab"><img src={src} alt="logo" /><span>Your Brand</span></div>
              <div className="mk-page"><img src={src} alt="logo" className="mk-page-logo" /></div>
            </div>
            <figcaption>Website</figcaption>
          </figure>

          <figure className="mk mk-sign">
            <div className="mk-wall"><div className="mk-plate"><img src={src} alt="logo" /></div></div>
            <figcaption>Signage</figcaption>
          </figure>
        </div>

        <p className="tools-cta">Want a logo that looks this good everywhere? <Link to="/start">Start a project →</Link></p>
      </main>
    </PageShell>
  );
}
