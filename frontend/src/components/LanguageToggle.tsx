import { useLanguage } from "@/hooks/useLanguage";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-muted"
    >
      <span className={language === "pt" ? "opacity-100" : "opacity-50"}>🇧🇷</span>
      <span className="text-muted-foreground">/</span>
      <span className={language === "en" ? "opacity-100" : "opacity-50"}>🇺🇸</span>
    </button>
  );
};

export default LanguageToggle;
