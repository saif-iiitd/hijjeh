// Which look the game uses: "child" (colourful, rewards) or "adult" (the quieter square look).
// Priority: ?look=child|adult  >  the choice saved on this device  >  child.

const STORAGE_KEY = "hijjeh-look";

export function getInitialLook() {
  const wanted = new URLSearchParams(window.location.search).get("look");
  if (wanted === "child" || wanted === "adult") return wanted;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "child" || saved === "adult") return saved;
  } catch (e) {
    /* storage may be blocked */
  }
  return "child";
}

export function rememberLook(look) {
  try {
    localStorage.setItem(STORAGE_KEY, look);
  } catch (e) {
    /* storage may be blocked */
  }
}
