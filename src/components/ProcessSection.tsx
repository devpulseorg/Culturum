import { useState, useRef, useEffect, useCallback } from "react";

interface FolkCharacter {
  id: string;
  name: string;
  image: string;
}

// Top Row: 5 characters (Scrolls LEFT on page scroll)
const TOP_ROW_CHARACTERS: FolkCharacter[] = [
  {
    id: "dancer_mudra",
    name: "Kuchipudi & Bharatanatyam Dancer",
    image: "/assets/characters/char_dancer_mudra.png",
  },
  {
    id: "veena_player",
    name: "Saraswati Veena Maestro",
    image: "/assets/characters/char_veena_player.png",
  },
  {
    id: "bansuri_flutist",
    name: "Folk Bansuri Flutist",
    image: "/assets/characters/char_bansuri_flutist.png",
  },
  {
    id: "royal_horse",
    name: "Ceremonial Festival Stallion",
    image: "/assets/characters/char_royal_horse.png",
  },
  {
    id: "kalamkari_artist",
    name: "Kalamkari Scroll Artisan",
    image: "/assets/characters/char_kalamkari_artist.png",
  },
];

// Bottom Row: 5 characters (Scrolls RIGHT on page scroll - Opposite Direction)
const BOTTOM_ROW_CHARACTERS: FolkCharacter[] = [
  {
    id: "folk_dancer_woman",
    name: "Joyous Manjira Folk Dancer",
    image: "/assets/characters/char_folk_dancer_woman.png",
  },
  {
    id: "mridangam_drummer",
    name: "Mridangam Percussionist",
    image: "/assets/characters/char_mridangam_drummer.png",
  },
  {
    id: "puppet_master",
    name: "Tholu Bommalata Puppeteer",
    image: "/assets/characters/char_puppet_master.png",
  },
  {
    id: "sitar_maestro",
    name: "Classical Sitar Maestro",
    image: "/assets/characters/char_sitar_maestro.png",
  },
  {
    id: "shehnai_player",
    name: "Ceremonial Shehnai Player",
    image: "/assets/characters/char_shehnai_player.png",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll listener for buttery smooth opposite parallax
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Progress from 0 (when top enters screen) to 1 (when bottom leaves screen)
    const totalDist = rect.height + windowH;
    const currentDist = windowH - rect.top;
    const progress = Math.max(-0.2, Math.min(1.2, currentDist / totalDist));

    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Parallax offsets as user scrolls down:
  // Top row glides LEFT (negative X), Bottom row glides RIGHT (positive X)
  const shift = (scrollProgress - 0.45) * 460;
  const topTranslateX = -shift;
  const bottomTranslateX = shift;

  return (
    <section className="characters-tradition-section" id="process" ref={sectionRef}>
      {/* Editorial Header */}
      <div className="characters-header">
        <div className="characters-eyebrow">
          <span className="eyebrow-line" aria-hidden="true" />
          <p>LIVING ARCHIVE &amp; CHARACTER DESIGN</p>
          <span className="eyebrow-line" aria-hidden="true" />
        </div>
        <h2 className="characters-title">
          CHARACTERS WITH<br />A LIVING TRADITION
        </h2>
        <p className="characters-subtitle">
          From temple mudras and devotional veena strings to twirling ghagras and shadow puppets—each
          Culturum character is an authentic celebration of India&apos;s living folklore and musical heritage.
        </p>
        <div className="characters-scroll-hint">
          <span className="hint-arrow">↓</span>
          <span className="hint-text">SCROLL TO WITNESS PARALLAX PROCESSION</span>
          <span className="hint-arrow">↓</span>
        </div>
      </div>

      {/* Dual-Row Opposite Scroll Stage */}
      <div className="characters-stage-container">
        {/* Row 1: 5 Characters (Scrolls Left) */}
        <div className="character-track-row track-row-top" aria-label="Top folklore procession scrolling left">
          <div
            className="character-track-inner"
            style={{
              transform: `translate3d(${topTranslateX}px, 0, 0)`,
              willChange: "transform",
            }}
          >
            {TOP_ROW_CHARACTERS.map((char) => (
              <div key={char.id} className="character-figure-wrap">
                <img
                  src={char.image}
                  alt={char.name}
                  className="character-cutout-img"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: 5 Characters (Scrolls Right - Opposite Direction) */}
        <div className="character-track-row track-row-bottom" aria-label="Bottom folklore procession scrolling right">
          <div
            className="character-track-inner"
            style={{
              transform: `translate3d(${bottomTranslateX}px, 0, 0)`,
              willChange: "transform",
            }}
          >
            {BOTTOM_ROW_CHARACTERS.map((char) => (
              <div key={char.id} className="character-figure-wrap">
                <img
                  src={char.image}
                  alt={char.name}
                  className="character-cutout-img"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
