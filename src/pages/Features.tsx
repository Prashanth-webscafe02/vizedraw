import { bodySections, firstOf, getPage, paragraphs, section } from '../content'
import { Actions } from '../components/Action'
import { Figure, Hero, Meta } from '../components/content'
import { ReviewWorkspace } from '../components/illustrations'

const page = getPage(9)

export default function Features() {
  const availability = section(page, 'Feature availability')
  const features = bodySections(page, [availability.heading])
  const cta = firstOf(availability, 'cta')

  return (
    <>
      <Meta page={page} />
      <Hero page={page} crumbs={[{ label: page.name }]} variant="stacked">
        <Figure className="figure--wide">
          <ReviewWorkspace />
        </Figure>
      </Hero>

      <div className="band band--top-rule">
        <div className="container">
          <div>
            <ol className="spec-grid">
              {features.map((f) => (
                <li key={f.id} id={f.id} className="spec">
                  <h2 className="spec__title">{f.heading}</h2>
                  <p>{paragraphs(f)[0]}</p>
                </li>
              ))}
            </ol>
            <section id={availability.id} className="note-panel" aria-labelledby={`${availability.id}-h`}>
              <h2 id={`${availability.id}-h`}>{availability.heading}</h2>
              <p>{paragraphs(availability)[0]}</p>
              <Actions primary={cta.primary} secondary={cta.secondary} />
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
