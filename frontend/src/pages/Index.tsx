import { Grid3X3, Bookmark, User } from "lucide-react";
import ProfileHeader from "@/components/ProfileHeader";
import StoryHighlights from "@/components/StoryHighlights";
import PostGrid from "@/components/PostGrid";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="mx-auto min-h-screen max-w-lg bg-background">
      {/* Top Bar */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md">
        <h2 className="font-display text-lg font-bold text-foreground">
          {t.username}
        </h2>
        <LanguageToggle />
      </nav>

      <ProfileHeader />

      {/* Story Highlights */}
      <StoryHighlights />

      {/* Tab Bar */}
      <div className="mt-2 flex border-t border-border">
        <button className="flex flex-1 items-center justify-center gap-1 border-b-2 border-foreground py-3 text-foreground">
          <Grid3X3 size={18}/>
        </button>
        {/* <button className="flex flex-1 items-center justify-center gap-1 py-3 text-muted-foreground">
          <Bookmark size={18} />
        </button>
        <button className="flex flex-1 items-center justify-center gap-1 py-3 text-muted-foreground">
          <User size={18} />
        </button> */}
      </div>

      {/* Posts Grid */}
      <PostGrid />
    </div>
  );
};

export default Index;
