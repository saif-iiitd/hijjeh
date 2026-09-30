import bafterLogo from "../assets/bafter-logo.png";

export const BAFTER_URL = "https://bafter.wordpress.com";
export const BAFTER_NAME = "Barkat Ali Firaq Trust for Education and Research";

/**
 * Two-cell footer. Left: "Game design Saif Ali" and a link to the About page (or back to the game
 * when the About page is open). Right: the BAFTER logo and full name, linking to its website in a
 * new tab, marked "In association with".
 *
 * @param {Object} props
 * @param {boolean} [props.onAboutPage]   True on the About page; the left link then returns to the game.
 */
export function Colophon({ onAboutPage = false }) {
  return (
    <footer className="colophon">
      <div className="credit">
        <small>Game design</small>
        <strong>Saif Ali</strong>
        {onAboutPage
          ? <a className="aboutLink" href="#/">← Back to the game</a>
          : <a className="aboutLink" href="#/about">About Hijjeh →</a>}
      </div>
      <a
        className="affil"
        href={BAFTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={"BAFTER — " + BAFTER_NAME + " (opens the BAFTER website)"}
      >
        <small>In association with</small>
        <img src={bafterLogo} alt="B.A.F.T.E.R" height="20" />
        <span className="affilName">{BAFTER_NAME}</span>
      </a>
    </footer>
  );
}
