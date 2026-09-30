import { Glyph } from "hijjeh";

const box = { display: "grid", placeItems: "center", width: 88, height: 88, border: "1px solid #1c1917", background: "#fff", fontFamily: "var(--urdu)", fontSize: 56 } as React.CSSProperties;

// The same six letters, each centred by measured ink, so tall (ا), low (ر) and small (ھ) forms all sit in the middle of their box.
export function Letters() {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", direction: "rtl" }}>
      {["ا", "ر", "ھ", "ے", "ب", "ٹ"].map(ch => (
        <div key={ch} style={box}><Glyph ch={ch} ready /></div>
      ))}
    </div>
  );
}

// Left: no nudge (before the Urdu font loads). Right: measured and centred. Same letter, same box.
export function NotCentred() {
  const cap = { font: "12px system-ui", textAlign: "center", marginTop: 6, color: "#57534e" } as React.CSSProperties;
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div><div style={box}><Glyph ch="ر" ready={false} /></div><div style={cap}>ready=false</div></div>
      <div><div style={box}><Glyph ch="ر" ready /></div><div style={cap}>ready</div></div>
    </div>
  );
}
