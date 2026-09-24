import { firstOf, getPage, paragraphs, section } from '../content'
import { Actions } from '../components/Action'
import { Figure, Hero, Meta } from '../components/content'
import { DrawingSheet } from '../components/illustrations'

const page = getPage(11)

export default function DrawingKnowledge() {
  const belongs = section(page, 'What belongs to drawing knowledge')
  const gap = section(page, 'The Drawing Knowledge Gap')
  const intent = section(page, 'Recorded knowledge is not inferred intent')
  const readiness = section(page, 'Drawing readiness')
  const helps = section(page, 'How VizeDraw helps')
  const helpsCta = firstOf(helps, 'cta')
  const parts = firstOf(belongs, 'list').items

  return (
    <>
      <Meta page={page} />
      <Hero page={page} crumbs={[{ label: page.name }]} variant="stacked" />

      <section className="band band--top-rule" id={belongs.id} aria-labelledby={`${belongs.id}-h`}>
        <div className="container">
          <div className="section-head section-head--center">
            <h2 id={`${belongs.id}-h`}>{belongs.heading}</h2>
          </div>
          <div className="anatomy">
            <Figure className="anatomy__figure">
              <DrawingSheet rev="B" cloud pin label="Illustrative drawing sheet DEMO-104 at the centre of its recorded context" />
            </Figure>
            <ol className="anatomy__parts">
              {parts.map((item, i) => (
                <li key={item.term} className={`anatomy__part anatomy__part--${i + 1}`}>
                  <h3>{item.term}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="band band--night" id={gap.id} aria-labelledby={`${gap.id}-h`}>
        <div className="container split">
          <h2 id={`${gap.id}-h`}>{gap.heading}</h2>
          <div className="prose">
            <p className="lede lede--night">{paragraphs(gap)[0]}</p>
            <p>{paragraphs(gap)[1]}</p>
          </div>
        </div>
      </section>

      <section className="band" aria-label={`${intent.heading}; ${readiness.heading}`}>
        <div className="container duo">
          <div id={intent.id} className="duo__item">
            <h2>{intent.heading}</h2>
            <p>{paragraphs(intent)[0]}</p>
          </div>
          <div id={readiness.id} className="duo__item">
            <h2>{readiness.heading}</h2>
            <p>{paragraphs(readiness)[0]}</p>
          </div>
        </div>
      </section>

      <section className="closing" id={helps.id} aria-labelledby={`${helps.id}-h`}>
        <div className="container">
          <div className="closing__panel">
            <div>
              <h2 id={`${helps.id}-h`}>{helps.heading}</h2>
              <p className="lede">{paragraphs(helps)[0]}</p>
            </div>
            <Actions primary={helpsCta.primary} secondary={helpsCta.secondary} />
          </div>
        </div>
      </section>
    </>
  )
}
