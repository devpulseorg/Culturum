import { sounds } from "../utils/soundEffects";

export default function FooterSection() {
  const scrollToTop = () => {
    sounds.playTap();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="culturum-site-footer">
      <div className="footer-top-rule" aria-hidden="true">
        <span className="rule-diamond" />
        <span className="rule-line" />
        <span className="rule-star">✦</span>
        <span className="rule-line" />
        <span className="rule-diamond" />
      </div>

      <div className="footer-main-container">
        {/* Brand Column */}
        <div className="footer-brand-column">
          <div className="footer-brand-header">
            <h2 className="footer-brand-title">CULTURUM</h2>
            <p className="footer-brand-tagline">WHERE ART CONNECTS</p>
          </div>
          <p className="footer-cultural-quote">
            &ldquo;Celebrating the living pulse of Indian indigenous art, folklore narratives,
            and contemporary visual storytelling.&rdquo;
          </p>
          <div className="footer-telugu-blessing">
            <span>కళా బంధం • సంస్కృతి సాధన • జీవకళా వైభవం</span>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="footer-nav-column">
          <h3 className="footer-nav-heading">NAVIGATION</h3>
          <ul className="footer-links-list">
            <li>
              <a href="#home" onClick={() => sounds.playTap()}>Home Top</a>
            </li>
            <li>
              <a href="#about" onClick={() => sounds.playTap()}>About Culturum</a>
            </li>
            <li>
              <a href="#events" onClick={() => sounds.playTap()}>Events &amp; Projects</a>
            </li>
            <li>
              <a href="#process" onClick={() => sounds.playTap()}>Living Archive &amp; Visdev</a>
            </li>
            <li>
              <a href="#journal" onClick={() => sounds.playTap()}>Visual Journey Gallery</a>
            </li>
            <li>
              <a href="#contact" onClick={() => sounds.playTap()}>Connect with Us</a>
            </li>
          </ul>
        </div>

        {/* Residencies Column */}
        <div className="footer-nav-column">
          <h3 className="footer-nav-heading">STUDIO RESIDENCIES</h3>
          <ul className="footer-links-list">
            <li>
              <span className="loc-title">Hyderabad Artisan Courtyard</span>
              <span className="loc-sub">Kalamkari &amp; Cheriyal Masterclasses</span>
            </li>
            <li>
              <span className="loc-title">Bengaluru Digital Lab</span>
              <span className="loc-sub">2D Animation &amp; Folklore Visdev</span>
            </li>
            <li>
              <span className="loc-title">Jaipur Folk Pavilion</span>
              <span className="loc-sub">Woodblock &amp; Miniature Traditions</span>
            </li>
          </ul>
        </div>

        {/* Back to Top Column */}
        <div className="footer-action-column">
          <button
            type="button"
            className="footer-back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top of page"
          >
            <span className="arrow-icon">↑</span>
            <span className="btn-label">BACK TO TOP</span>
          </button>
          <div className="footer-quick-badge">
            <span className="badge-dot" />
            <span className="badge-text">2026 RESIDENCY CALL OPEN</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} Culturum Creative Collective. Hand-crafted with reverence for living Indian arts.
        </p>
        <div className="footer-sub-links">
          <span>Telugu &amp; Devanagari Typography</span>
          <span className="dot-sep">•</span>
          <span>Open-Source Living Heritage</span>
        </div>
      </div>
    </footer>
  );
}
