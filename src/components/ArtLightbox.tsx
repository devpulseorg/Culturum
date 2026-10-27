import { useEffect } from "react";
import { sounds } from "../utils/soundEffects";

export interface Artwork {
  id: string;
  src: string;
  title: string;
  medium: string;
  description: string;
  span?: string;
}

interface ArtLightboxProps {
  art: Artwork | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function ArtLightbox({ art, onClose, onNext, onPrev }: ArtLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };

    if (art) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [art, onClose, onNext, onPrev]);

  if (!art) return null;

  return (
    <div
      className="art-lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={art.title}
    >
      <div
        className="art-lightbox-paper"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="lightbox-close-btn interactive"
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          aria-label="Close lightbox"
        >
          ✕
        </button>

        <div className="lightbox-image-stage">
          <img src={art.src} alt={art.title} />
        </div>

        <div className="lightbox-info-pane">
          <span className="lightbox-medium-tag">{art.medium}</span>
          <h3 className="lightbox-art-title chalk-heading">{art.title}</h3>
          <p className="lightbox-art-desc">{art.description}</p>

          <div className="lightbox-nav-controls">
            {onPrev && (
              <button
                type="button"
                className="lightbox-nav-btn interactive"
                onClick={() => {
                  sounds.playClick();
                  onPrev();
                }}
              >
                ‹ Previous
              </button>
            )}
            {onNext && (
              <button
                type="button"
                className="lightbox-nav-btn interactive"
                onClick={() => {
                  sounds.playClick();
                  onNext();
                }}
              >
                Next ›
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
