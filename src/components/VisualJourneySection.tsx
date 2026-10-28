import { useState } from "react";
import { sounds } from "../utils/soundEffects";

export interface GalleryArtwork {
  id: string;
  title: string;
  category: "HERITAGE RESIDENCY" | "CHARACTER VISDEV" | "MOVEMENT & FORM";
  medium: string;
  year: string;
  src: string;
  alt: string;
  description: string;
  dimensions?: string;
  aspect?: "tall" | "wide" | "square";
}

const GALLERY_WORKS: GalleryArtwork[] = [
  {
    id: "warrior",
    title: "KSHATRIYA WARRIOR",
    category: "CHARACTER VISDEV",
    medium: "Indian Ink, Gouache & Mineral Wash",
    year: "2026",
    src: "/assets/art-warrior.png",
    alt: "Full-body study of an armored warrior with traditional spear and ceremonial dhoti",
    description:
      "A martial silhouette study derived from Eastern Ghats folklore. Explores ancient brass plating, ornamental lungi drapery, and the balance required for animation turnarounds.",
    aspect: "tall",
  },
  {
    id: "faces",
    title: "NAVARASA & FOLK EXPRESSIONS",
    category: "CHARACTER VISDEV",
    medium: "Pen, Walnut Ink & Cross-hatching",
    year: "2026",
    src: "/assets/art-faces.png",
    alt: "Grid of character expression sketches showing diverse facial structures and emotions",
    description:
      "Nine archetypal portraits exploring theatrical expression, skull anatomy, and caricatured emotion inspired by regional Telugu folk performers.",
    aspect: "tall",
  },
  {
    id: "family-heritage",
    title: "HERITAGE RESIDENCY COURTYARD",
    category: "HERITAGE RESIDENCY",
    medium: "Risograph & Tempera on Handloom Canvas",
    year: "2026",
    src: "/Scrolling_images/Family_chekcing out.png",
    alt: "An Indian family admiring grand Kalamkari tapestry under a temple gopuram with classical veenas",
    description:
      "Captured during the annual Culturum open-air residency. A multigenerational family engages with living Cheriyal tapestries alongside temple gopuram vistas and artisanal Saraswati veenas.",
    aspect: "wide",
  },
  {
    id: "blue-pencil-1",
    title: "NATYA MUDRA & GAZE I",
    category: "MOVEMENT & FORM",
    medium: "Cobalt Pencil on Millboard",
    year: "2026",
    src: "/assets/art-blue-1.png",
    alt: "Blue pencil portrait of a contemplative youth with expressive gaze",
    description:
      "Loose, energetic blue pencil sketch capturing contemplative facial stillness and internal gaze before dramatic classical stage movement.",
    aspect: "square",
  },
  {
    id: "young-dialogue",
    title: "THE LIVING CRAFT DIALOGUE",
    category: "HERITAGE RESIDENCY",
    medium: "Earth Pigment & Archival Print on Cotton Rag",
    year: "2026",
    src: "/Scrolling_images/Yougn_people checking out.png",
    alt: "Young art students and animators leaning in to study an ancient Indian painted cloth",
    description:
      "Young contemporary visual artists and animators examining authentic stone-ground Kalamkari cloth sizing up close, discussing character silhouette transfer into 2D motion.",
    aspect: "wide",
  },
  {
    id: "blue-pencil-2",
    title: "NATYA MUDRA & GAZE II",
    category: "MOVEMENT & FORM",
    medium: "Cobalt Pencil on Millboard",
    year: "2026",
    src: "/assets/art-blue-2.png",
    alt: "Profile line study of a young woman with tied hair emphasizing contour",
    description:
      "Profile gesture study exploring the fluid contour of classical Indian dance posture, emphasizing line velocity and facial balance.",
    aspect: "square",
  },
];

const CATEGORIES = ["ALL WORKS", "HERITAGE RESIDENCY", "CHARACTER VISDEV", "MOVEMENT & FORM"] as const;

export default function VisualJourneySection() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL WORKS");
  const [selectedArtwork, setSelectedArtwork] = useState<GalleryArtwork | null>(null);

  const filteredArt = GALLERY_WORKS.filter((item) => {
    if (activeCategory === "ALL WORKS") return true;
    return item.category === activeCategory;
  });

  return (
    <section className="culturum-gallery-section" id="journal">
      {/* Section Header */}
      <div className="gallery-header-row">
        <a
          href="#home"
          className="gallery-back-link"
          aria-label="Back to top"
          onClick={() => sounds.playClick()}
        >
          ‹
        </a>
        <div className="gallery-title-box">
          <span className="gallery-telugu-kicker">దృశ్య ప్రయాణం • CULTURUM ART ARCHIVE</span>
          <h2 className="gallery-main-title">VISUAL JOURNEY</h2>
        </div>
        <div className="gallery-ornament-tile" aria-hidden="true">
          <div className="tile-pattern-cluster">
            <span className="tile-unit" />
            <span className="tile-unit" />
            <span className="tile-unit" />
            <span className="tile-unit" />
          </div>
        </div>
      </div>

      {/* Intro Description & Filter Tabs */}
      <div className="gallery-toolbar-row">
        <p className="gallery-intro-text">
          Our living archive documents the intersection of centuries-old Indian craft
          techniques and modern character animation. Browse our curated residency
          sketches, character visdev lineups, and anatomical studies.
        </p>

        <div className="gallery-filter-tabs" role="tablist" aria-label="Filter gallery artworks">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`filter-pill-btn ${isSelected ? "active" : ""}`}
                onClick={() => {
                  sounds.playTap();
                  setActiveCategory(cat);
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Showcase Grid */}
      <div className="gallery-masonry-grid">
        {filteredArt.map((art) => (
          <article
            key={art.id}
            className={`gallery-art-card ${art.aspect || "square"}`}
            onClick={() => {
              sounds.playTap();
              setSelectedArtwork(art);
            }}
            role="button"
            tabIndex={0}
            aria-label={`View full details for ${art.title}`}
          >
            {/* White Textbook Mat Frame */}
            <div className="art-frame-paper">
              <div className="art-image-viewport">
                <img src={art.src} alt={art.alt} className="art-canvas-img" loading="lazy" />
                <div className="art-hover-overlay">
                  <span className="expand-pill">EXPLORE STUDY ↗</span>
                </div>
              </div>

              {/* Card Meta Footer */}
              <div className="art-card-info">
                <div className="art-info-top">
                  <span className="art-category-badge">{art.category}</span>
                  <span className="art-year-tag">{art.year}</span>
                </div>
                <h3 className="art-card-title">{art.title}</h3>
                <p className="art-medium-label">{art.medium}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Interactive Lightbox Modal */}
      {selectedArtwork && (
        <div
          className="art-lightbox-backdrop"
          onClick={() => {
            sounds.playClick();
            setSelectedArtwork(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={selectedArtwork.title}
        >
          <div
            className="art-lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="art-lightbox-close"
              aria-label="Close artwork details"
              onClick={() => {
                sounds.playClick();
                setSelectedArtwork(null);
              }}
            >
              ✕
            </button>

            <div className="lightbox-image-column">
              <img
                src={selectedArtwork.src}
                alt={selectedArtwork.alt}
                className="lightbox-full-img"
              />
            </div>

            <div className="lightbox-details-column">
              <span className="lightbox-category">{selectedArtwork.category}</span>
              <h2 className="lightbox-title">{selectedArtwork.title}</h2>
              <div className="lightbox-meta-row">
                <span className="meta-item"><strong>Medium:</strong> {selectedArtwork.medium}</span>
                <span className="meta-item"><strong>Archive Year:</strong> {selectedArtwork.year}</span>
              </div>
              <div className="lightbox-rule" />
              <p className="lightbox-desc">{selectedArtwork.description}</p>

              <div className="lightbox-badge-strip">
                <span className="curated-badge">✓ CULTURUM VERIFIED ARCHIVE</span>
                <span className="curated-badge">GI HERITAGE STUDY</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
