import bafterLogo from "../assets/bafter-logo.png";
import gradeLogo from "../assets/grade-logo.png";

export const BAFTER_URL = "https://bafter.wordpress.com";
export const BAFTER_NAME = "Barkat Ali Firaq Trust for Education and Research";
export const GRADE_URL = "https://ilmpost.wordpress.com/grade/";
export const GRADE_NAME = "Games Research Design and Education Lab";
export { bafterLogo, gradeLogo };

/**
 * Minimal footer. Left: "Game design", then Saif Ali (linked to the GRADE page) and the About link on
 * one line ("Back to the game" when the About page is open). Right: "In association with" the
 * BAFTER and GRADE logos, each in a small white box and linking to its own site in a new tab. The full names of
 * both organisations are on the About page and in each logo's tooltip. The logos shrink on narrow
 * screens so they always fit.
 *
 * @param {Object} props
 * @param {boolean} [props.onAboutPage]   True on the About page; the left link then returns to the game.
 */
export function Colophon({ onAboutPage = false }) {
  return (
    <footer className="colophon">
      <div className="credit">
        <small>Game design</small>
        <div className="creditRow">
          <a className="creditName" href={GRADE_URL} target="_blank" rel="noopener noreferrer">Saif Ali</a>
          {onAboutPage
            ? <a className="aboutLink" href="#/">← Back to the game</a>
            : <a className="aboutLink" href="#/about">About Hijjeh →</a>}
        </div>
      </div>
      <div className="affil">
        <small>In association with</small>
        <div className="logos">
          <a
            href={BAFTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            title={BAFTER_NAME}
            aria-label={"BAFTER — " + BAFTER_NAME + " (opens the BAFTER website)"}
          >
            <img src={bafterLogo} alt="B.A.F.T.E.R" />
          </a>
          <a
            href={GRADE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title={GRADE_NAME}
            aria-label={"GRADE — " + GRADE_NAME + " (opens the GRADE page)"}
          >
            <img src={gradeLogo} alt="GRADE" />
          </a>
        </div>
      </div>
    </footer>
  );
}
