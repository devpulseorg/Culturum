import { useRef, useEffect } from "react";
import CulturumWordmark from "./components/CulturumWordmark";
import ScrollTileBorder from "./components/ScrollTileBorder";
import AboutSection from "./components/AboutSection";
import EventsSection from "./components/EventsSection";

const projects = [
  {
    image: "/assets/project-echoes.png",
    title: "ECHOES OF THE UNKNOWN",
    type: "Animated Short Film",
    hasBakedText: true,
  },
  {
    image: "/assets/project-folk.png",
    title: "FOLKLORE",
    type: "Character Design",
    hasBakedText: false,
  },
  {
    image: "/assets/project-monkey.png",
    title: "MONKEY MENACE",
    type: "Animated Short Film",
    hasBakedText: true,
  },
  {
    image: "/assets/project-sketch.png",
    title: "INK STUDIES",
    type: "Visual Development",
    hasBakedText: false,
  },
];

const art = [
  ["art-warrior.png", "Armored character study"],
  ["art-faces.png", "Expression and face studies"],
  ["art-blue-1.png", "Blue pencil portrait"],
  ["art-blue-2.png", "Blue pencil character study"],
  ["art-helmet.png", "Helmet product sketch"],
  ["art-camera.png", "Camera product sketch"],
  ["art-lens.png", "Lens product sketch"],
];

function TileBorder() {
  return <div className="tile-border" aria-hidden="true" />;
}

export default function App() {
  const projectRail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("section") === "about" || window.location.hash === "#about") {
      setTimeout(() => {
        document.getElementById("about")?.scrollIntoView({ behavior: "instant" });
      }, 100);
    }
  }, []);

  const scrollProjects = (direction: number) => {
    projectRail.current?.scrollBy({
      left: direction * Math.min(window.innerWidth * 0.72, 620),
      behavior: "smooth",
    });
  };

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
      <TileBorder />

      <section className="process">
        <div className="process-copy">
          <p className="eyebrow">SELECTED PROCESS</p>
          <h2>CHARACTERS WITH<br />A STORY TO TELL</h2>
          <p>
            From rough shapes to expressive line work, every character begins with
            observation, personality, and a little controlled chaos.
          </p>
        </div>
        <img src="/assets/character-study.png" alt="A lineup of illustrated folklore characters" />
      </section>

      <TileBorder />

      <section className="journal" id="journal">
        <header className="journal-title">
          <a href="#home" aria-label="Back to top">‹</a>
          <h2>VISUAL<br />JOURNEY</h2>
          <div className="scribble" aria-hidden="true">◯</div>
        </header>
        <div className="journal-intro">
          <span className="mini-tiles" aria-hidden="true" />
          <div>
            <h3>ILLUSTRATIONS</h3>
            <p>
              Illustration is something I deeply enjoy. Constantly exploring my style
              through it not only sharpens my skills but also helps me calm my mind and
              reconnect with my creative process.
            </p>
          </div>
        </div>
        <div className="art-grid">
          {art.map(([src, alt], index) => (
            <figure className={`art-${index + 1}`} key={src}>
              <img src={`/assets/${src}`} alt={alt} />
            </figure>
          ))}
        </div>
      </section>

      <TileBorder />

      <section className="contact" id="contact">
        <div className="contact-form">
          <a href="#home" className="back" aria-label="Back to top">‹</a>
          <h2>CONNECT<br />WITH ME !</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <label>
              <span>Name</span>
              <input name="name" placeholder="Name" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" placeholder="Email" />
            </label>
            <button type="submit">SUBMIT</button>
          </form>
          <div className="socials" aria-label="Social links">
            <a href="mailto:hello@example.com" aria-label="Email">M</a>
            <a href="#contact" aria-label="LinkedIn">in</a>
            <a href="#contact" aria-label="Instagram">◎</a>
          </div>
        </div>
        <div className="contact-art">
          <img src="/assets/contact-reel.png" alt="Neale Nadar animator and illustrator reel artwork" />
        </div>
      </section>
    </main>
  );
}
