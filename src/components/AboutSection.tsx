import { useState, useEffect, useRef } from "react";
import { sounds } from "../utils/soundEffects";

interface AboutSectionProps {
  isCulturumMode?: boolean;
}

interface PhotoItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  left?: string;
  right?: string;
  baseTop: number;
  mobileLeft?: string;
  mobileRight?: string;
  mobileTop: number;
  speed: number;
  tilt: string;
}

// Exactly matching positions and speeds from the portfolio video (frames 13-20)
// With responsive, safe mobile coordinates that never overflow the viewport
const TEXTBOOK_PHOTOS: PhotoItem[] = [
  {
    id: "artist",
    image: "/Scrolling_images/Textbook_style_artist.png",
    title: "Artist At Work",
    subtitle: "Folklore Master Study",
    left: "26%",
    baseTop: 65,
    mobileLeft: "4%",
    mobileTop: 450,
    speed: 0.35,
    tilt: "-3deg",
  },
  {
    id: "checking",
    image: "/Scrolling_images/Textbook_style_checking.png",
    title: "Gallery Visitors",
    subtitle: "Art Exhibition Scene",
    left: "62%",
    baseTop: 10,
    mobileRight: "4%",
    mobileTop: 40,
    speed: 0.40,
    tilt: "3deg",
  },
  {
    id: "girl",
    image: "/Scrolling_images/Textbook_style_girl.png",
    title: "Young Illustrator",
    subtitle: "Sketchbook Archive",
    left: "86%",
    baseTop: 185,
    mobileRight: "4%",
    mobileTop: 680,
    speed: 0.35,
    tilt: "3.5deg",
  },
  {
    id: "happy_kid",
    image: "/Scrolling_images/Textbook_style_happy_kid.png",
    title: "Happy Explorer",
    subtitle: "Classroom Story",
    left: "44%",
    baseTop: 540,
    mobileLeft: "4%",
    mobileTop: 900,
    speed: 0.40,
    tilt: "-2deg",
  },
  {
    id: "placeholder_1",
    image: "/Scrolling_images/Textbook_style_placeholder_1.png",
    title: "Textbook Study #05",
    subtitle: "Archival Plate",
    left: "81%",
    baseTop: 680,
    mobileLeft: "4%",
    mobileTop: 720,
    speed: 0.50,
    tilt: "-4deg",
  },
  {
    id: "placeholder_2",
    image: "/Scrolling_images/Textbook_style_placeholder_2.png",
    title: "Textbook Study #06",
    subtitle: "Archival Plate",
    left: "58%",
    baseTop: 840,
    mobileRight: "4%",
    mobileTop: 820,
    speed: 0.75,
    tilt: "3deg",
  },
  {
    id: "placeholder_3",
    image: "/Scrolling_images/Textbook_style_placeholder_3.png",
    title: "Textbook Study #07",
    subtitle: "Archival Plate",
    left: "16%",
    baseTop: 990,
    mobileLeft: "26%",
    mobileTop: 920,
    speed: 0.58,
    tilt: "-3deg",
  },
];

export default function AboutSection({ isCulturumMode = false }: AboutSectionProps) {
  const [isPortraitActive, setIsPortraitActive] = useState(false);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<PhotoItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Responsive mobile detector
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax scroll listener: measures progress from when #about reaches viewport top
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, -rect.top);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePortraitEnter = () => {
    setIsPortraitActive(true);
    sounds.playBoing();
  };

  const handlePortraitLeave = () => {
    setIsPortraitActive(false);
  };

  const togglePortrait = () => {
    sounds.playBoing();
    setIsPortraitActive((prev) => !prev);
  };

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      {/* Floating Small Photos Field (Positioned randomly across the section like in the video) */}
      <div className="floating-photos-field" aria-label="Selected textbook illustrations">
        {TEXTBOOK_PHOTOS.map((photo) => {
          // On mobile, only display the 4 authentic textbook illustrations alongside the bio.
          // Blank placeholders are omitted on mobile to eliminate any trailing empty gaps.
          if (isMobile && photo.id.startsWith("placeholder")) {
            return null;
          }

          const isHovered = activePhoto === photo.id;
          const currentLeft = isMobile ? photo.mobileLeft : photo.left;
          const currentRight = isMobile ? photo.mobileRight : photo.right;
          const currentBaseTop = isMobile ? photo.mobileTop : photo.baseTop;
          const parallaxMultiplier = isMobile ? 0.35 : 0.45;
          const yOffset = -(scrollProgress * photo.speed * parallaxMultiplier);

          return (
            <div
              key={photo.id}
              className={`floating-art-photo ${isHovered ? "is-photo-hovered" : ""}`}
              style={{
                top: `${currentBaseTop}px`,
                left: currentLeft ?? "auto",
                right: currentRight ?? "auto",
                transform: isHovered
                  ? `translate3d(0, ${yOffset}px, 0) scale(1.22) rotate(0deg)`
                  : `translate3d(0, ${yOffset}px, 0) rotate(${photo.tilt})`,
              }}
              onMouseEnter={() => {
                setActivePhoto(photo.id);
                sounds.playPop();
              }}
              onMouseLeave={() => setActivePhoto(null)}
              onClick={() => {
                sounds.playTap();
                setSelectedPhotoModal(photo);
              }}
              role="button"
              tabIndex={0}
              title={`View ${photo.title}`}
            >
              <div className="photo-frame">
                <img src={photo.image} alt={photo.title} className="photo-img" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="about-container">
        {/* Left Side: Animated Portrait Frame with "Hover on it / Tap me!" pointer */}
        <div className="portrait-stage-wrapper">
          {/* "Hover on it" / "Tap me!" pointer arrow */}
          <div
            className={`hover-pointer-hint ${isPortraitActive ? "hint-hidden" : ""}`}
            aria-hidden="true"
          >
            <span className="hover-hint-text">{isMobile ? "Tap me!" : "Hover on it"}</span>
            <svg
              className="hover-hint-arrow"
              width="36"
              height="65"
              viewBox="0 0 36 65"
              fill="none"
            >
              <path
                d="M 4 4 C 24 4, 28 18, 28 42 L 28 58"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeDasharray="3 2"
                strokeLinecap="round"
              />
              <path
                d="M 22 52 L 28 60 L 34 52"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Wooden Portrait Frame with Comic Starburst on Hover */}
          <div
            className={`wooden-portrait-stage ${isPortraitActive ? "is-hovered" : ""}`}
            onMouseEnter={handlePortraitEnter}
            onMouseLeave={handlePortraitLeave}
            onClick={togglePortrait}
            role="button"
            tabIndex={0}
            title="Hover or click to hear him speak!"
            aria-label="Neale Nadar cartoon portrait. Hover or tap to animate."
          >
            {/* Idle Face & Frame */}
            <img
              src="/assets/portrait-idle-aligned.png"
              alt="Cartoon portrait of Neale Nadar"
              className={`portrait-img idle-img ${isPortraitActive ? "hidden" : "visible"}`}
            />

            {/* Shouting Face with Comic Action Starburst */}
            <img
              src="/assets/portrait-shout-aligned.png"
              alt="Neale Nadar shouting (I don't like to animate myself tbh) with explosive starburst"
              className={`portrait-img shout-img ${isPortraitActive ? "visible" : "hidden"}`}
            />
          </div>
        </div>

        {/* Right Side: "ABOUT ME" Title & Bio Paragraphs */}
        <div className="about-copy-block">
          <header className="about-header">
            <h2 className="chalk-heading about-title">ABOUT ME</h2>

            {isCulturumMode ? (
              <div className="bio-paragraphs">
                <p className="kicker-tag">OUR STORY</p>
                <p>
                  Culturum is a creative space where art, people and ideas come together. We
                  celebrate creativity in all its forms — from traditional crafts to contemporary
                  expressions.
                </p>
                <p>
                  Our platform brings together artists, learners and enthusiasts through events,
                  showcases and meaningful collaborations, nurturing a community that keeps
                  culture alive and evolving.
                </p>
              </div>
            ) : (
              <div className="bio-paragraphs">
                <p className="bio-lead">
                  Hi, I&apos;m Neale Nadar. I draw things... then make them move... then stare
                  at them until they start staring back at me. That&apos;s when I know the
                  animation is working.
                </p>
                <p className="bio-detail">
                  I&apos;m a design student freshly graduated into the real world, armed with
                  curiosity, coffee, and far too many softwares open at the same time (my laptop
                  deserves a medal).
                </p>
              </div>
            )}

            {/* Animator Stats Row */}
            <div className="animator-stats-row">
              <div className="stat-pill">
                <span className="stat-val">7+</span>
                <span className="stat-lbl">Films Animated</span>
              </div>
              <div className="stat-pill">
                <span className="stat-val">IIAD</span>
                <span className="stat-lbl">Design Graduate</span>
              </div>
              <div className="stat-pill">
                <span className="stat-val">2D / Motion</span>
                <span className="stat-lbl">Specialist</span>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Lightbox Modal for Art Photo Preview */}
      {selectedPhotoModal && (
        <div
          className="art-lightbox-backdrop"
          onClick={() => setSelectedPhotoModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="art-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="art-lightbox-close"
              onClick={() => setSelectedPhotoModal(null)}
              aria-label="Close image preview"
            >
              ×
            </button>
            <img
              src={selectedPhotoModal.image}
              alt={selectedPhotoModal.title}
              className="art-lightbox-img"
            />
            <div className="art-lightbox-details">
              <h3>{selectedPhotoModal.title}</h3>
              <p>{selectedPhotoModal.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
