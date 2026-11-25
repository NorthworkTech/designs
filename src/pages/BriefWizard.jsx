import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from './PageShell.jsx';

const SERVICES = ['Logo & Brand', 'Poster / Flyer', 'Presentation', 'Website', 'Cards & Stickers', 'Something else'];
const VIBES = ['Minimal', 'Bold', 'Playful', 'Elegant', 'Modern', 'Classic', 'Techy', 'Organic'];
const DEADLINES = ['Flexible', 'Within 2 weeks', 'Within a month', 'Specific date'];

const STEPS = ['Service', 'Project', 'Style', 'Details', 'You'];

export default function BriefWizard() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({
    service: 'Logo & Brand', business: '', about: '',
    vibes: [], colours: '', inspiration: '', deadline: 'Flexible', date: '',
    name: '', email: '',
  });

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const toggleVibe = (v) =>
    setF((p) => ({ ...p, vibes: p.vibes.includes(v) ? p.vibes.filter((x) => x !== v) : [...p.vibes, v] }));

  const canNext = () => {
    if (step === 1) return f.business.trim() && f.about.trim();
    if (step === 4) return f.name.trim() && /\S+@\S+\.\S+/.test(f.email);
    return true;
  };

  const submit = () => {
    const brief = [
      `New project brief — Northdraft Studios`,
      ``,
      `Service: ${f.service}`,
      `Business: ${f.business}`,
      `About: ${f.about}`,
      `Style: ${f.vibes.join(', ') || '—'}`,
      `Colours: ${f.colours || '—'}`,
      `Inspiration: ${f.inspiration || '—'}`,
      `Deadline: ${f.deadline}${f.deadline === 'Specific date' && f.date ? ` (${f.date})` : ''}`,
      ``,
      `From: ${f.name} <${f.email}>`,
    ].join('\n');
    window.location.href = `mailto:designs@northwork.app?subject=${encodeURIComponent(
      `Project brief — ${f.business || f.name}`
    )}&body=${encodeURIComponent(brief)}`;
    setSent(true);
  };

  return (
    <PageShell>
      <main className="quote-main wizard">
        <div className="quote-intro">
          <p className="eyebrow">Project Brief</p>
          <h1>Tell us about it.</h1>
          <p className="quote-sub">A few quick questions become a clean brief for your designer. Takes about a minute.</p>
        </div>

        {sent ? (
          <div className="quote-price-card wizard-done">
            <h3>Your brief is ready.</h3>
            <p className="quote-note">We opened an email with your brief — hit send and we'll reply with next steps and a firm quote.</p>
            <Link to="/" className="btn btn-primary">Back to site</Link>
          </div>
        ) : (
          <>
            <div className="wizard-steps">
              {STEPS.map((s, i) => (
                <span key={s} className={`wstep ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                  <b>{i + 1}</b> {s}
                </span>
              ))}
            </div>

            <div className="wizard-card">
              {step === 0 && (
                <div className="quote-field">
                  <span className="quote-label">What do you need?</span>
                  <div className="service-chips">
                    {SERVICES.map((s) => (
                      <button key={s} className={`chip ${f.service === s ? 'active' : ''}`} onClick={() => set('service', s)}>{s}</button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <>
                  <div className="quote-field">
                    <label className="quote-label" htmlFor="biz">Business / project name</label>
                    <input id="biz" className="w-input" value={f.business} onChange={(e) => set('business', e.target.value)} placeholder="e.g. Rivera Coffee" />
                  </div>
                  <div className="quote-field">
                    <label className="quote-label" htmlFor="about">What's it for?</label>
                    <textarea id="about" className="w-input" rows="4" value={f.about} onChange={(e) => set('about', e.target.value)} placeholder="A sentence or two about your business and what you need designed." />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="quote-field">
                    <span className="quote-label">Pick the vibes that fit</span>
                    <div className="opt-chips">
                      {VIBES.map((v) => (
                        <button key={v} className={`chip ${f.vibes.includes(v) ? 'active' : ''}`} onClick={() => toggleVibe(v)}>{v}</button>
                      ))}
                    </div>
                  </div>
                  <div className="quote-field">
                    <label className="quote-label" htmlFor="col">Colours you like (optional)</label>
                    <input id="col" className="w-input" value={f.colours} onChange={(e) => set('colours', e.target.value)} placeholder="e.g. deep blue + warm neutrals, or a hex code" />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="quote-field">
                    <label className="quote-label" htmlFor="insp">Examples or inspiration (optional)</label>
                    <textarea id="insp" className="w-input" rows="3" value={f.inspiration} onChange={(e) => set('inspiration', e.target.value)} placeholder="Links or names of designs you love." />
                  </div>
                  <div className="quote-field">
                    <span className="quote-label">Deadline</span>
                    <div className="opt-chips">
                      {DEADLINES.map((d) => (
                        <button key={d} className={`chip ${f.deadline === d ? 'active' : ''}`} onClick={() => set('deadline', d)}>{d}</button>
                      ))}
                    </div>
                    {f.deadline === 'Specific date' && (
                      <input type="date" className="w-input" value={f.date} onChange={(e) => set('date', e.target.value)} style={{ marginTop: '0.6rem', maxWidth: '220px' }} />
                    )}
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="quote-field">
                    <label className="quote-label" htmlFor="nm">Your name</label>
                    <input id="nm" className="w-input" value={f.name} onChange={(e) => set('name', e.target.value)} />
                  </div>
                  <div className="quote-field">
                    <label className="quote-label" htmlFor="em">Email</label>
                    <input id="em" type="email" className="w-input" value={f.email} onChange={(e) => set('email', e.target.value)} />
                  </div>
                </>
              )}

              <div className="wizard-nav">
                {step > 0 && <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>← Back</button>}
                <span style={{ flex: 1 }} />
                {step < STEPS.length - 1 ? (
                  <button className="btn btn-primary" disabled={!canNext()} onClick={() => canNext() && setStep(step + 1)}>Continue →</button>
                ) : (
                  <button className="btn btn-primary" disabled={!canNext()} onClick={submit}>Send my brief →</button>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </PageShell>
  );
}
