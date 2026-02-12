import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

import storyProjects from "@/assets/story-projects2.png";
import storyTechnologies from "@/assets/story-technologies2.png";
import storyAbout from "@/assets/story-about2.png";

type StoryKey = "projects" | "technologies" | "aboutMe";

const storyImages: Record<StoryKey, string> = {
  projects: storyProjects,
  technologies: storyTechnologies,
  aboutMe: storyAbout,
};

const storyKeys: StoryKey[] = ["projects", "technologies", "aboutMe"];

const StoryHighlights = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const location = useLocation();

  // Preload all story slide images in the background
  useEffect(() => {
    const allSlides = [
      ...t.storyContents.projects,
      ...t.storyContents.technologies,
      ...t.storyContents.aboutMe,
    ];
    allSlides.forEach((slide) => {
      if (slide.image) {
        const img = new Image();
        img.src = slide.image;
      }
    });
  }, [t]);

  return (
    <div className="flex gap-4 overflow-x-auto px-4 py-3 scrollbar-hide">
      {storyKeys.map((key) => (
        <Link
          key={key}
          to={`/stories/${key}`}
          state={{ background: location }}
          className="flex shrink-0 flex-col items-center gap-1.5"
        >
          <div className="story-ring">
            <div className="rounded-full bg-background p-0.5">
              <img
                src={storyImages[key]}
                alt={t.stories[key]}
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>
          </div>
          <span className="text-xs text-foreground">{t.stories[key]}</span>
        </Link>
      ))}
    </div>
  );
};

export default StoryHighlights;
