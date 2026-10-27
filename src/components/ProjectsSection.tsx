import { useRef, useState, useEffect } from "react";
import ProjectModal, { type ProjectData } from "./ProjectModal";
import { sounds } from "../utils/soundEffects";

const PROJECTS_DATA: ProjectData[] = [
  {
    id: "makhana",
    title: "MR. MAKHANA",
    type: "Animation & Motion Graphics",
    category: "Brand Campaign",
    image: "/assets/project-folk.png",
    bannerImage: "/assets/contact-reel.png",
    projectType: "Brand Animation / Commercial Motion Design / Visual Storytelling",
    concept: "Campaign Content / Social Media Ads / Product Engineering",
    softwares: [
      "Adobe After Effects",
      "Adobe Premiere",
      "Procreate",
      "Procreate Dreams",
      "Adobe Photoshop",
    ],
    description: [
      "I worked as an animator and motion designer for Mr. Makhana, where I developed the brand's visual identity across products and campaigns.",
      "My role involved crafting engaging visual stories using fluid morphs, vibrant colour palettes, and abstract motion graphics.",
      "Each project challenged me to interpret the narrative through expressive character animation and product-driven storytelling—making every animation a fun, playful blend of style and story.",
      "My first role after graduating pushed me to explore new ideas every day—experimenting with colour, style, and motion to bring stories to life.",
    ],
    characterStudy: "/assets/character-study.png",
    highlights: [
      "Fluid 2D character morphs and transitions",
      "High-energy social media commercial spots",
      "Hand-crafted storyboard to final composite pipeline",
      "Vibrant packaging color palettes in motion",
    ],
  },
  {
    id: "echoes",
    title: "ECHOES OF THE UNKNOWN",
    type: "Animated Short Film",
    category: "Graduation Film",
    image: "/assets/project-echoes.png",
    bannerImage: "/assets/project-echoes.png",
    projectType: "Historical Revisionism / Narrative Short / 2D Animation",
    concept: "Alternate 1857 Indian Timeline / Cinematic Storytelling",
    softwares: ["Procreate Dreams", "Adobe After Effects", "Photoshop", "Premiere Pro"],
    description: [
      "Echoes of the Unknown is an animated short film exploring an alternate timeline where the Indian Rebellion of 1857 succeeded.",
      "Featured at the IIAD Unfold Graduation Showcase, the project required rigorous research into colonial architecture, authentic attire, and cinematic lighting to ground an alternate history in believable emotional reality.",
      "Every frame was painted with expressive brushstrokes and subtle grain to invoke the sensation of a rediscovered historic archive coming to life.",
    ],
    characterStudy: "/assets/character-study.png",
    highlights: [
      "Historically grounded alternate history world-building",
      "Atmospheric oil-and-chalk aesthetic in motion",
      "Cinematic typewriter and archival prologue sequence",
      "Premiered at IIAD Unfold graduation showcase",
    ],
  },
  {
    id: "folklogue",
    title: "FOLKLOGUE STUDIO",
    type: "Animation Internship",
    category: "Studio Residency",
    image: "/assets/project-folk.png",
    bannerImage: "/assets/project-folk.png",
    projectType: "Folklore Adaptation / 2D Character Animation",
    concept: "1 Film + 1 Product Design per Month Structure",
    softwares: ["Procreate", "After Effects", "Photoshop"],
    description: [
      "During my animation residency at Folklogue Studio, I shifted to a rigorous 1 film + 1 product design per month structure.",
      "I created the initial storyboards, established the distinct art style, executed full illustration turnarounds, and animated the finished films.",
      "By the end of my internship, I had completed seven fully animated films celebrating traditional Indian folklore through a bold, modern illustrative lens.",
    ],
    characterStudy: "/assets/character-study.png",
    highlights: [
      "Completed 7 animated short films from concept to delivery",
      "Traditional folk-art aesthetic adapted for digital 2D puppet & hand-drawn rigs",
      "Fast-paced sprint turnaround with strict monthly deadlines",
    ],
  },
  {
    id: "monkey",
    title: "MONKEY MENACE",
    type: "Animated Short Film",
    category: "Character Animation",
    image: "/assets/project-monkey.png",
    bannerImage: "/assets/project-monkey.png",
    projectType: "Character Locomotion / Expressive Pacing",
    concept: "Dynamic Jungle Chase / Frame-by-frame Motion",
    softwares: ["Procreate Dreams", "After Effects", "Photoshop"],
    description: [
      "A fast-paced, character-driven study focusing on organic locomotion, weight, and comedic timing.",
      "Follows a mischievous macaque darting through dense canopies, balancing intricate foliage foregrounds with dynamic silhouette clarity.",
    ],
    highlights: [
      "Exaggerated frame-by-frame character squash and stretch",
      "Multi-plane parallax jungle backgrounds",
      "Rich organic soundscape integration",
    ],
  },
  {
    id: "ink",
    title: "INK & LINE STUDIES",
    type: "Visual Development",
    category: "Exploration & Sketch",
    image: "/assets/project-sketch.png",
    bannerImage: "/assets/project-sketch.png",
    projectType: "Ink Cross-Hatching / Visual Development",
    concept: "Surreal Character Anatomy / Kinetic Sketching",
    softwares: ["Fine-liner Ink", "Procreate", "Photoshop"],
    description: [
      "A personal visual laboratory dedicated to pure drawing craft—combining microscopic cross-hatching with surreal figurative metaphors.",
      "These studies form the psychological and technical backbone behind all my animation character designs.",
    ],
    highlights: [
      "Uncompromising pen-and-ink cross-hatch shading",
      "Surreal surrealist character anatomy",
      "Exploratory character head turnarounds",
    ],
  },
];

export default function ProjectsSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const updateScrollProgress = () => {
    if (!railRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = railRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    const ratio = Math.max(0, Math.min(1, scrollLeft / maxScroll));
    setScrollProgress(ratio);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    rail.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    return () => {
      rail.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || !railRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));

    const maxScroll = railRef.current.scrollWidth - railRef.current.clientWidth;
    railRef.current.scrollTo({
      left: ratio * maxScroll,
      behavior: "smooth",
    });
    sounds.playClick();
  };

  const scrollByDirection = (dir: number) => {
    if (!railRef.current) return;
    const step = Math.min(window.innerWidth * 0.65, 540);
    railRef.current.scrollBy({
      left: dir * step,
      behavior: "smooth",
    });
    sounds.playClick();
  };

  return (
    <section className="projects-section" id="projects">
      {/* Header Bar matching frames 12 & 13 */}
      <div className="projects-header-strip">
        <a
          href="#home"
          className="back-arrow-link interactive"
          onClick={() => sounds.playClick()}
          title="Back to home"
          aria-label="Back to home"
        >
          ❮
        </a>

        <h2 className="chalk-heading projects-title">PROJECTS</h2>

        {/* Draggable/Clickable Horizontal Progress Slider */}
        <div
          className="slider-track-bar interactive"
          ref={trackRef}
          onClick={handleTrackClick}
          role="slider"
          aria-label="Projects slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scrollProgress * 100)}
          tabIndex={0}
        >
          <div
            className="slider-thumb"
            style={{
              left: `calc(${scrollProgress * 100}% - 14px)`,
            }}
          />
        </div>

        {/* Arrow buttons */}
        <div className="carousel-nav-arrows">
          <button
            type="button"
            className="arrow-btn interactive"
            onClick={() => scrollByDirection(-1)}
            aria-label="Previous project"
          >
            ‹
          </button>
          <button
            type="button"
            className="arrow-btn interactive"
            onClick={() => scrollByDirection(1)}
            aria-label="Next project"
          >
            ›
          </button>
        </div>
      </div>

      {/* Horizontal Project Rail on Aged Paper Background */}
      <div className="projects-paper-band">
        <div className="projects-scroll-rail" ref={railRef}>
          {PROJECTS_DATA.map((proj) => (
            <article
              key={proj.id}
              className="project-card interactive"
              onClick={() => {
                sounds.playPop();
                setSelectedProject(proj);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedProject(proj);
                }
              }}
              aria-label={`Open project details for ${proj.title}`}
            >
              <div className="project-card-image-wrap">
                <img src={proj.image} alt={proj.title} loading="lazy" />
                <div className="project-card-scrim">
                  <span className="project-card-category">{proj.category}</span>
                  <h3 className="project-card-title">{proj.title}</h3>
                  <p className="project-card-type">{proj.type}</p>
                  <span className="view-case-study-badge">
                    View Case Study ↗
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
