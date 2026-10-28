import { useState, useRef, useEffect, useCallback } from "react";
import { sounds } from "../utils/soundEffects";

export interface CulturumEvent {
  id: string;
  title: string;
  badge: string;
  category: string;
  date: string;
  venue: string;
  image: string;
  tagline: string;
  description: string[];
  highlights: string[];
  schedule: string;
  capacity: string;
}

export const CULTURUM_EVENTS: CulturumEvent[] = [
  {
    id: "kala-utsav",
    title: "KALA UTSAV",
    badge: "ANNUAL CRAFT FEST",
    category: "Heritage Masterclasses & Living Craft",
    date: "NOV 15–18, 2026",
    venue: "Hyderabad Cultural Center & Artisan Courtyard",
    image: "/assets/events/event_kala_utsav.jpg",
    tagline: "Hands-on Masterclasses with Living Heritage Artisans",
    description: [
      "Kala Utsav is Culturum's flagship annual heritage festival bringing together master craftsmen, indigenous painters, and contemporary creators under one open-air courtyard.",
      "Participate in full-day immersive masterclasses in Cheriyal scroll painting, natural vegetable Kalamkari dye techniques, and Nirmal lacquered woodwork.",
      "Engage in direct dialogue with generational artisans, learning ancient pigment preparation, squirrel-hair brushwork, and cloth sizing passed down through millennia.",
    ],
    highlights: [
      "Live Cheriyal & Kalamkari open painting arenas",
      "Hands-on wheel throwing & terracotta studio",
      "Natural stone pigment grinding & cloth sizing workshops",
      "Authentic artisan marketplace with verified GI-tagged crafts",
    ],
    schedule: "4 Days • 10:00 AM – 8:00 PM Daily",
    capacity: "Limited to 150 participants per workshop track",
  },
  {
    id: "drishya-katha",
    title: "DRISHYA KATHA",
    badge: "ANIMATION LAB",
    category: "2D Motion & Folklore Storytelling",
    date: "DEC 06–08, 2026",
    venue: "Culturum Studio Residency & Digital Hub",
    image: "/assets/events/event_drishya_animation.jpg",
    tagline: "Reimagining Indian Mythology Through Contemporary 2D Animation",
    description: [
      "Drishya Katha is an intensive 3-day animation residency where animators, illustrators, and visual storytellers bridge classical Indian iconography with fluid 2D motion.",
      "From pencil roughs on traditional lightboxes to digital compositing in Procreate Dreams and After Effects, explore character motion inspired by Bharatanatyam mudras and temple sculptures.",
      "Mentored by senior industry animators and folklore historians to craft authentic, narrative-driven short film sequences.",
    ],
    highlights: [
      "Character design inspired by Indian temple friezes & murals",
      "Mudra & gesture-driven keyframe timing masterclass",
      "Paper lightbox to digital raster pipeline",
      "Group screening & industry review showcase",
    ],
    schedule: "3 Days • Intensive Studio Sessions (9:30 AM – 6:30 PM)",
    capacity: "40 Selected Animators & Illustrators",
  },
  {
    id: "sangam-residency",
    title: "SANGAM RESIDENCY",
    badge: "PERFORMANCE",
    category: "Tholu Bommalata Shadow Puppetry",
    date: "JAN 12–14, 2027",
    venue: "Bengaluru Amphitheatre & Pavilion",
    image: "/assets/events/event_sangam_puppetry.jpg",
    tagline: "Illuminating Ancient Epics with Living Shadow Masters",
    description: [
      "Sangam Residency honors the sacred shadow theatre tradition of Tholu Bommalata — leather shadow puppetry practiced for centuries across Andhra and Telangana.",
      "Watch master puppeteers manipulate translucent, vegetable-dyed goat hide puppets behind glowing parchment screens, accompanied by live mridangam, cymbals, and harmonium.",
      "Attendees get hands-on experience designing and perforating miniature leather puppets, exploring ancient light-and-shadow narrative mechanics.",
    ],
    highlights: [
      "Full evening live performances of epic folklore episodes",
      "Leather puppet perforation & dye craft workshops",
      "Interactive acoustic storytelling with folk instruments",
      "Archival display of century-old ancestral puppet collections",
    ],
    schedule: "3 Evenings • 6:30 PM – 10:00 PM",
    capacity: "Open Amphitheatre Seating + 50 Workshop Passes",
  },
  {
    id: "rang-pravah",
    title: "RANG PRAVAH",
    badge: "GALLERY EXHIBITION",
    category: "Contemporary & Folk Art Fusion",
    date: "FEB 20–28, 2027",
    venue: "National Gallery of Modern Art Pavilion",
    image: "/assets/events/event_rang_fusion.jpg",
    tagline: "Where Traditional Craft Meets Modern Visual Design",
    description: [
      "Rang Pravah is Culturum's curated gallery exhibition exploring how ancient artistic sensibilities inform futuristic visual culture.",
      "Featuring 35 collaborative installations pairing traditional rural artisans with modern digital artists, printmakers, and graphic novelists.",
      "A multi-sensory exhibition showcasing dynamic projection-mapped tapestries, hand-painted ceramic murals, and limited-edition risograph art prints.",
    ],
    highlights: [
      "35 Exclusive fusion art installations & murals",
      "Artist talks & panel discussions on cultural preservation",
      "Live risograph print station with custom souvenir posters",
      "Curated exhibition catalogue & artist monograph book launch",
    ],
    schedule: "8-Day Exhibition • 11:00 AM – 7:30 PM Daily",
    capacity: "Public Entry with RSVP Guided Tours",
  },
];

// Duplicate for seamless infinite loop (4 + 4 = 8 items)
const LOOP_EVENTS = [...CULTURUM_EVENTS, ...CULTURUM_EVENTS];

export default function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<CulturumEvent | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollPosRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragStartScrollRef = useRef(0);

  // Speed of automatic smooth gliding: ~0.65 px per frame (~39px per second)
  const autoGlideSpeed = 0.65;

  const getHalfWidth = useCallback(() => {
    if (!trackRef.current) return 0;
    return trackRef.current.scrollWidth / 2;
  }, []);

  // Butter-smooth continuous scroll loop via requestAnimationFrame
  useEffect(() => {
    const loop = () => {
      if (!isPaused && !isDraggingRef.current && trackRef.current) {
        const halfWidth = getHalfWidth();
        if (halfWidth > 0) {
          scrollPosRef.current += autoGlideSpeed;
          if (scrollPosRef.current >= halfWidth) {
            scrollPosRef.current -= halfWidth;
          }
          trackRef.current.scrollLeft = scrollPosRef.current;
        }
      }
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, getHalfWidth]);

  // Arrow navigation: smoothly advances/rewinds by one card
  const handleNavClick = (direction: -1 | 1) => {
    sounds.playWhoosh();
    setIsPaused(true);

    if (trackRef.current) {
      const card = trackRef.current.querySelector<HTMLElement>(".event-card-item");
      const cardWidth = card ? card.offsetWidth + 24 : 380;
      const target = trackRef.current.scrollLeft + direction * cardWidth;
      trackRef.current.scrollTo({ left: target, behavior: "smooth" });
      scrollPosRef.current = target;

      // Resume auto glide after 2.5 seconds
      setTimeout(() => {
        setIsPaused(false);
      }, 2500);
    }
  };

  // Touch / Pointer Drag handlers for intuitive swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    dragStartScrollRef.current = trackRef.current.scrollLeft;
    setIsPaused(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const diff = e.clientX - startXRef.current;
    trackRef.current.scrollLeft = dragStartScrollRef.current - diff;
    scrollPosRef.current = trackRef.current.scrollLeft;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  return (
    <section className="events-showcase-section" id="events">
      {/* Section Header with Arrow Controls */}
      <div className="section-heading">
        <button
          onClick={() => handleNavClick(-1)}
          aria-label="Previous event"
          className="nav-arrow-btn"
        >
          ‹
        </button>
        <div className="heading-title-group">
          <h2>EVENTS &amp; PROJECTS</h2>
          <span className="events-subtext">Culturum Creative Gatherings &amp; Residencies</span>
        </div>
        <div className="heading-rule">
          <span />
        </div>
        <button
          onClick={() => handleNavClick(1)}
          aria-label="Next event"
          className="nav-arrow-btn"
        >
          ›
        </button>
      </div>

      {/* Auto-scrolling Event Cards Stream */}
      <div className="events-paper-container">
        <div
          className="events-scroll-track"
          ref={trackRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="region"
          aria-label="Continuous smooth event showcase"
        >
          {LOOP_EVENTS.map((event, index) => (
            <article
              key={`${event.id}-${index}`}
              className="event-card-item"
              onClick={() => {
                sounds.playTap();
                setSelectedEvent(event);
              }}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${event.title}`}
            >
              {/* Event Image Frame */}
              <div className="event-img-frame">
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-poster-img"
                  loading="lazy"
                  draggable={false}
                />
                <div className="event-badge-tag">{event.badge}</div>
                <div className="event-gradient-scrim" />
              </div>

              {/* Event Typography Overlay */}
              <div className="event-card-content">
                <div className="event-meta-line">
                  <span className="event-date">{event.date}</span>
                  <span className="event-meta-dot">•</span>
                  <span className="event-venue">{event.venue.split("&")[0].trim()}</span>
                </div>
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-subtitle">{event.category}</p>
                <div className="event-card-cta">
                  <span>Explore Event</span>
                  <i aria-hidden="true">→</i>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Event Details Lightbox Modal */}
      {selectedEvent && (
        <div
          className="event-modal-backdrop"
          onClick={() => setSelectedEvent(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedEvent.title}
        >
          <div
            className="event-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="event-modal-close"
              onClick={() => setSelectedEvent(null)}
              aria-label="Close event details"
            >
              ✕
            </button>

            {/* Modal Image Header */}
            <div className="event-modal-banner">
              <img src={selectedEvent.image} alt={selectedEvent.title} />
              <div className="event-modal-banner-scrim">
                <span className="event-modal-badge">{selectedEvent.badge}</span>
                <h2>{selectedEvent.title}</h2>
                <p className="event-modal-tagline">{selectedEvent.tagline}</p>
              </div>
            </div>

            {/* Modal Body Info */}
            <div className="event-modal-body">
              <div className="event-modal-meta-grid">
                <div className="meta-box">
                  <span className="meta-lbl">Date</span>
                  <span className="meta-val">{selectedEvent.date}</span>
                </div>
                <div className="meta-box">
                  <span className="meta-lbl">Location</span>
                  <span className="meta-val">{selectedEvent.venue}</span>
                </div>
                <div className="meta-box">
                  <span className="meta-lbl">Schedule</span>
                  <span className="meta-val">{selectedEvent.schedule}</span>
                </div>
                <div className="meta-box">
                  <span className="meta-lbl">Capacity</span>
                  <span className="meta-val">{selectedEvent.capacity}</span>
                </div>
              </div>

              <div className="event-modal-narrative">
                <h3>About This Gathering</h3>
                {selectedEvent.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="event-modal-highlights">
                <h3>Experience Highlights</h3>
                <ul>
                  {selectedEvent.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="event-modal-footer">
                <button
                  className="event-rsvp-btn"
                  onClick={() => {
                    sounds.playPop();
                    window.location.href = "#contact";
                    setSelectedEvent(null);
                  }}
                >
                  RSVP &amp; Enquire Now ✦
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
