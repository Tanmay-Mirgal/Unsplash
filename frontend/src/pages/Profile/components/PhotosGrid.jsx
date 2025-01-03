import { useEffect } from "react";
import { usePostStore } from "../../../Store/usePostStore";
import { Heart, BookmarkIcon } from "lucide-react"; // Icons from lucide-react

const PhotosGrid = () => {
  const { posts, isLoading, isError, error, getUserPosts } = usePostStore();

  useEffect(() => {
    getUserPosts(); // Fetch posts when the component mounts
  }, [getUserPosts]);

  if (isLoading) return <div>Loading photos...</div>;
  if (isError) return <div>Error loading photos: {error}</div>;
  if (!posts.length) return <div>No photos available yet.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <div key={post._id} className="group relative aspect-[4/3] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-4 left-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button className="btn btn-secondary text-xs">
                  <Heart className="h-4 w-4 mr-1" /> {post.likes?.length || 0}
                </button>
                <button className="btn btn-secondary text-xs">
                  <BookmarkIcon className="h-4 w-4 mr-1" /> {post.bookmarks?.length || 0}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">{post.location}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotosGrid;
