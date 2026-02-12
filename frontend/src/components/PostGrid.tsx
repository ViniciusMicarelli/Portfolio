import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import postIlac from "@/assets/post-ilac.png";
import postMl from "@/assets/post-ml.jpg";
import postGraduation from "@/assets/post-graduation.jpg";
import profilePhoto from "@/assets/vini.jpeg";

const postImages = [postIlac, postMl, postGraduation];

const PostGrid = () => {
  const location = useLocation();

  // Preload post images + profile photo used in PostDetail
  useEffect(() => {
    [...postImages, profilePhoto].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {postImages.map((img, i) => (
        <Link
          key={i}
          to={`/p/${i}`}
          state={{ background: location }}
          className="aspect-square overflow-hidden block"
        >
          <img
            src={img}
            alt={`Post ${i + 1}`}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </Link>
      ))}
    </div>
  );
};

export default PostGrid;
