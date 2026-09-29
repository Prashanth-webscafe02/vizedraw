/** VizeDraw wordmark: a drafting-sheet frame with registration ticks and a V
    drawn as two construction lines meeting on a datum. Replace with the
    approved logo when one exists. */
export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`wordmark${inverse ? ' wordmark--inverse' : ''}`}>
      <svg className="wordmark__mark" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M0 7.5h2.5M21.5 16.5H24M16.5 0v2.5M7.5 21.5V24" stroke="currentColor" strokeWidth="1" />
        <path d="M7 7l5 10 5-10" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinejoin="miter" />
        <circle cx="12" cy="17" r="1.3" fill="currentColor" />
      </svg>
      <span className="wordmark__text">Vize<span>Draw</span></span>
    </span>
  )
}
