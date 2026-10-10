import { useMemo } from "react";
import womanImg from "../assets/woman-glyph.png";
import birdImg from "../assets/bird-glyph.png";

const LEAF = ["#7a8a4a", "#8a9a5a", "#55705e"];
const FLOWER = ["#ff7a6b", "#f5a000", "#ff8a3d", "#d81f00"];
const FLOWER_CLIP = "polygon(50% 0,63% 25%,93% 18%,75% 44%,100% 62%,70% 68%,64% 100%,50% 78%,36% 100%,30% 68%,0 62%,25% 44%,7% 18%,37% 25%)";

// Leaves (and, on some tiers, flowers) that blow across the screen: min(10 + tier*2, 24) of them.
function blowing(tier) {
  const flowers = tier === 3 || tier >= 5;
  return Array.from({ length: Math.min(10 + tier * 2, 24) }, (_, i) => {
    const f = flowers && i % 3 === 0;
    return {
      top: 60 + (i * 47) % 700,
      w: f ? 18 : 20,
      h: f ? 18 : 11,
      bg: f ? `radial-gradient(circle,#fff3c4 0 22%,${FLOWER[i % 4]} 24%)` : LEAF[i % 3],
      radius: f ? "0" : "100% 0 100% 0",
      clip: f ? FLOWER_CLIP : "none",
      dur: (3.4 + (i % 5) * 0.5).toFixed(1),
      delay: ((i % 7) * 0.3).toFixed(1)
    };
  });
}

/**
 * The reward scene that plays each time the score passes another multiple of 50, laid over the whole screen
 * (it never blocks taps). Every tier shows a "N points!" badge and blowing leaves; from tier 2 the characters
 * from the book (the bird, then the woman, then both, then the singing scene) join in, if the book has them.
 *
 * @param {Object} props
 * @param {{ tier: number, points: number, key: number } | null} props.reward   The scene to play, or null.
 * @param {boolean} props.characters     Whether to show the bird and woman (only the Budhiya book has them).
 */
export function RewardOverlay({ reward, characters }) {
  const pieces = useMemo(() => (reward ? blowing(reward.tier) : []), [reward && reward.key]);
  if (!reward) return null;
  const t = reward.tier;
  const chars = characters;

  return (
    <div className="rewardLayer" aria-hidden="true" key={reward.key}>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="leaf"
          style={{
            top: p.top, width: p.w, height: p.h, background: p.bg, borderRadius: p.radius, clipPath: p.clip,
            animation: `blow7 ${p.dur}s ease-in-out ${p.delay}s both`
          }}
        />
      ))}

      {chars && t === 2 && (
        <div className="rw" style={{ top: 220, animation: "fly7 3.8s linear .3s both" }}>
          <div style={{ animation: "flyy7 .9s ease-in-out infinite" }}><img src={birdImg} alt="" width="64" /></div>
        </div>
      )}
      {chars && t === 3 && (
        <div className="rw" style={{ top: 0, animation: "loop7 5s ease-in-out .2s both" }}><img src={birdImg} alt="" width="64" /></div>
      )}
      {chars && t === 4 && (
        <div className="rw" style={{ bottom: 6, animation: "walk7 5.2s linear .2s both" }}>
          <div className="womanBob" style={{ animation: "bob7 .55s ease-in-out infinite" }}><img src={womanImg} alt="" width="120" /></div>
        </div>
      )}
      {chars && t === 5 && (
        <>
          <div className="rw" style={{ bottom: 150, animation: "walk7 4.6s linear .1s both" }}>
            <div style={{ animation: "hopb7 .5s ease-in-out infinite" }}><img src={birdImg} alt="" width="58" /></div>
          </div>
          <div className="rw" style={{ bottom: 6, animation: "walk7 5.2s linear .9s both" }}>
            <div className="womanBob" style={{ animation: "bob7 .42s ease-in-out infinite" }}><img src={womanImg} alt="" width="120" /></div>
          </div>
        </>
      )}
      {chars && t >= 6 && (
        <>
          <div className="rw" style={{ bottom: 6, animation: "arrive7 6.4s ease-out both" }}>
            <div className="womanBob" style={{ animation: "bob7 .55s ease-in-out 3" }}><img src={womanImg} alt="" width="120" /></div>
          </div>
          {/* the bird lands at her hand: anchored from the bottom so it stays level with her at any screen height */}
          <div className="rw" style={{ bottom: 160, animation: "perch7 6.4s ease-out both" }}>
            <div style={{ transformOrigin: "70% 100%", animation: "chirp7 .6s ease-in-out 1.8s infinite" }}><img src={birdImg} alt="" width="52" /></div>
            <span className="note" style={{ left: -6, top: 0, color: "#1f6fe0", fontSize: 22, animation: "note7 1.6s ease-out 1.9s infinite both" }}>♪</span>
            <span className="note" style={{ left: -2, top: 4, color: "#d81f00", fontSize: 18, animation: "note7 1.6s ease-out 2.4s infinite both" }}>♫</span>
            <span className="note" style={{ left: -8, top: 2, color: "#f5a000", fontSize: 20, animation: "note7 1.6s ease-out 2.9s infinite both" }}>♪</span>
          </div>
        </>
      )}

      <div className="rewardBadgeWrap"><div className="rewardBadge">{reward.points} points!</div></div>
    </div>
  );
}
