import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Share2, ExternalLink } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import storyProjects from "@/assets/story-projects2.png";
import storyTechnologies from "@/assets/story-technologies2.png";
import storyAbout from "@/assets/story-about2.png";

type StoryKey = "projects" | "technologies" | "aboutMe";

const bgImages: Record<StoryKey, string> = {
  projects: storyProjects,
  technologies: storyTechnologies,
  aboutMe: storyAbout,
};

const validKeys: StoryKey[] = ["projects", "technologies", "aboutMe"];

const SWIPE_THRESHOLD = 50;

interface SlideContentProps {
  slide: { title: string; description: string; image?: string; link?: string };
  language: "pt" | "en";
}

const SlideContent = ({ slide, language }: SlideContentProps) => (
  <div className="absolute inset-0 flex flex-col">
    {slide.image ? (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
        <img
          src={slide.image}
          alt={slide.title}
          className="h-28 w-28 rounded-xl object-contain pointer-events-none select-none"
        />
        <div className="text-center pointer-events-none select-none">
          <h2 className="mb-2 text-xl font-bold text-foreground">{slide.title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{slide.description}</p>
        </div>
        {slide.link && (
          <a
            href={slide.link}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto mt-1 inline-flex items-center gap-1.5 rounded-full bg-foreground/10 px-4 py-2 text-xs font-medium text-foreground backdrop-blur hover:bg-foreground/20 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} />
            {language === "pt" ? "Acessar link" : "Open link"}
          </a>
        )}
      </div>
    ) : (
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center pointer-events-none select-none">
          <h2 className="mb-4 text-2xl font-bold text-foreground">{slide.title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{slide.description}</p>
        </div>
        {slide.link && (
          <div className="flex justify-center pb-2">
            <a
              href={slide.link}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-foreground/10 px-4 py-2 text-xs font-medium text-foreground backdrop-blur hover:bg-foreground/20 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
              {language === "pt" ? "Acessar link" : "Open link"}
            </a>
          </div>
        )}
      </div>
    )}
  </div>
);

/* ── main component ────────────────────────────────────── */
const StoryViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const storyKey = id as StoryKey;
  const isValid = validKeys.includes(storyKey);
  const slides = isValid ? t.storyContents[storyKey] : [];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Animation: each slide has its own offset + transition
  const [outgoingOffset, setOutgoingOffset] = useState(0); // % offset for the leaving slide
  const [incomingOffset, setIncomingOffset] = useState(0); // % offset for the entering slide
  const [pendingSlide, setPendingSlide] = useState<number | null>(null); // index of the incoming slide
  const [animPhase, setAnimPhase] = useState<"idle" | "dragging" | "animating">("idle");
  const [dragPx, setDragPx] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const hasMoved = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const duration = 10000;

  const onClose = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Animate to a new slide
  const goTo = useCallback(
    (index: number, direction: "left" | "right") => {
      if (animPhase !== "idle") return;

      // direction = "left" means content moves left (next slide)
      // outgoing slides to e.g. -100%, incoming starts at +100% and goes to 0%
      const outTarget = direction === "left" ? -100 : 100;
      const inStart = direction === "left" ? 100 : -100;

      setPendingSlide(index);
      setIncomingOffset(inStart);
      setOutgoingOffset(0);
      setDragPx(0);
      setAnimPhase("animating");

      // Trigger the animation on next frame so the incoming slide is positioned first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setOutgoingOffset(outTarget);
          setIncomingOffset(0);
        });
      });
    },
    [animPhase],
  );

  // When animation completes, finalize
  const onTransitionDone = useCallback(() => {
    if (animPhase !== "animating" || pendingSlide === null) return;
    setCurrent(pendingSlide);
    setPendingSlide(null);
    setOutgoingOffset(0);
    setIncomingOffset(0);
    setAnimPhase("idle");
  }, [animPhase, pendingSlide]);

  const next = useCallback(() => {
    if (animPhase !== "idle") return;
    if (current < slides.length - 1) {
      goTo(current + 1, "left");
    } else {
      onClose();
    }
  }, [current, slides.length, onClose, animPhase, goTo]);

  const prev = useCallback(() => {
    if (animPhase !== "idle" || current === 0) return;
    goTo(current - 1, "right");
  }, [current, animPhase, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isPaused || !isValid || animPhase !== "idle") return;
    const timer = setTimeout(next, duration);
    return () => clearTimeout(timer);
  }, [current, next, isPaused, isValid, animPhase]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, next, prev]);

  /* ── touch handlers ── */
  const handleTouchStart = (e: React.TouchEvent) => {
    if (animPhase !== "idle") return;
    touchStartX.current = e.targetTouches[0].clientX;
    hasMoved.current = false;
    setIsPaused(true);
    setAnimPhase("dragging");
    setDragPx(0);
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      // Prevent browser pull-to-refresh / swipe-back navigation
      e.preventDefault();

      if (touchStartX.current === null || animPhase !== "dragging") return;
      const diff = e.targetTouches[0].clientX - touchStartX.current;

      if (Math.abs(diff) > 5) hasMoved.current = true;

      // Rubber-band at edges
      if ((diff > 0 && current === 0) || (diff < 0 && current === slides.length - 1)) {
        setDragPx(diff * 0.25);
      } else {
        setDragPx(diff);
      }
    },
    [animPhase, current, slides.length],
  );

  // Attach touchmove as non-passive so preventDefault() works
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", handleTouchMove);
  }, [handleTouchMove]);

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartX.current === null) return;
    const startX = touchStartX.current;
    touchStartX.current = null;

    // If finger didn't move, treat as a tap
    if (!hasMoved.current) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const tapX = startX - rect.left;
        const tapRatio = tapX / rect.width;
        setDragPx(0);
        setAnimPhase("idle");
        if (tapRatio > 0.3) {
          next();
        } else {
          prev();
        }
        return;
      }
    }

    const absDrag = Math.abs(dragPx);

    // Determine target slide and direction
    let targetIndex: number | null = null;
    let direction: "left" | "right" | null = null;

    if (absDrag > SWIPE_THRESHOLD) {
      if (dragPx < 0 && current < slides.length - 1) {
        targetIndex = current + 1;
        direction = "left";
      } else if (dragPx > 0 && current > 0) {
        targetIndex = current - 1;
        direction = "right";
      }
    }

    if (targetIndex !== null && direction !== null) {
      // Trigger the same animation as arrow buttons — inline the goTo logic
      const outTarget = direction === "left" ? -100 : 100;
      const inStart = direction === "left" ? 100 : -100;

      setPendingSlide(targetIndex);
      setIncomingOffset(inStart);
      setOutgoingOffset(0);
      setDragPx(0);
      setAnimPhase("animating");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setOutgoingOffset(outTarget);
          setIncomingOffset(0);
        });
      });
    } else {
      // Snap back
      setDragPx(0);
      setAnimPhase("idle");
    }
  };

  const onMouseDown = () => setIsPaused(true);
  const onMouseUp = () => setIsPaused(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/stories/${storyKey}`;
    navigator.clipboard.writeText(url).then(() => {
      toast(language === "pt" ? "Link copiado!" : "Link copied!");
    });
  };

  if (!isValid) return null;

  const currentSlide = slides[current];
  const incomingSlide = pendingSlide !== null ? slides[pendingSlide] : null;

  // Styles
  const transitionValue = "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease";

  const currentStyle: React.CSSProperties =
    animPhase === "dragging"
      ? { transform: `translateX(${dragPx}px)`, transition: "none" }
      : animPhase === "animating"
        ? { transform: `translateX(${outgoingOffset}%)`, transition: transitionValue, opacity: outgoingOffset === 0 ? 1 : 0.4 }
        : { transform: "translateX(0)", transition: "none" };

  const incomingStyle: React.CSSProperties =
    animPhase === "animating" && incomingSlide
      ? { transform: `translateX(${incomingOffset}%)`, transition: transitionValue, opacity: incomingOffset === 0 ? 1 : 0 }
      : { display: "none" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95">
      <div
        ref={containerRef}
        className="relative flex h-full max-h-[700px] w-full max-w-[400px] flex-col overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

        {/* Progress bars */}
        <div className="relative z-10 flex gap-1 px-3 pt-3">
          {slides.map((_, i) => (
            <div key={i} className="h-0.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-foreground"
                style={{
                  animationName: i === current && animPhase === "idle" ? "progress" : "none",
                  animationDuration: `${duration}ms`,
                  animationTimingFunction: "linear",
                  animationFillMode: "forwards",
                  animationPlayState: i === current && isPaused ? "paused" : "running",
                  width: i < current || (i === current && animPhase === "animating" && pendingSlide !== null && pendingSlide > current) ? "100%" : "0%",
                  opacity: i <= current ? 1 : 0.3,
                }}
              />
            </div>
          ))}
          <style>{`
            @keyframes progress {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="story-ring">
              <div className="h-8 w-8 rounded-full bg-background p-0.5">
                <img src={bgImages[storyKey]} alt="" className="h-full w-full rounded-full object-cover" />
              </div>
            </div>
            <span className="text-sm font-semibold text-foreground">{t.stories[storyKey]}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleShare} className="text-foreground/70 hover:text-foreground pointer-events-auto">
              <Share2 size={18} />
            </button>
            <button onClick={onClose} className="text-foreground/70 hover:text-foreground pointer-events-auto">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ── Slide area ── */}
        <div
          className="relative z-10 flex-1 overflow-hidden cursor-pointer"
          onClick={(e) => {
            // Don't navigate if user clicked a link or button
            const target = e.target as HTMLElement;
            if (target.closest("a, button")) return;

            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            if (clickX / rect.width < 0.3) {
              prev();
            } else {
              next();
            }
          }}
        >
          {/* Current slide */}
          <div
            style={currentStyle}
            onTransitionEnd={animPhase === "animating" ? undefined : undefined}
          >
            <SlideContent slide={currentSlide} language={language} />
          </div>

          {/* Incoming slide (only rendered during animation) */}
          {incomingSlide && (
            <div
              style={incomingStyle}
              onTransitionEnd={onTransitionDone}
            >
              <SlideContent slide={incomingSlide} language={language} />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="relative z-10 flex items-center justify-between px-4 pb-6">
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className={`rounded-full bg-secondary p-2 text-foreground transition-opacity pointer-events-auto ${current === 0 ? "opacity-30" : "hover:bg-muted"}`}
            disabled={current === 0}
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs text-muted-foreground">
            {current + 1} / {slides.length}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="rounded-full bg-secondary p-2 text-foreground hover:bg-muted pointer-events-auto"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
