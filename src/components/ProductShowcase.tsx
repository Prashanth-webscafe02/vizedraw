import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { DrawingSheet, RecordLedger, ReviewWorkspace, RevisionCompare } from './illustrations'
import { useReducedMotion } from '../hooks/useReducedMotion'

const views = [
  { title: 'Drawing review', content: <ReviewWorkspace /> },
  { title: 'Revision comparison', content: <RevisionCompare /> },
  { title: 'Decision history', content: <div className="showcase__record"><DrawingSheet rev="B" changed cloud label="Illustrative DEMO-104 revision B with its recorded review context" /><RecordLedger /></div> },
]

/** An illustrative product tour, with keyboard-operable tabs. */
export function ProductShowcase() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [visible, setVisible] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [focused, setFocused] = useState(false)
  const [background, setBackground] = useState(false)
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const running = playing && visible && !interacting && !focused && !background && !reduced
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 })
    if (root.current) observer.observe(root.current)
    const onVisibility = () => setBackground(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [])
  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => setActive(value => (value + 1) % views.length), 8000)
    return () => window.clearInterval(timer)
  }, [running, active])
  const select = (index: number) => { setPlaying(false); setActive(index) }
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (event.key === 'ArrowRight') next = (index + 1) % views.length
    else if (event.key === 'ArrowLeft') next = (index + views.length - 1) % views.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = views.length - 1
    else return
    event.preventDefault()
    select(next)
    tabs.current[next]?.focus()
  }
  return (
    <div ref={root} className={`showcase${running ? ' showcase--playing' : ''}${visible ? ' showcase--visible' : ''}`}
      onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
      <div className="showcase__tabs" role="tablist" aria-label="Explore the illustrative workspace">
        {views.map((view, i) => (
          <button key={view.title} ref={el => { tabs.current[i] = el }} type="button" role="tab"
            id={`${id}-tab-${i}`} aria-selected={active === i} aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1} onClick={() => select(i)} onKeyDown={e => navigate(e, i)}>
            {view.title}<span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      {views.map((view, i) => (
        <div key={`${view.title}-${active === i}`} className="showcase__panel" role="tabpanel" id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`} hidden={active !== i} tabIndex={0}>
          <div className="showcase__appbar"><span className="showcase__appname">VizeDraw</span><span>Workspace / DEMO-104</span><span className="showcase__appstatus">Illustrative workspace</span></div>
          <div className="showcase__workspace">
            <aside className="showcase__files" aria-label="Illustrative drawing package">
              <span className="showcase__folder">Drawing package</span>
              <div className="showcase__file">DEMO-104.pdf <span>PDF</span></div>
              <div className="showcase__thumbnail"><DrawingSheet rev={i === 0 ? 'A' : 'B'} label="" /></div>
              <span className="showcase__sheet">Sheet 1 / 1</span>
              <dl><div><dt>Drawing</dt><dd>Access cover</dd></div><div><dt>Revision</dt><dd>{i === 0 ? 'A' : 'B'}</dd></div><div><dt>Review</dt><dd>DEMO-104</dd></div></dl>
            </aside>
            <div className="showcase__view">{view.content}</div>
          </div>
        </div>
      ))}
      <div className="showcase__footer">
        <p className="showcase__caption">Illustrative demo · Fictional drawing DEMO-104</p>
        {!reduced && <button className="showcase__play" type="button" onClick={() => setPlaying(value => !value)} aria-pressed={playing}>
          {playing ? 'Pause tour' : 'Play tour'}<span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span>
        </button>}
      </div>
    </div>
  )
}
