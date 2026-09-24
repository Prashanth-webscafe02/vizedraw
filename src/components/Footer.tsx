import { Link } from 'react-router'
import { footer } from '../content/site'
import { destinationFor, legalFields, resolveFields } from '../content/commercial'
import { useDialogs } from './dialogs'
import { Wordmark } from './Wordmark'

export function Footer() {
  const { openLegal } = useDialogs()
  const copyright = resolveFields(footer.copyright).map((p) => p.text).join('')

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link to="/" aria-label={`${footer.brand} home`}>
              <Wordmark inverse />
            </Link>
            <p>{footer.tagline}</p>
          </div>
          {footer.columns.map((col) => (
            <nav key={col.heading} className="site-footer__col" aria-label={`${col.heading} links`}>
              <h2 className="label">{col.heading}</h2>
              <ul>
                {col.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="site-footer__bottom">
          <p>{copyright}</p>
          <ul className="site-footer__legal" aria-label="Legal">
            {footer.legal.map((item) => (
              <li key={item.key}>
                {destinationFor(legalFields[item.key]) ? (
                  <a href={destinationFor(legalFields[item.key])!}>{item.label}</a>
                ) : (
                  <button type="button" aria-haspopup="dialog" onClick={() => openLegal(item.key, item.label)}>
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
