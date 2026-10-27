import { useState } from "react";
import { sounds } from "../utils/soundEffects";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReelModal, setShowReelModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    sounds.playBoing();
    setIsSubmitted(true);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Left Side: Form & TV Animator */}
        <div className="contact-left-col">
          <a
            href="#home"
            className="contact-back-link interactive"
            onClick={() => sounds.playClick()}
            aria-label="Back to home"
          >
            ❮
          </a>

          <h2 className="chalk-heading contact-heading">
            CONNECT<br />WITH ME !
          </h2>

          {isSubmitted ? (
            <div className="contact-success-card">
              <span className="success-emoji">✨</span>
              <h3>MESSAGE SENT!</h3>
              <p>
                Thanks for reaching out, {formData.name}! I&apos;ll get back to you with
                coffee and sketches shortly.
              </p>
              <button
                type="button"
                className="reset-btn interactive"
                onClick={() => {
                  sounds.playClick();
                  setIsSubmitted(false);
                  setFormData({ name: "", email: "", message: "" });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form-block" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="name-input" className="sr-only">
                  Name
                </label>
                <input
                  id="name-input"
                  name="name"
                  type="text"
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="chalk-input"
                />
              </div>

              <div className="input-group">
                <label htmlFor="email-input" className="sr-only">
                  Email
                </label>
                <input
                  id="email-input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="chalk-input"
                />
              </div>

              <div className="input-group">
                <label htmlFor="message-input" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message-input"
                  name="message"
                  placeholder="Project details or message..."
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="chalk-input chalk-textarea"
                />
              </div>

              <button
                type="submit"
                className="contact-submit-btn interactive"
                onClick={() => sounds.playClick()}
              >
                SUBMIT
              </button>
            </form>
          )}

          {/* Authentic Social Badges from Reel */}
          <div className="social-links-row" aria-label="Social Profiles">
            {/* Gmail */}
            <a
              href="mailto:neale.nadar@gmail.com"
              className="social-badge gmail-badge interactive"
              title="Email me via Gmail"
              aria-label="Email"
              onClick={() => sounds.playClick()}
            >
              <svg width="22" height="18" viewBox="0 0 24 19" fill="none">
                <path
                  d="M1.5 17.5V4.5C1.5 3.1 2.6 2 4 2H6L12 7L18 2H20C21.4 2 22.5 3.1 22.5 4.5V17.5C22.5 18.3 21.8 19 21 19H3C2.2 19 1.5 18.3 1.5 17.5Z"
                  fill="#EA4335"
                />
                <path
                  d="M22.5 4.5L12 12.5L1.5 4.5"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-badge linkedin-badge interactive"
              title="Connect on LinkedIn"
              aria-label="LinkedIn"
              onClick={() => sounds.playClick()}
            >
              <span className="li-text">in</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/neale_nadar/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-badge instagram-badge interactive"
              title="Follow on Instagram (@neale_nadar)"
              aria-label="Instagram"
              onClick={() => sounds.playClick()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="6"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />
                <circle cx="12" cy="12" r="5" stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx="18" cy="6" r="1.5" fill="#FFFFFF" />
              </svg>
            </a>

            {/* Vimeo */}
            <button
              type="button"
              className="social-badge vimeo-badge interactive"
              title="Watch Showreel on Vimeo"
              aria-label="Showreel on Vimeo"
              onClick={() => {
                sounds.playPop();
                setShowReelModal(true);
              }}
            >
              <span className="vimeo-text">v</span>
            </button>
          </div>

          {/* Chalk TV-head animator illustration from Frame 021 */}
          <div className="tv-animator-illustration" aria-hidden="true">
            <img
              src="/assets/tv-animator-clean.png"
              alt=""
              className="tv-animator-img"
            />
          </div>
        </div>

        {/* Right Side: Framed Brick Wall Showcase Art */}
        <div className="contact-right-col">
          <div
            className="contact-reel-frame interactive"
            onClick={() => {
              sounds.playPop();
              setShowReelModal(true);
            }}
            role="button"
            tabIndex={0}
            title="Click to play 2D Animator & Illustrator showreel"
            aria-label="Neale Nadar 2D Animator and Illustrator showreel"
          >
            <img
              src="/assets/contact-reel.png"
              alt="Neale Nadar 2D Animator and Illustrator gallery"
              className="contact-reel-art"
            />
            <div className="reel-play-overlay">
              <div className="play-button-disc">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5V19L19 12L8 5Z" />
                </svg>
              </div>
              <span className="play-hint-text">WATCH SHOWREEL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Showreel Modal */}
      {showReelModal && (
        <div
          className="reel-modal-backdrop"
          onClick={() => setShowReelModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="reel-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="reel-modal-header">
              <h3>NEALE NADAR — ANIMATION &amp; ILLUSTRATION REEL</h3>
              <button
                type="button"
                className="close-reel-btn interactive"
                onClick={() => setShowReelModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="reel-video-wrapper">
              <video
                controls
                autoPlay
                className="reel-video-player"
                poster="/assets/contact-reel.png"
              >
                <source
                  src="/assets/reel.mp4"
                  type="video/mp4"
                />
                Your browser does not support video playback.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
