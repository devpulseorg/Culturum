import { useState, useRef, useEffect, useCallback } from "react";
import { sounds } from "../utils/soundEffects";

interface FolkCharacter {
  id: string;
  name: string;
  telugu: string;
  artTradition: string;
  image: string;
  widthRatio: number; // for proportional spacing
}

// Top Row: 5 characters (Scrolls LEFT on page scroll)
const TOP_ROW_CHARACTERS: FolkCharacter[] = [
  {
    id: "dancer_mudra",
    name: "KUCHIPUDI & BHARATANATYAM DANCER",
    telugu: "నాట్య మయూరి • ముద్ర సాధన",
    artTradition: "Classical Mudra & Temple Repertoire",
    image: "/assets/characters/char_dancer_mudra.png",
    widthRatio: 1.0,
  },
  {
    id: "veena_player",
    name: "SARASWATI VEENA MAESTRO",
    telugu: "వీణా విద్వాంసుడు • నాద బ్రహ్మ",
    artTradition: "Carnatic String & Classical Yali Carving",
    image: "/assets/characters/char_veena_player.png",
    widthRatio: 1.15,
  },
  {
    id: "bansuri_flutist",
    name: "FOLK BANSURI FLUTIST",
    telugu: "వేణుగాన విలాసం",
    artTradition: "Pastoral Indian Bamboo Flute Melody",
    image: "/assets/characters/char_bansuri_flutist.png",
    widthRatio: 0.9,
  },
  {
    id: "royal_horse",
    name: "CEREMONIAL FESTIVAL STALLION",
    telugu: "ఉత్సవ అశ్వం • రాజ దర్బారు",
    artTradition: "Cheriyal Festival Procession Regalia",
    image: "/assets/characters/char_royal_horse.png",
    widthRatio: 1.5,
  },
  {
    id: "kalamkari_artist",
    name: "KALAMKARI SCROLL MASTER",
    telugu: "కలంకారీ చిత్రకారుడు",
    artTradition: "Natural Stone Pigment & Reed Pen Scroll",
    image: "/assets/characters/char_kalamkari_artist.png",
    widthRatio: 1.25,
  },
];

// Bottom Row: 5 characters (Scrolls RIGHT on page scroll - Opposite Direction)
const BOTTOM_ROW_CHARACTERS: FolkCharacter[] = [
  {
    id: "folk_dancer_woman",
    name: "JOYOUS MANJIRA FOLK DANCER",
    telugu: "జానపద నృత్యం • తాళ నాదం",
    artTradition: "Twirling Ghagra & Brass Cymbal Rhythm",
    image: "/assets/characters/char_folk_dancer_woman.png",
    widthRatio: 1.35,
  },
  {
    id: "mridangam_drummer",
    name: "MRIDANGAM PERCUSSIONIST",
    telugu: "మృదంగ విద్వాంసుడు • లయ సాధన",
    artTradition: "Classical Carnatic Tala & Rhythm",
    image: "/assets/characters/char_mridangam_drummer.png",
    widthRatio: 1.05,
  },
  {
    id: "puppet_master",
    name: "THOLU BOMMALATA PUPPETEER",
    telugu: "తోలుబొమ్మలాట సూత్రధారి",
    artTradition: "Andhra Translucent Leather Shadow Puppetry",
    image: "/assets/characters/char_puppet_master.png",
    widthRatio: 1.3,
  },
  {
    id: "sitar_maestro",
    name: "CLASSICAL SITAR MAESTRO",
    telugu: "సితార్ వాద్య కళాకారుడు",
    artTradition: "Hindustani Classical Raga & Meend",
    image: "/assets/characters/char_sitar_maestro.png",
    widthRatio: 1.0,
  },
  {
    id: "shehnai_player",
    name: "CEREMONIAL SHEHNAI PLAYER",
    telugu: "మంగళ నాదస్వరం • ఉత్సవ శబ్దం",
    artTradition: "Festival Mangalavadya & Brass Bell Horn",
    image: "/assets/characters/char_shehnai_player.png",
    widthRatio: 1.05,
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTooltip, setActiveTooltip] = useState<FolkCharacter | null>(null);

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
              <div
                key={char.id}
                className="character-figure-wrap"
                onMouseEnter={() => {
                  sounds.playTap();
                  setActiveTooltip(char);
                }}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => {
                  sounds.playClick();
                  setActiveTooltip(char);
                }}
                role="button"
                tabIndex={0}
                aria-label={char.name}
              >
                <img
                  src={char.image}
                  alt={char.name}
                  className="character-cutout-img"
                  loading="lazy"
                  draggable={false}
                />
                <div className="character-label-pill">
                  <span className="pill-name">{char.name}</span>
                  <span className="pill-telugu">{char.telugu}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Central Thread Rule */}
        <div className="characters-divider-rule" aria-hidden="true">
          <span className="thread-dash" />
          <span className="thread-center-gem">✦ &nbsp; CULTURUM LIVING HERITAGE PARADE &nbsp; ✦</span>
          <span className="thread-dash" />
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
              <div
                key={char.id}
                className="character-figure-wrap"
                onMouseEnter={() => {
                  sounds.playTap();
                  setActiveTooltip(char);
                }}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => {
                  sounds.playClick();
                  setActiveTooltip(char);
                }}
                role="button"
                tabIndex={0}
                aria-label={char.name}
              >
                <img
                  src={char.image}
                  alt={char.name}
                  className="character-cutout-img"
                  loading="lazy"
                  draggable={false}
                />
                <div className="character-label-pill">
                  <span className="pill-name">{char.name}</span>
                  <span className="pill-telugu">{char.telugu}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Tooltip Card at Bottom of Stage */}
      {activeTooltip && (
        <div className="character-active-card-bar" role="status">
          <div className="active-card-inner">
            <span className="active-badge">ACTIVE CHARACTER FOCUS</span>
            <h3 className="active-name">{activeTooltip.name}</h3>
            <p className="active-telugu">{activeTooltip.telugu}</p>
            <span className="active-tradition">Tradition: {activeTooltip.artTradition}</span>
          </div>
        </div>
      )}
    </section>
  );
}
