import { useEffect, useState } from "react";

/** True while the address ends in `#/about`. Works from a file or any host, and the back button behaves. */
export function useAboutRoute() {
  const read = () => window.location.hash === "#/about";
  const [about, setAbout] = useState(read);

  useEffect(() => {
    const onChange = () => setAbout(read());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  useEffect(() => {
    if (about) window.scrollTo(0, 0);
  }, [about]);

  return about;
}

/** Leave the About page and return to the game. */
export function goToGame() {
  window.location.hash = "";
}
