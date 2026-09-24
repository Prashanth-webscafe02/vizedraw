import { firstOf, getPage, paragraphs, section } from '../content'
import { Actions } from '../components/Action'
import { Figure, Hero, Meta } from '../components/content'
import { StackDiagram } from '../components/illustrations'

const page = getPage(20)

export default function Company() {
  const focus = section(page, 'Our focus')
  const principles = section(page, 'What guides the product')
  const role = section(page, 'A focused role in the engineering stack')
  const cta = firstOf(role, 'cta')

  return (
    <>
      <Meta page={page} />
      <Hero page={page} crumbs={[{ label: page.name }]} variant="stacked" />

      <section className="band band--top-rule" id={focus.id} aria-labelledby={`${focus.id}-h`}>
        <div className="container split">
          <h2 id={`${focus.id}-h`}>{focus.heading}</h2>
          <div className="prose">
            <p className="lede">{paragraphs(focus)[0]}</p>
            <p className="pull">{paragraphs(focus)[1]}</p>
          </div>
        </div>
      </section>

      <section className="band band--night" id={principles.id} aria-labelledby={`${principles.id}-h`}>
        <div className="container">
          <div className="section-head">
            <h2 id={`${principles.id}-h`}>{principles.heading}</h2>
          </div>
          <ol className="principles">
            {firstOf(principles, 'list').items.map((item) => (
              <li key={item.term}>
                <h3>{item.term}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band" id={role.id} aria-labelledby={`${role.id}-h`}>
        <div className="container split">
          <div className="prose">
            <h2 id={`${role.id}-h`}>{role.heading}</h2>
            <p className="lede">{paragraphs(role)[0]}</p>
            <Actions primary={cta.primary} secondary={cta.secondary} />
          </div>
          <Figure>
            <StackDiagram />
          </Figure>
        </div>
      </section>
    </>
  )
}
