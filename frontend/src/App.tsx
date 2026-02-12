import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/hooks/useLanguage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PostDetail from "@/components/PostDetail";
import StoryViewer from "@/components/StoryViewer";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const background = location.state && (location.state as any).background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Index />} />
        <Route path="/p/:id" element={<><Index /><PostDetail /></>} />
        <Route path="/stories/:id" element={<><Index /><StoryViewer /></>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/p/:id" element={<PostDetail />} />
          <Route path="/stories/:id" element={<StoryViewer />} />
        </Routes>
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
