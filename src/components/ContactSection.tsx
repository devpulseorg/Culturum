import { useState } from "react";
import { sounds } from "../utils/soundEffects";

const INQUIRY_TYPES = [
  "Artisan Residency & Living Craft",
  "2D Animation & Folklore Visdev",
  "Festivals & Masterclass Booking",
  "Cultural Patronage & General Inquiry",
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: INQUIRY_TYPES[0],
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    sounds.playTap();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      sounds.playPop();
    }, 600);
  };

  return (
    <section className="culturum-contact-section" id="contact">
      <div className="contact-main-grid">
        {/* Left Column: Hand-crafted Stationery Form */}
        <div className="contact-form-column">
          <a
            href="#home"
            className="contact-back-link"
            aria-label="Back to top"
            onClick={() => sounds.playClick()}
          >
            ‹
          </a>

          <div className="contact-title-group">
            <span className="contact-telugu-kicker">సంప్రదించండి • CONNECT WITH CULTURUM</span>
            <h2 className="contact-main-heading">CONNECT<br />WITH US !</h2>
            <p className="contact-subheading">
              Whether you are an indigenous master artisan, a 2D animator, or an arts enthusiast
              eager to support heritage storytelling, our doors and courtyards are always open.
            </p>
          </div>

          {isSubmitted ? (
            <div className="contact-success-box" role="alert">
              <div className="success-icon-wrap">
                <span className="success-namaste">🙏</span>
              </div>
              <h3 className="success-title">ధన్యవాదములు • NAMASTE!</h3>
              <p className="success-message">
                Thank you, <strong>{formData.name}</strong>. Your note has reached the Culturum
                artisan residency team. We will review your inquiry regarding{" "}
                <em>{formData.inquiryType}</em> and get back to you shortly.
              </p>
              <button
                type="button"
                className="success-reset-btn"
                onClick={() => {
                  sounds.playClick();
                  setIsSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    inquiryType: INQUIRY_TYPES[0],
                    message: "",
                  });
                }}
              >
                Send Another Message ↺
              </button>
            </div>
          ) : (
            <form className="culturum-stationery-form" onSubmit={handleSubmit}>
              <div className="form-field-group">
                <label htmlFor="contact-name" className="field-label">
                  Your Full Name <span className="req">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Radhika Sharma"
                  className="stationery-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="contact-email" className="field-label">
                  Email Address <span className="req">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="e.g. radhika@example.com"
                  className="stationery-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="contact-inquiry" className="field-label">
                  Purpose of Inquiry
                </label>
                <select
                  id="contact-inquiry"
                  className="stationery-select"
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                >
                  {INQUIRY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field-group">
                <label htmlFor="contact-message" className="field-label">
                  Your Note or Vision
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell us about your art background, residency interest, or ideas..."
                  className="stationery-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="stationery-submit-btn"
                onClick={() => sounds.playTap()}
              >
                {isSubmitting ? "SENDING NOTE..." : "TRANSMIT INQUIRY →"}
              </button>
            </form>
          )}

          {/* Culturum Social Links */}
          <div className="contact-social-row">
            <span className="social-label">COMMUNITY CHANNELS:</span>
            <div className="social-icons-strip">
              <a
                href="mailto:namaste@culturum.art"
                className="social-pill-link"
                aria-label="Email Culturum"
                onClick={() => sounds.playTap()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>EMAIL</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-pill-link"
                aria-label="Instagram"
                onClick={() => sounds.playTap()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>INSTAGRAM</span>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="social-pill-link"
                aria-label="YouTube / Films"
                onClick={() => sounds.playTap()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                </svg>
                <span>FILMS</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-pill-link"
                aria-label="LinkedIn"
                onClick={() => sounds.playTap()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>ARCHIVE</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Culturum Collective Artisan Visual */}
        <div className="contact-showcase-column">
          <div className="artisan-house-card">
            <div className="house-card-top-bar">
              <span className="house-location-tag">CULTURUM RESIDENCY • HYDERABAD &amp; BENGALURU</span>
              <span className="house-year-tag">EST. 2026</span>
            </div>

            <div className="house-image-frame">
              <img
                src="/Scrolling_images/Yougn_people checking out.png"
                alt="Young artists and animators examining Indian heritage cloth at Culturum Studio"
                className="house-showcase-photo"
                loading="lazy"
              />
              <div className="house-image-caption-strip">
                <p>
                  <em>&ldquo;Where tradition breathes in contemporary light.&rdquo;</em>
                </p>
                <span className="telugu-caption">కళా బంధం • జీవకళా వైభవం</span>
              </div>
            </div>

            <div className="house-card-details">
              <div className="house-detail-item">
                <span className="detail-title">STUDIO HUBS</span>
                <p className="detail-val">
                  Artisan Courtyard (Hyderabad) • Digital Animation Lab (Bengaluru) • Folk Studio (Jaipur)
                </p>
              </div>
              <div className="house-detail-item">
                <span className="detail-title">VISITING RESIDENCY</span>
                <p className="detail-val">
                  Open for visiting animators, illustrators, textile researchers, and cultural documentarians.
                </p>
              </div>
              <div className="house-detail-item">
                <span className="detail-title">DIRECT CONTACT</span>
                <p className="detail-val">
                  namaste@culturum.art • +91 (0) 40 2345 6789
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
