import { useEffect, useRef } from "react";

export interface BorderTileData {
  id: string;
  src: string;
  width: number;
  height: number;
}

const BORDER_TILES: BorderTileData[] = [
  { id: "t00", src: "/assets/border-tiles/tile_00.png", width: 80, height: 90 },
  { id: "t01", src: "/assets/border-tiles/tile_01.png", width: 82, height: 90 },
  { id: "t02", src: "/assets/border-tiles/tile_02.png", width: 82, height: 90 },
  { id: "t03", src: "/assets/border-tiles/tile_03.png", width: 82, height: 90 },
  { id: "t04", src: "/assets/border-tiles/tile_04.png", width: 82, height: 90 },
  { id: "t05", src: "/assets/border-tiles/tile_05.png", width: 82, height: 90 },
  { id: "t06", src: "/assets/border-tiles/tile_06.png", width: 82, height: 90 },
  { id: "t07", src: "/assets/border-tiles/tile_07.png", width: 82, height: 90 },
  { id: "t08", src: "/assets/border-tiles/tile_08.png", width: 182, height: 90 },
  { id: "t09", src: "/assets/border-tiles/tile_09.png", width: 82, height: 90 },
  { id: "t10", src: "/assets/border-tiles/tile_10.png", width: 82, height: 90 },
  { id: "t11", src: "/assets/border-tiles/tile_11.png", width: 82, height: 90 },
  { id: "t12", src: "/assets/border-tiles/tile_12.png", width: 82, height: 90 },
  { id: "t13", src: "/assets/border-tiles/tile_13.png", width: 82, height: 90 },
  { id: "t14", src: "/assets/border-tiles/tile_14.png", width: 82, height: 90 },
  { id: "t15", src: "/assets/border-tiles/tile_15.png", width: 82, height: 90 },
  { id: "t16", src: "/assets/border-tiles/tile_16.png", width: 82, height: 90 },
  { id: "t17", src: "/assets/border-tiles/tile_17.png", width: 82, height: 90 },
  { id: "t18", src: "/assets/border-tiles/tile_18.png", width: 98, height: 90 },
];

// Total natural pixel width of one complete 19-tile sequence
const SINGLE_CYCLE_WIDTH = 1672;

// Repeat 4 sets to guarantee infinite seamless coverage across any widescreen viewport
const REPEAT_SETS = [0, 1, 2, 3];

interface ScrollTileBorderProps {
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  autoDrift?: boolean;
}

export default function ScrollTileBorder({
  direction = "left",
  speed = 0.65,
  className = "",
  autoDrift = true,
}: ScrollTileBorderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const currentOffsetRef = useRef(0);
  const targetScrollOffsetRef = useRef(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let animId: number;
    let autoCounter = 0;

    const queryScroll = typeof window !== "undefined"
      ? parseFloat(new URLSearchParams(window.location.search).get("scrollY") || "0")
      : 0;

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      targetScrollOffsetRef.current = (scrollY + queryScroll) * speed;
      lastScrollYRef.current = scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initialize with current scroll
    onScroll();

    const loop = () => {
      if (autoDrift) {
        autoCounter += 0.35; // subtle organic idle drift
      }

      // Smooth inertia lerp towards target scroll offset
      const target = targetScrollOffsetRef.current + autoCounter;
      currentOffsetRef.current += (target - currentOffsetRef.current) * 0.12;

      if (trackRef.current) {
        // Measure scale factor between rendered container height and native 90px height
        const parentHeight = trackRef.current.parentElement?.clientHeight || 90;
        const scale = parentHeight / 90;
        const cycleWidthPx = SINGLE_CYCLE_WIDTH * scale;

        // Modulo wrap to ensure continuous infinite loop
        const offsetMod = currentOffsetRef.current % cycleWidthPx;

        let finalTranslateX = 0;
        if (direction === "left") {
          finalTranslateX = -offsetMod;
        } else {
          // Scrolling right
          finalTranslateX = -cycleWidthPx + offsetMod;
        }

        trackRef.current.style.transform = `translate3d(${finalTranslateX.toFixed(2)}px, 0, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animId);
    };
  }, [direction, speed, autoDrift]);

  return (
    <div
      className={`scroll-tile-border-container ${className}`}
      aria-hidden="true"
    >
      <div ref={trackRef} className="scroll-tile-track">
        {REPEAT_SETS.map((setIdx) => (
          <div key={`set-${setIdx}`} className="scroll-tile-sequence">
            {BORDER_TILES.map((tile) => (
              <div
                key={`tile-${setIdx}-${tile.id}`}
                className="scroll-tile-item"
                style={{
                  aspectRatio: `${tile.width} / ${tile.height}`,
                }}
              >
                <img
                  src={tile.src}
                  alt=""
                  className="scroll-tile-img"
                  loading="eager"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
