import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import profilePhoto from "@/assets/vini.jpeg";

const ProfileHeader = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="px-4 py-6">
      <div className="flex items-center gap-6">
        {/* Profile Photo */}
        <div className="story-ring shrink-0">
          <div className="rounded-full bg-background p-0.5">
            <img
              src={profilePhoto}
              alt={t.fullName}
              className="h-20 w-20 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-1 justify-around text-center">
          <div>
            <p className="text-lg font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">{t.posts}</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">523</p>
            <p className="text-xs text-muted-foreground">{t.followers}</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">789</p>
            <p className="text-xs text-muted-foreground">{t.following}</p>
          </div>
        </div>
      </div>

      {/* Name & Bio */}
      <div className="mt-4">
        <h1 className="text-sm font-bold text-foreground">{t.fullName}</h1>
        <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground leading-5">
          {t.bio}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2">
        <a
          href="https://www.linkedin.com/in/viníciusmicarelli"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg bg-secondary py-1.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/ViniciusMicarelli"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg bg-secondary py-1.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          GitHub
        </a>
      </div>
    </header>
  );
};

export default ProfileHeader;
