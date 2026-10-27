import { useState } from "react";
import { sounds } from "../utils/soundEffects";

interface LetterConfig {
  id: string;
  pink: string;
  hover: string;
  label: string;
  title: string;
  aspect: string;
}

const LETTERS: LetterConfig[] = [
  {
    id: "n",
    pink: "/assets/letter-n-pink.png",
    hover: "/assets/letter-n-hover.png",
    label: "N",
    title: "Boombox Retro Radio",
    aspect: "240 / 270",
  },
  {
    id: "e",
    pink: "/assets/letter-e-pink.png",
    hover: "/assets/letter-e-hover.png",
    label: "e",
    title: "Purple Kicks & Sneakers",
    aspect: "195 / 270",
  },
  {
    id: "a",
    pink: "/assets/letter-a-pink.png",
    hover: "/assets/letter-a-hover.png",
    label: "a",
    title: "Character Expressions",
    aspect: "210 / 270",
  },
  {
    id: "l",
    pink: "/assets/letter-l-pink.png",
    hover: "/assets/letter-l-hover.png",
    label: "L",
    title: "Cassette Tape & Beats",
    aspect: "185 / 270",
  },
  {
    id: "e2",
    pink: "/assets/letter-e2-pink.png",
    hover: "/assets/letter-e2-hover.png",
    label: "E",
    title: "Vintage Rotary Telephone",
    aspect: "200 / 270",
  },
];

interface WordmarkProps {
  isCulturumMode?: boolean;
}

export default function Wordmark({ isCulturumMode = false }: WordmarkProps) {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [lockedLetters, setLockedLetters] = useState<Record<string, boolean>>({});

  const handleMouseEnter = (id: string) => {
    setHoveredLetter(id);
    sounds.playPop();
  };

  const handleMouseLeave = () => {
    setHoveredLetter(null);
  };

  const handleToggleLock = (id: string) => {
    sounds.playBoing();
    setLockedLetters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isCulturumMode) {
    return (
      <div className="wordmark-hero-area">
        <div className="culturum-logo-wrapper">
          <img
            src="/assets/culturum-logo.png"
            alt="Culturum"
            className="culturum-hero-img"
          />
        </div>
        <div className="discipline-band">
          <span className="discipline-line" />
          <p className="discipline-text">WHERE ART CONNECTS</p>
          <span className="discipline-line" />
        </div>
      </div>
    );
  }

  return (
    <div className="wordmark-hero-area">
      <div className="wordmark-interactive-row" role="banner" aria-label="Neale Nadar">
        {LETTERS.map((letter) => {
          const isFlipped = hoveredLetter === letter.id || lockedLetters[letter.id];

          return (
            <button
              key={letter.id}
              type="button"
              className={`letter-unit ${isFlipped ? "is-hovered" : ""}`}
              style={{ aspectRatio: letter.aspect }}
              onMouseEnter={() => handleMouseEnter(letter.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleToggleLock(letter.id)}
              title={`${letter.label} — ${letter.title} (Click to toggle illustration)`}
              aria-label={`Letter ${letter.label}`}
            >
              {/* Pink Base Letter */}
              <img
                src={letter.pink}
                alt=""
                className={`letter-img letter-pink ${isFlipped ? "fade-out" : "fade-in"}`}
                loading="eager"
              />

              {/* Illustrated Hover Letter */}
              <img
                src={letter.hover}
                alt={letter.title}
                className={`letter-img letter-hover ${isFlipped ? "fade-in active" : "fade-out"}`}
                loading="eager"
              />

              {/* Subtle ink outline effect */}
              <span className="letter-ink-ring" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className="hero-subline-row">
        {/* Hover on it chalk indicator */}
        <div className="hover-indicator" aria-hidden="true">
          <span>Hover on it</span>
          <svg
            className="hover-arrow"
            width="34"
            height="38"
            viewBox="0 0 34 38"
            fill="none"
          >
            <path
              d="M18 34C18 34 22 18 10 10C6 7 2 6 2 6"
              stroke="#A5DBB8"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="4 3"
            />
            <path
              d="M10 28L18 35L26 29"
              stroke="#A5DBB8"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Subtitle from the reel */}
        <p className="hero-role-title">
          ANIMATOR, ILLUSTRATOR, MOTION DESIGNER
        </p>
      </div>
    </div>
  );
}
