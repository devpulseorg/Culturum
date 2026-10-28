import { useState } from "react";
import { sounds } from "../utils/soundEffects";

interface ProcessStep {
  step: string;
  title: string;
  telugu: string;
  desc: string;
  tags: string[];
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Archival Field Immersion",
    telugu: "క్షేత్ర పరిశోధన",
    desc: "Direct residency with multigenerational master artisans across Telangana, Andhra, and Rajasthan—documenting oral folk epics, natural stone pigments, and ancestral temple iconography.",
    tags: ["Field Audio & Sketches", "Cheriyal & Kalamkari", "Mineral Pigment Sizing"],
  },
  {
    step: "02",
    title: "Character & Visual Visdev",
    telugu: "పాత్ర రూపకల్పన",
    desc: "Translating classical theatrical stances, Natya Shastra mudras, and leather shadow puppetry silhouettes into dynamic 2D animation character turnarounds.",
    tags: ["Anatomical Silhouettes", "Costume Drapery", "Expression Sheets"],
  },
  {
    step: "03",
    title: "Living Repertoire & Residencies",
    telugu: "జీవకళా ప్రదర్శన",
    desc: "Bridging the gap between heritage and modern storytelling through collaborative masterclasses, living craft carnivals, and open-air student mentorship labs.",
    tags: ["Open Masterclasses", "2D Motion Film", "Community Archives"],
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="culturum-process-section" id="process">
      <div className="process-header-wrap">
        <div className="process-eyebrow-row">
          <span className="process-kicker-line" aria-hidden="true" />
          <p className="process-kicker">LIVING ARCHIVE &amp; VISUAL DEVELOPMENT</p>
          <span className="process-kicker-line" aria-hidden="true" />
        </div>
        <h2 className="process-main-title">
          CHARACTERS WITH<br />A LIVING TRADITION
        </h2>
        <p className="process-lead-text">
          From rough earth-tone shapes to fluid, expressive linework—every character
          at Culturum is born from deep field observation, millenary folklore, and a little
          controlled artistic chaos.
        </p>
      </div>

      <div className="process-body-grid">
        {/* Left Column: Interactive Methodology Steps */}
        <div className="process-steps-container">
          <div className="steps-nav-header">
            <span className="steps-label">STUDIO METHODOLOGY</span>
            <span className="steps-count">0{activeStep + 1} / 03</span>
          </div>

          <div className="process-steps-list" role="tablist" aria-label="Process methodology steps">
            {PROCESS_STEPS.map((item, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={item.step}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`process-step-card ${isActive ? "active" : ""}`}
                  onClick={() => {
                    sounds.playTap();
                    setActiveStep(index);
                  }}
                >
                  <div className="step-card-top">
                    <span className="step-num">{item.step}</span>
                    <span className="step-telugu">{item.telugu}</span>
                  </div>
                  <h3 className="step-title">{item.title}</h3>
                  <p className="step-desc">{item.desc}</p>
                  <div className="step-tags-wrap">
                    {item.tags.map((tag) => (
                      <span key={tag} className="step-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Character Study Artwork Frame */}
        <div className="process-artwork-column">
          <div className="artwork-mat-frame">
            {/* Header Plate of Mat */}
            <div className="mat-frame-header">
              <div className="mat-brass-rivet" aria-hidden="true" />
              <div className="mat-plate-text">
                <span className="plate-kicker">ARCHIVAL VISUAL STUDY • CULTURUM 2026</span>
                <span className="plate-title">INDIAN FOLKLORE CHARACTER ENSEMBLE</span>
              </div>
              <div className="mat-brass-rivet" aria-hidden="true" />
            </div>

            {/* Main Visual Image */}
            <div className="mat-image-wrapper">
              <img
                src="/assets/character-study.png"
                alt="A lineup of illustrated folklore characters in traditional attire with spears and ornate sarees"
                className="process-showcase-img"
                loading="lazy"
              />
              <div className="image-blueprint-overlay" aria-hidden="true" />
            </div>

            {/* Caption Plate at Bottom */}
            <div className="mat-frame-footer">
              <div className="mat-footer-meta">
                <span className="meta-badge">STAGE {PROCESS_STEPS[activeStep].step} ACTIVE FOCUS</span>
                <p className="meta-caption">
                  {activeStep === 0 && "Field sketches from artisan hamlets capturing classical stances and weapon drapery."}
                  {activeStep === 1 && "2D character turnarounds establishing silhouette distinctness, weight, and volume."}
                  {activeStep === 2 && "Final color passes using stone mineral palette calibrated for animation & print."}
                </p>
              </div>
              <div className="mat-stamp-seal">
                <span className="stamp-circle">GI CRAFT</span>
                <span className="stamp-sub">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
