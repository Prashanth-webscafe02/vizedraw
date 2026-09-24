import type { ReactNode } from 'react'
import type { Section } from '../content/types'
import { Blocks } from './content'

interface SpineProps {
  sections: Section[]
  /** Headings rendered as bordered callouts (limitations, boundaries). */
  callouts?: string[]
  /** Extra visual placed beside or below a section, keyed by heading. */
  visuals?: Record<string, ReactNode>
  /** How lists inside sections render. */
  list?: 'rows' | 'bullets' | 'checks' | 'grid'
}

/**
 * Long-form layout: each section heading sits in a left column beside its
 * text. Used where the document gives a page several short sections.
 */
export function Spine({ sections, callouts = [], visuals = {}, list = 'rows' }: SpineProps) {
  return (
    <div className="container spine">
      <div className="spine__body">
        {sections.map((s) => {
          const visual = visuals[s.heading]
          const isCallout = callouts.includes(s.heading)
          return (
            <section
              key={s.id}
              id={s.id}
              className={`spine__section${isCallout ? ' spine__section--callout' : ''}${visual ? ' spine__section--visual' : ''}`}
              aria-labelledby={`${s.id}-h`}
            >
              <h2 id={`${s.id}-h`} className="spine__heading">{s.heading}</h2>
              <div className="spine__text">
                <Blocks blocks={s.blocks} list={list} />
              </div>
              {visual && <div className="spine__visual">{visual}</div>}
            </section>
          )
        })}
      </div>
    </div>
  )
}
