import { useEffect } from "react";
import CulturumWordmark from "./components/CulturumWordmark";
import ScrollTileBorder from "./components/ScrollTileBorder";
import AboutSection from "./components/AboutSection";
import EventsSection from "./components/EventsSection";
import ProcessSection from "./components/ProcessSection";
import VisualJourneySection from "./components/VisualJourneySection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";

function TileBorder() {
  return <div className="tile-border" aria-hidden="true" />;
}

export default function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("section") === "about" || window.location.hash === "#about") {
      setTimeout(() => {
        document.getElementById("about")?.scrollIntoView({ behavior: "instant" });
      }, 100);
    }
  }, []);

  return (
    <main>
      <ScrollTileBorder direction="left" speed={0.7} />

      <section className="hero" id="home">
        <div className="hero-distress-layer" aria-hidden="true" />

        <nav className="nav" aria-label="Main navigation">
          <a href="#about"><span>ABOUT</span><i aria-hidden="true" /></a>
          <a href="#events"><span>EVENT</span><i aria-hidden="true" /></a>
          <a href="#journal"><span>EXPLORE ARTS</span><i aria-hidden="true" /></a>
          <a href="#contact"><span>CONTACT</span><i aria-hidden="true" /></a>
        </nav>

        <CulturumWordmark />
        <div className="discipline" aria-label="Where art connects">
          <span className="discipline-line left" aria-hidden="true" />
          <i className="discipline-star" aria-hidden="true" />
          <p>WHERE ART CONNECTS</p>
          <i className="discipline-star" aria-hidden="true" />
          <span className="discipline-line right" aria-hidden="true" />
        </div>
      </section>

      <ScrollTileBorder direction="left" speed={0.7} />

      <AboutSection />

      <EventsSection />

      <ScrollTileBorder direction="left" speed={0.7} />

      <ProcessSection />

      <TileBorder />

      <VisualJourneySection />

      <ScrollTileBorder direction="left" speed={0.7} />

      <ContactSection />

      <FooterSection />
    </main>
  );
}
