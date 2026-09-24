import { useState } from 'react'
import { blocksOf, firstOf, getPage, paragraphs, section } from '../content'
import { Action } from '../components/Action'
import { FieldText, Hero, ItemList, Meta } from '../components/content'

const page = getPage(19)
const controls = section(page, 'Pricing controls')
const [planControl, currencyControl] = blocksOf(controls, 'kv')
const planOptions = planControl.value.split('|').map((s) => s.trim()) // Individual | Team
const currencyOptions = currencyControl.value.split('|').map((s) => s.trim()) // Global USD | India INR

type PlanType = string
type Currency = string

function Segmented({ legend, name, options, value, onChange }: { legend: string; name: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="pricing-control">
      <legend className="label">{legend}</legend>
      <div className="segmented segmented--lg">
        {options.map((o) => (
          <label key={o} className="segmented__opt">
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}


/** "Individual: {{price}} per year" -> the line for the selected plan type. */
function lineFor(lines: string[], planType: PlanType) {
  return lines.find((l) => l.startsWith(`${planType}:`)) ?? lines[0]
}

function Price({ text, currency }: { text: string; currency: Currency }) {
  const i = text.indexOf(':')
  const label = i > 0 ? text.slice(0, i) : null
  const rest = i > 0 ? text.slice(i + 1).trim() : text
  return (
    <p className="plan__price">
      {label && <span className="plan__price-label">{label}:</span>}{' '}
      <FieldText text={rest} />
      <span className="plan__currency">{currency.split(' ').pop()}</span>
    </p>
  )
}

export default function Pricing() {
  const [planType, setPlanType] = useState<PlanType>(planOptions[0])
  const [currency, setCurrency] = useState<Currency>(currencyOptions[0])
  const isInr = currency.endsWith('INR')

  const free = section(page, 'Free')
  const starter = section(page, 'Starter')
  const pro = section(page, 'Pro')
  const enterprise = section(page, 'Enterprise')
  const before = section(page, 'Before you choose')

  const [freePrice, freeDesc, freeAllowances] = paragraphs(free)
  // Free is $0 in the document; the INR view shows the same zero value in rupees.
  const freePriceShown = isInr ? freePrice.replace('$', '₹') : freePrice

  const paid = [starter, pro].map((s) => {
    const ps = paragraphs(s)
    return { s, lines: ps.slice(0, 2), desc: ps[2], cta: firstOf(s, 'cta') }
  })

  return (
    <>
      <Meta page={page} />
      <Hero page={page} crumbs={[{ label: page.name }]} variant="stacked" />

      <section className="band band--top-rule" id="plans" aria-label={page.name}>
        <div className="container">
          <div className="pricing-controls">
            <Segmented legend={planControl.key} name="plan-type" options={planOptions} value={planType} onChange={setPlanType} />
            <Segmented legend={currencyControl.key} name="currency" options={currencyOptions} value={currency} onChange={setCurrency} />
          </div>

          <div className="plans" aria-live="polite">
            <article className="plan" id={free.id} aria-labelledby={`${free.id}-h`}>
              <h2 id={`${free.id}-h`} className="plan__name">{free.heading}</h2>
              <p className="plan__price">{freePriceShown}</p>
              <p className="plan__desc">{freeDesc}</p>
              <p className="plan__allow"><FieldText text={freeAllowances} /></p>
              <Action cta={firstOf(free, 'cta').primary} className="plan__cta" />
            </article>

            {paid.map(({ s, lines, desc, cta }) => {
              const line = lineFor(lines, planType)
              return (
                <article key={s.id} className={`plan${s.heading === 'Pro' ? ' plan--pro' : ''}`} id={s.id} aria-labelledby={`${s.id}-h`}>
                  <h2 id={`${s.id}-h`} className="plan__name">{s.heading}</h2>
                  <Price text={line} currency={currency} />
                  <p className="plan__desc">{desc}</p>
                  <Action cta={cta.primary} className="plan__cta" />
                </article>
              )
            })}

            <article className="plan plan--enterprise" id={enterprise.id} aria-labelledby={`${enterprise.id}-h`}>
              <h2 id={`${enterprise.id}-h`} className="plan__name">{enterprise.heading}</h2>
              <p className="plan__price plan__price--text">{paragraphs(enterprise)[0]}</p>
              <p className="plan__desc">{paragraphs(enterprise)[1]}</p>
              <Action cta={firstOf(enterprise, 'cta').primary} variant="secondary" className="plan__cta" />
            </article>
          </div>

        </div>
      </section>

      <section className="band band--sunk" id={before.id} aria-labelledby={`${before.id}-h`}>
        <div className="container split split--wide-right">
          <div className="split__aside">
            <h2 id={`${before.id}-h`}>{before.heading}</h2>
          </div>
          <ItemList items={firstOf(before, 'list').items} variant="rows" />
        </div>
      </section>
    </>
  )
}
