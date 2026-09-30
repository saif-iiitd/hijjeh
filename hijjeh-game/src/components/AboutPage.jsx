import { ABOUT } from "../data/about.js";
import { BAFTER_URL, BAFTER_NAME, GRADE_URL, GRADE_NAME, bafterLogo, gradeLogo } from "./Colophon.jsx";

const num = i => String(i + 1).padStart(2, "0");

/**
 * The About page: back button, title, numbered sections (the game, the series, the poet, BAFTER) and
 * "The books" with each cover and, where set, a Buy on Amazon button, and "Credits" with the full
 * names of Saif Ali and the two organisations. Wording lives in `src/data/about.js`. The app shows it in place of the game when the address ends in `#/about`.
 *
 * @param {Object} props
 * @param {import("../data/types.js").Book[]} props.books   The installed books, listed with cover and Buy link.
 * @param {() => void} props.onBack                         Called when the player taps "Back to the game".
 */
export function AboutPage({ books, onBack }) {
  return (
    <main className="page aboutPage">
      <button className="aboutBack" onClick={onBack}>← Back to the game</button>

      <header className="aboutHead">
        <span className="aboutUrdu" lang="ur">{ABOUT.urduTitle}</span>
        <h1>{ABOUT.title}</h1>
      </header>

      {ABOUT.sections.map((s, i) => (
        <section key={s.heading} className="aboutSection">
          <h2><span className="aboutNum">{num(i)}</span>{s.heading}</h2>
          {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
          {s.list && (
            <div className="aboutList">
              {s.list.map((li, j) => <div key={j}><span>–</span><span>{li}</span></div>)}
            </div>
          )}
          {s.site && (
            <p>
              <a className="aboutSite" href={BAFTER_URL} target="_blank" rel="noopener noreferrer">bafter.wordpress.com ↗</a>
            </p>
          )}
        </section>
      ))}

      {books.length > 0 && (
        <section className="aboutSection">
          <h2><span className="aboutNum">{num(ABOUT.sections.length)}</span>The books</h2>
          <div className="aboutBooks">
            {books.map(b => (
              <div key={b.id} className="aboutBook" style={{ "--accent": b.accent }}>
                {b.cover && <img src={b.cover} alt="" width="48" height="68" />}
                <div>
                  <div className="aboutBookUr" lang="ur">{b.title}</div>
                  <div className="aboutBookEn">{b.titleEn}</div>
                  {b.author && <div className="aboutBookBy">A poem by {b.author}</div>}
                  {b.buyUrl && (
                    <a className="buyLink" href={b.buyUrl} target="_blank" rel="noopener noreferrer">Buy on Amazon ↗</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="aboutSection">
        <h2><span className="aboutNum">{num(ABOUT.sections.length + (books.length > 0 ? 1 : 0))}</span>Credits</h2>
        <div className="aboutCredits">
          <div className="aboutCredit">
            <div>
              <div className="aboutCreditRole">Game design</div>
              <a className="aboutCreditName" href={GRADE_URL} target="_blank" rel="noopener noreferrer">Saif Ali</a>
            </div>
          </div>
          <div className="aboutCredit">
            <a href={BAFTER_URL} target="_blank" rel="noopener noreferrer" aria-label={"BAFTER — " + BAFTER_NAME}>
              <img src={bafterLogo} alt="B.A.F.T.E.R" />
            </a>
            <div>
              <div className="aboutCreditRole">In association with</div>
              <a className="aboutCreditName" href={BAFTER_URL} target="_blank" rel="noopener noreferrer">{BAFTER_NAME}</a>
            </div>
          </div>
          <div className="aboutCredit">
            <a href={GRADE_URL} target="_blank" rel="noopener noreferrer" aria-label={"GRADE — " + GRADE_NAME}>
              <img src={gradeLogo} alt="GRADE" />
            </a>
            <div>
              <div className="aboutCreditRole">In association with</div>
              <a className="aboutCreditName" href={GRADE_URL} target="_blank" rel="noopener noreferrer">{GRADE_NAME}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
