import { useState } from "react";
import ArtLightbox, { type Artwork } from "./ArtLightbox";
import { sounds } from "../utils/soundEffects";

const ARTWORKS: Artwork[] = [
  {
    id: "warrior",
    src: "/assets/art-warrior.png",
    title: "ARMORED WARRIOR STUDY",
    medium: "Digital Painting & Costume Design",
    description:
      "A complete full-body study exploring ancient martial silhouettes, ornamental cloth drapery, and spear-handling stance.",
    span: "tall",
  },
  {
    id: "faces",
    src: "/assets/art-faces.png",
    title: "EXPRESSION & FACIAL STUDIES",
    medium: "Pen, Ink & Cross-hatching",
    description:
      "A grid of character archetypes—bearded elders, bespectacled thinkers, street-smart youths—exploring skull topology and caricature.",
    span: "tall",
  },
  {
    id: "blue-1",
    src: "/assets/art-blue-1.png",
    title: "BLUE PENCIL PORTRAIT I",
    medium: "Col-Erase Blue Pencil on Paper",
    description:
      "Expressive, textured sketch capturing contemplative facial gaze with loose, energetic blue linework.",
  },
  {
    id: "blue-2",
    src: "/assets/art-blue-2.png",
    title: "BLUE PENCIL PORTRAIT II",
    medium: "Col-Erase Blue Pencil on Paper",
    description:
      "Profile study of a young woman with tied ponytail, emphasizing fluid contours and minimal shading.",
  },
  {
    id: "helmet",
    src: "/assets/art-helmet.png",
    title: "HELMET PRODUCT DESIGN",
    medium: "Industrial Design Ink Study",
    description:
      "Futuristic motorcycle helmet concept with modular visor mechanics and aerodynamic intake geometry.",
  },
  {
    id: "camera",
    src: "/assets/art-camera.png",
    title: "SONY RETRO CAMERA SKETCH",
    medium: "Ink Line & Marker Shading",
    description:
      "Obsessive technical drawing analyzing dial textures, lens cylinders, and classic rangefinder proportions.",
  },
  {
    id: "lens",
    src: "/assets/art-lens.png",
    title: "CAMERA LENS STUDY",
    medium: "Ink Line & Marker Shading",
    description:
      "Precision study of optical barrel knurling, focal distance rings, and metallic specular reflections.",
  },
];

export default function IllustrationsSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeArt = selectedIndex !== null ? ARTWORKS[selectedIndex] : null;

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % ARTWORKS.length);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + ARTWORKS.length) % ARTWORKS.length);
  };

  return (
    <section className="illustrations-section" id="journal">
      {/* Header matching frame 019 */}
      <div className="illustrations-header-bar">
        {/* Left 2x2 decorative tile badge */}
        <div className="tile-stamp-badge" aria-hidden="true">
          <div className="stamp-tile" />
          <div className="stamp-tile" />
          <div className="stamp-tile" />
          <div className="stamp-tile" />
        </div>

        {/* Right title & text */}
        <div className="illustrations-intro-block">
          <h2 className="chalk-heading illustrations-title">ILLUSTRATIONS</h2>
          <p className="illustrations-statement">
            Illustration is something I deeply enjoy. Constantly exploring my style through
            it not only sharpens my skills but also helps me calm my mind and reconnect with
            my creative process.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="illustrations-grid">
        {ARTWORKS.map((item, idx) => (
          <figure
            key={item.id}
            className={`art-frame interactive ${item.span || ""}`}
            onClick={() => {
              sounds.playPop();
              setSelectedIndex(idx);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedIndex(idx);
              }
            }}
            aria-label={`View ${item.title}`}
          >
            <div className="art-paper-backing">
              <img src={item.src} alt={item.title} loading="lazy" />
              <div className="art-caption-hover">
                <span className="art-caption-title">{item.title}</span>
                <span className="art-caption-medium">{item.medium}</span>
              </div>
            </div>
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      <ArtLightbox
        art={activeArt}
        onClose={() => setSelectedIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
