import { Link } from 'react-router'
import { firstOf, getPage, paragraphs, section } from '../content'
import { Actions } from '../components/Action'
import { Faq, Figure, Meta, Steps } from '../components/content'
import { ReviewWorkspace, StackDiagram } from '../components/illustrations'

const page = getPage(1)

const useCaseRoutes: Record<string, string> = {
  'Engineering review': '/use-cases/engineering-drawing-review',
  'Supplier and customer review': '/use-cases/external-drawing-review',
  'Revision review': '/use-cases/drawing-revision-review',
  'Production and quality': '/use-cases/production-quality-handoff',
}

/** Split a paragraph into sentences for a line-by-line layout (wording unchanged). */
const sentences = (text: string) => text.match(/[^.]+\./g)?.map((s) => s.trim()) ?? [text]

export default function Home() {
  const hero = section(page, 'Hero')
  const [title, lede] = paragraphs(hero)
  const heroCta = firstOf(hero, 'cta')
  const problem = section(page, 'Problem statement')
  const [scattered, punchline, resolution] = paragraphs(problem)
  const how = section(page, 'How VizeDraw works')
  const handoffs = section(page, 'Built for manufacturing handoffs')
  const fits = section(page, 'Fits around the systems you already use')
  const faq = section(page, 'Homepage questions')
  const closing = section(page, 'Closing conversion')
  const [closingTitle, closingText] = paragraphs(closing)
  const closingCta = firstOf(closing, 'cta')
  const [titleA, titleB] = sentences(title)

  return (
    <>
      <Meta page={page} />

      <section className="hero hero--home">
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1>
              <span className="h1-line">{titleA}</span>{' '}
              <span className="h1-line h1-line--accent">{titleB}</span>
            </h1>
            <div className="hero__intro">
              <p className="lede">{lede}</p>
              <Actions primary={heroCta.primary} secondary={heroCta.secondary} />
            </div>
          </div>
          <div className="hero__visual">
            <Figure>
              <ReviewWorkspace />
            </Figure>
          </div>
        </div>
      </section>

      <section className="band band--night problem" aria-labelledby="problem-title">
        <div className="container problem__grid">
          <div>
            <ol className="problem__lines">
              {sentences(scattered).map((line, i) => (
                <li key={line}><span className="problem__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><span>{line}</span></li>
              ))}
            </ol>
          </div>
          <div className="problem__resolve">
            <h2 id="problem-title">
              {sentences(punchline).map((line, i) => (
                <span key={line} className={`h2-line${i ? ' h2-line--accent' : ''}`}>{line} </span>
              ))}
            </h2>
            <p>{resolution}</p>
          </div>
        </div>
      </section>

      <section className="band" id={how.id} aria-labelledby="how-title">
        <div className="container">
          <div className="section-head">
            <h2 id="how-title">{how.heading}</h2>
          </div>
          <div className="process">
            <Steps items={firstOf(how, 'steps').items} />
          </div>
        </div>
      </section>

      <section className="band band--sunk" id={handoffs.id} aria-labelledby="handoffs-title">
        <div className="container split split--wide-right">
          <div className="split__aside">
            <h2 id="handoffs-title">{handoffs.heading}</h2>
          </div>
          <ul className="link-rows">
            {firstOf(handoffs, 'list').items.map((item) => (
              <li key={item.term}>
                <Link to={useCaseRoutes[item.term ?? ''] ?? '/use-cases'} className="link-row">
                  <span className="link-row__body">
                    <h3>{item.term}</h3>
                    <p>{item.text}</p>
                  </span>
                  <svg className="link-row__arrow" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
                    <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" id={fits.id} aria-labelledby="fits-title">
        <div className="container split">
          <div className="prose">
            <h2 id="fits-title">{fits.heading}</h2>
            <p className="lede">{paragraphs(fits)[0]}</p>
          </div>
          <Figure>
            <StackDiagram />
          </Figure>
        </div>
      </section>

      <section className="band band--rule" id={faq.id} aria-labelledby="faq-title">
        <div className="container split split--wide-right">
          <div className="split__aside">
            <h2 id="faq-title">{faq.heading}</h2>
          </div>
          <Faq items={firstOf(faq, 'faq').items} />
        </div>
      </section>

      <section className="closing" aria-labelledby="closing-title">
        <div className="container">
          <div className="closing__panel">
            <div>
              <h2 id="closing-title">{closingTitle}</h2>
              <p className="lede">{closingText}</p>
            </div>
            <Actions primary={closingCta.primary} secondary={closingCta.secondary} />
          </div>
        </div>
      </section>
    </>
  )
}
