import { useEffect } from "react";
import { sounds } from "../utils/soundEffects";

export interface ProjectData {
  id: string;
  title: string;
  type: string;
  image: string;
  bannerImage?: string;
  category: string;
  projectType: string;
  concept: string;
  softwares: string[];
  description: string[];
  characterStudy?: string;
  highlights: string[];
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="project-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="project-modal-paper"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header-bar">
          <button
            type="button"
            className="modal-back-btn"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Back to projects"
          >
            ❮ <span className="back-lbl">BACK</span>
          </button>
          <h2 className="modal-title chalk-heading">{project.title}</h2>
          <button
            type="button"
            className="modal-close-cross"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="modal-content-scroll">
          {/* Top Metadata Banner (like in frame 017) */}
          <div className="case-study-hero">
            <div className="case-meta-box">
              <div className="meta-row">
                <span className="meta-label">PROJECT TYPE —</span>
                <span className="meta-val">{project.projectType}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">CONCEPT —</span>
                <span className="meta-val">{project.concept}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">SOFTWARES USED —</span>
                <div className="softwares-list">
                  {project.softwares.map((sw) => (
                    <span className="sw-tag" key={sw}>
                      {sw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="case-hero-art">
              <img
                src={project.bannerImage || project.image}
                alt={project.title}
              />
              <div className="case-hero-badge">{project.type}</div>
            </div>
          </div>

          {/* Narrative Story Block */}
          <div className="case-body-grid">
            <div className="case-narrative">
              <h3 className="section-subheading">CREATIVE PROCESS &amp; STORY</h3>
              {project.description.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}

              <div className="case-bullet-points">
                <h4>KEY TAKEAWAYS &amp; FOCUS</h4>
                <ul>
                  {project.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Character Lineup or Supporting Art (like in frame 015 & 016) */}
            <div className="case-visual-column">
              {project.characterStudy ? (
                <div className="character-study-box">
                  <h4 className="lineup-title">CHARACTER DEVELOPMENT &amp; LINEUP</h4>
                  <div className="character-img-wrapper">
                    <img
                      src={project.characterStudy}
                      alt="Character lineup"
                      className="character-lineup-img"
                    />
                  </div>
                  <p className="lineup-caption">
                    From rough shapes to expressive line work, every character began with
                    careful observation and historical / personality nuance.
                  </p>
                </div>
              ) : (
                <div className="supporting-art-box">
                  <img src={project.image} alt={project.title} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
