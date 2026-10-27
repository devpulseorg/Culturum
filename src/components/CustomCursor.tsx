import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktops/laptops)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest(".interactive") ||
          target.closest(".clickable") ||
          target.closest(".letter-unit") ||
          target.closest(".polaroid-card") ||
          target.closest(".project-card")
        );
        setIsPointer(isClickable);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="custom-cursor-layer"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div
        className={`custom-hand ${isPointer ? "pointer-mode" : ""} ${isClicking ? "clicking" : ""}`}
      >
        {/* Cartoon hand with black ink lines and warm tan/orange skin */}
        <svg
          width="42"
          height="46"
          viewBox="0 0 42 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isClicking
              ? "scale(0.88) rotate(-8deg)"
              : isPointer
              ? "scale(1.08) rotate(4deg)"
              : "rotate(0deg)",
            transition: "transform 100ms cubic-bezier(0.2, 0.8, 0.2, 1)",
            filter: "drop-shadow(2px 3px 0px rgba(0, 0, 0, 0.45))",
          }}
        >
          {/* Hand Palm & Wrist */}
          <path
            d="M26 44C26 44 29 36 27 28C26 23 23 20 20 20C17 20 15 22 13 24C11 26 10 32 10 44"
            fill="#E58B4A"
            stroke="#17120F"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Knuckles & Curled Fingers */}
          <path
            d="M20 20C23 18 29 19 32 23C35 27 34 32 30 36L27 28"
            fill="#EF9A56"
            stroke="#17120F"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29 24C32 26 34 29 33 33"
            stroke="#17120F"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M26 22C28 24 30 27 29 30"
            stroke="#17120F"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Extended Index Pointer Finger */}
          <path
            d="M13 24L5 12C3.8 10.2 4.4 7.8 6.2 6.6C8 5.4 10.4 6 11.6 7.8L19 19"
            fill="#FFAE68"
            stroke="#17120F"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Fingernail */}
          <path
            d="M5.5 10C6.2 8.8 7.5 8.2 8.8 8.8"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Thumb */}
          <path
            d="M12 25C9 24 6 27 7 30C8 33 11 34 14 33"
            fill="#EF9A56"
            stroke="#17120F"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Crease lines */}
          <path
            d="M14 28C17 30 20 29 23 27"
            stroke="#17120F"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
