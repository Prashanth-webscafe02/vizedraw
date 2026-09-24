/** Temporary text wordmark. Replace with the approved VizeDraw logo. */
export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`wordmark${inverse ? ' wordmark--inverse' : ''}`}>
      <svg className="wordmark__mark" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <rect x="1" y="1" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 6l5 8 5-8" fill="none" stroke="var(--redline)" strokeWidth="2" />
      </svg>
      <span className="wordmark__text">VizeDraw</span>
    </span>
  )
}
