import { Link } from 'react-router'
import { Action } from '../components/Action'
import { Meta } from '../components/content'
import { Workbench } from '../components/studio/Workbench'
import { Instrument } from '../components/studio/Instrument'
import { Transformation } from '../components/studio/Transformation'
import { IndustryScenario } from '../components/studio/Industries'
import { industries } from '../content/solutions'
import { ControlSchedule, GovernanceDiagram } from '../components/studio/Governance'

// Visual-first homepage: short headlines, at most one line of copy per
// section, and the product compositions carry the explanation.

const heroCta = {
  primary: { label: 'Start Free', to: '{{app.signup_url}}' },
  secondary: { label: 'Request Demo', to: '/contact#demo' },
}

const annotations = [
  { k: 'Sheet', v: 'S-101', pos: 'tl' },
  { k: 'Revision', v: 'REV 04', pos: 'tr', accent: true },
  { k: 'Discipline', v: 'Structural', pos: 'ml' },
  { k: 'Set', v: '42 Sheets', pos: 'bl' },
  { k: 'Review status', v: '3 of 5 approved', pos: 'br' },
]

const systems = [
  { k: 'Authoring', v: 'CAD / BIM' },
  { k: 'Record', v: 'PDM / PLM' },
  { k: 'Quality', v: 'QMS' },
  { k: 'Execution', v: 'ERP / Site' },
]

/** Section opener: name and a hairline rule — like a sheet's zone marker. */
function Marker({ name }: { name: string }) {
  return (
    <div className="marker">
      <span className="marker__name">{name}</span>
      <span className="marker__rule" aria-hidden="true" />
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Meta page={{ title: 'VizeDraw — The Workspace for Technical Drawings', description: 'Organize, review, compare, measure and collaborate on technical drawing sets in one controlled workspace.' }} />

      {/* ---------- Hero ---------- */}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="container">
          <div className="home-hero__grid">
            <h1 id="home-title" className="home-hero__title">
              <span className="home-hero__line">Technical Drawings.</span>
              <span className="home-hero__line home-hero__line--soft">Finally, a Workspace</span>
              <span className="home-hero__line"><em>Built Around Them.</em></span>
            </h1>
            <div className="home-hero__aside">
              <p className="home-hero__lede">Organize, review, compare, measure and collaborate on technical drawing sets in one controlled workspace.</p>
              <div className="actions">
                <Action cta={heroCta.primary} variant="primary" />
                <Action cta={heroCta.secondary} variant="secondary" />
              </div>
            </div>
          </div>
        </div>

        <div className="table">
          <div className="container table__inner">
            <ul className="annot" aria-hidden="true">
              {annotations.map((a) => (
                <li key={a.pos} className={`annot__item glass annot__item--${a.pos}${a.accent ? ' is-accent' : ''}`}>
                  <span className="annot__k">{a.k}</span>
                  <span className="annot__v">{a.v}</span>
                </li>
              ))}
            </ul>
            <Workbench />
          </div>
        </div>
      </section>

      {/* ---------- 01 Capabilities ---------- */}
      <section className="sheet-section" aria-labelledby="cap-title">
        <div className="container">
          <Marker name="Workspace" />
          <h2 id="cap-title" className="lead-grid__title lead-title">One workspace. <em>Every drawing.</em></h2>
          <Instrument />
        </div>
      </section>

      {/* ---------- 02 Transformation ---------- */}
      <section className="sheet-section" aria-labelledby="xform-title">
        <div className="container">
          <Marker name="Before / after" />
          <h2 id="xform-title" className="lead-grid__title lead-title">From scattered files to <em>one source.</em></h2>
          <Transformation />
        </div>
      </section>

      {/* ---------- 03 Industries ---------- */}
      <section className="sheet-section" aria-labelledby="ind-title">
        <div className="container">
          <Marker name="Solutions" />
          <div className="lead-row">
            <h2 id="ind-title" className="lead-grid__title lead-title">Built for teams who <em>build from drawings.</em></h2>
            <Link to="/solutions" className="text-link">All solutions</Link>
          </div>
          <div className="industries industries--compact">
            {industries.map((ind) => (
              <IndustryScenario key={ind.id} industry={ind} compact />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 04 Enterprise ---------- */}
      <section className="sheet-section" aria-labelledby="ent-title">
        <div className="container">
          <Marker name="Enterprise" />
          <div className="lead-row">
            <h2 id="ent-title" className="lead-grid__title lead-title">Enterprise control, <em>by design.</em></h2>
            <Link to="/enterprise" className="text-link">Security</Link>
          </div>
          <div className="ent ent--compact">
            <figure className="ent__figure">
              <GovernanceDiagram />
            </figure>
            <ControlSchedule compact />
          </div>
        </div>
      </section>

      {/* ---------- 05 Integrations ---------- */}
      <section className="sheet-section" id="integrations" aria-labelledby="fits-title">
        <div className="container">
          <Marker name="Integrations" />
          <h2 id="fits-title" className="lead-grid__title lead-title">Fits your <em>existing stack.</em></h2>
          <div className="systems" role="group" aria-label="Where VizeDraw sits among existing systems">
            <ul className="systems__row">
              {systems.map((s) => (
                <li key={s.k}>
                  <span className="systems__k">{s.k}</span>
                  <b>{s.v}</b>
                </li>
              ))}
            </ul>
            <div className="systems__layer">
              <span className="systems__wordmark">VizeDraw</span>
              <span>The review layer across all of them</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Closing ---------- */}
      <section className="closing" aria-labelledby="closing-title">
        <div className="container closing__stage">
          <div className="closing__panel glass">
            <h2 id="closing-title">Start with one drawing.</h2>
            <div className="actions">
              <Action cta={heroCta.primary} variant="primary" />
              <Action cta={heroCta.secondary} variant="secondary" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
