import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, Send, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { toast } from "sonner";

import postIlac from "@/assets/post-ilac.png"
import postMl from "@/assets/post-ml.jpg";
import postGraduation from "@/assets/post-graduation.jpg";
import profilePhoto from "@/assets/vini.jpeg";

const images = [postIlac, postMl, postGraduation];

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = translations[language];
    const [liked, setLiked] = useState(false);
    const [showHeart, setShowHeart] = useState(false);

    const postId = Number(id);
    const post = t.postData[postId];
    const img = images[postId];

    if (!post || !img) return null;

    const displayLikes = liked ? post.likes + 1 : post.likes;

    const handleClose = () => {
        navigate("/");
    };

    const handleShare = () => {
        const url = `${window.location.origin}${import.meta.env.BASE_URL}p/${id}`;
        navigator.clipboard.writeText(url).then(() => {
            toast(language === "pt" ? "Link copiado!" : "Link copied!");
        });
    };

    const handleDoubleClick = () => {
        if (!liked) {
            setLiked(true);
        }
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 1000);
    };

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4" onClick={handleClose}>
            <div
                className="relative w-full max-w-lg max-h-[90vh] animate-scale-in overflow-y-auto rounded-xl bg-card scrollbar-hide"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    className="absolute right-3 top-3 z-10 rounded-full bg-background/50 p-1.5 text-foreground hover:bg-background/80"
                >
                    <X size={18} />
                </button>

                <div className="flex items-center gap-3 border-b border-border px-4 py-3 sticky top-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 z-[5]">
                    <img src={profilePhoto} alt="" className="h-8 w-8 rounded-full object-cover" />
                    <span className="text-sm font-semibold text-foreground">{t.username}</span>
                </div>

                {/* Image with double-click like */}
                <div className="relative" onDoubleClick={handleDoubleClick}>
                    <img src={img} alt="" className="w-full" />
                    {showHeart && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <Heart
                                size={80}
                                fill="red"
                                className="text-red-500 animate-like-heart"
                            />
                        </div>
                    )}
                </div>

                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                            <button onClick={handleLikeClick}>
                                <Heart
                                    size={22}
                                    fill={liked ? "red" : "none"}
                                    className={`cursor-pointer transition-colors ${liked ? "text-red-500" : "text-foreground hover:text-primary"}`}
                                />
                            </button>
                            {/* <MessageCircle size={22} className="text-foreground cursor-pointer hover:text-primary transition-colors" /> */}
                            <button onClick={handleShare}>
                                <Send size={22} className="text-foreground cursor-pointer hover:text-primary transition-colors" />
                            </button>
                        </div>
                        {/* <Bookmark size={22} className="text-foreground cursor-pointer hover:text-primary transition-colors" /> */}
                    </div>

                    <p className="mt-2 text-sm font-semibold text-foreground">
                        {displayLikes.toLocaleString()} {language === "pt" ? "curtidas" : "likes"}
                    </p>

                    <p className="mt-1 whitespace-pre-line text-sm text-foreground">
                        <span className="font-semibold">{t.username}</span>{" "}
                        <span className="text-muted-foreground">{post.caption}</span>
                    </p>

                    <p className="mt-2 text-xs text-muted-foreground">
                        {language === "pt" ? "Ver todos os" : "View all"} {post.comments} {language === "pt" ? "comentários" : "comments"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
