import { useState, useCallback, useEffect } from "react";

export interface LetterModuleData {
  id: string;
  char: string;
  name: string;
  teluguName: string;
  left: number; // percentage of 1123
  top: number; // percentage of 252
  width: number; // percentage of 1123
  height: number; // percentage of 252
  defaultImg: string;
  artImg: string;
  hasFlowAnimation: boolean;
  accentColor: string;
  glowColor: string;
}

const CULTURUM_LETTERS: LetterModuleData[] = [
  {
    id: "letter-c",
    char: "C",
    name: "Classical Indian Nayika",
    teluguName: "శాస్త్రీయ భారతీయ నాయిక",
    left: 0.0,
    top: 0.0,
    width: 18.255,
    height: 100.0,
    defaultImg: "/assets/culturum_letters_isolated/letter_crop_c.png",
    artImg: "/assets/letters_local/c_art.png",
    hasFlowAnimation: true,
    accentColor: "#e11d48",
    glowColor: "rgba(225, 29, 72, 0.45)",
  },
  {
    id: "letter-u1",
    char: "u",
    name: "Classical Harmonium (Sangeet)",
    teluguName: "శాస్త్రీయ హార్మోనియం (సంగీత వాద్యం)",
    left: 18.077,
    top: 27.778,
    width: 13.268,
    height: 71.825,
    defaultImg: "/assets/culturum_letters_isolated/letter_crop_u1.png",
    artImg: "/assets/letters_local/u1_art.png",
    hasFlowAnimation: true,
    accentColor: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.45)",
  },
  {
    id: "letter-l",
    char: "l",
    name: "Classical Bansuri (Flute)",
    teluguName: "శాస్త్రీయ వేణువు / మురళి",
    left: 31.077,
    top: 4.762,
    width: 8.192,
    height: 94.444,
    defaultImg: "/assets/culturum_letters_isolated/letter_crop_l.png",
    artImg: "/assets/letters_local/l_art.png",
    hasFlowAnimation: true,
    accentColor: "#be123c",
    glowColor: "rgba(190, 18, 60, 0.45)",
  },
  {
    id: "letter-t",
    char: "t",
    name: "Classical Saraswati Tanpura",
    teluguName: "శాస్త్రీయ తంబురా (శృతి వాద్యం)",
    left: 37.578,
    top: 14.286,
    width: 10.329,
    height: 84.921,
    defaultImg: "/assets/culturum_letters_isolated/letter_crop_t.png",
    artImg: "/assets/letters_local/t_art.png",
    hasFlowAnimation: true,
    accentColor: "#4d7c0f",
    glowColor: "rgba(77, 124, 15, 0.45)",
  },
  {
    id: "letter-u2",
    char: "u",
    name: "Classical Tabla (Bayan Drum)",
    teluguName: "శాస్త్రీయ తబలా (ఎడమ దాగ వాద్యం)",
    left: 47.729,
    top: 27.778,
    width: 12.021,
    height: 71.825,
    defaultImg: "/assets/culturum_letters_isolated/letter_crop_u2.png",
    artImg: "/assets/letters_local/u2_art.png",
    hasFlowAnimation: true,
    accentColor: "#eab308",
    glowColor: "rgba(234, 179, 8, 0.45)",
  },
  {
    id: "letter-r",
    char: "r",
    name: "Royal Heritage Gaja & Steed",
    teluguName: "రాజరిక గజ & అశ్వ కళారూపం",
    left: 59.662,
    top: 25.794,
    width: 12.467,
    height: 73.413,
    defaultImg: "/assets/culturum_letters_isolated/letter_crop_r.png",
    artImg: "/assets/letters_local/r_art.png",
    hasFlowAnimation: true,
    accentColor: "#ea580c",
    glowColor: "rgba(234, 88, 12, 0.45)",
  },
  {
    id: "letter-u3",
    char: "u",
    name: "Classical Tabla (Dayan Drum)",
    teluguName: "శాస్త్రీయ తబలా (కుడి దాన్ వాద్యం)",
    left: 69.368,
    top: 27.778,
    width: 13.624,
    height: 71.825,
    defaultImg: "/assets/culturum_letters_isolated/letter_crop_u3.png",
    artImg: "/assets/letters_local/u3_art.png",
    hasFlowAnimation: true,
    accentColor: "#d97706",
    glowColor: "rgba(217, 119, 6, 0.45)",
  },
  {
    id: "letter-m",
    char: "m",
    name: "Classical Indian Dholak",
    teluguName: "శాస్త్రీయ ఢోలక్ (తాళ వాద్యం)",
    left: 82.191,
    top: 26.19,
    width: 17.809,
    height: 73.016,
    defaultImg: "/assets/culturum_letters_isolated/letter_crop_m.png",
    artImg: "/assets/letters_local/m_art.png",
    hasFlowAnimation: true,
    accentColor: "#0e7490",
    glowColor: "rgba(14, 116, 144, 0.45)",
  },
];

export default function CulturumWordmark() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [pinnedIdx, setPinnedIdx] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search).get("letter");
      if (p !== null) {
        const val = parseInt(p, 10);
        if (!isNaN(val) && val >= 0 && val < CULTURUM_LETTERS.length) {
          return val;
        }
      }
    }
    return null;
  });

  const activeIdx = hoveredIdx !== null ? hoveredIdx : pinnedIdx;

  // Close pinned letter when clicking/tapping outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".culturum-flow-wordmark")) {
        setPinnedIdx(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, { passive: true });
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setHoveredIdx((idx + 1) % CULTURUM_LETTERS.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setHoveredIdx((idx - 1 + CULTURUM_LETTERS.length) % CULTURUM_LETTERS.length);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setPinnedIdx((curr) => (curr === idx ? null : idx));
      } else if (e.key === "Escape") {
        setHoveredIdx(null);
        setPinnedIdx(null);
      }
    },
    []
  );

  return (
    <div
      className="culturum-flow-wordmark"
      aria-label="Culturum - Where Art Connects"
    >
      <div className="wordmark-canvas-container">
        {CULTURUM_LETTERS.map((letter, idx) => {
          const isActive = activeIdx === idx;

          return (
            <div
              key={letter.id}
              className={`letter-module ${isActive ? "is-bloomed" : ""} ${letter.hasFlowAnimation ? "has-flow" : "idle-module"}`}
              style={
                {
                  left: `${letter.left}%`,
                  top: `${letter.top}%`,
                  width: `${letter.width}%`,
                  height: `${letter.height}%`,
                  "--letter-accent": letter.accentColor,
                  "--letter-glow": letter.glowColor,
                } as React.CSSProperties
              }
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setPinnedIdx((curr) => (curr === idx ? null : idx))}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              role="button"
              tabIndex={0}
              aria-label={`${letter.char} - ${letter.name} (${letter.teluguName})`}
              aria-pressed={pinnedIdx === idx}
            >
              {/* DEFAULT STONE TEXTURED LETTER */}
              <img
                src={letter.defaultImg}
                alt={letter.char}
                className="letter-img letter-stone"
                draggable={false}
              />

              {/* ILLUSTRATED ART LETTER (BLENDED SEAMLESSLY INSIDE LETTER SHAPE) */}
              {letter.artImg && (
                <img
                  src={letter.artImg}
                  alt={`${letter.char} - ${letter.name}`}
                  className="letter-img letter-art"
                  draggable={false}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
