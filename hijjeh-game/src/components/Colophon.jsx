import bafterLogo from "../assets/bafter-logo.png";

export const BAFTER_URL = "https://bafter.wordpress.com";

/** Credits: game design by Saif Ali; BAFTER as the affiliated organisation (logo links to its site). */
export function Colophon() {
  return (
    <footer className="colophon">
      <span className="credit">
        Game design <strong>Saif Ali</strong>
      </span>
      <a
        className="affil"
        href={BAFTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="BAFTER — Barkat Ali Firaq Trust for Education and Research (opens the BAFTER website)"
      >
        <span>Affiliated organisation</span>
        <img src={bafterLogo} alt="B.A.F.T.E.R" height="18" />
      </a>
    </footer>
  );
}
