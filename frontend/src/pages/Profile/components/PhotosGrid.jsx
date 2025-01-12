import { useEffect } from "react";
import { usePostStore } from "../../../Store/usePostStore";
import { Heart, BookmarkIcon, Trash2 } from "lucide-react"; // Icons from lucide-react

const PhotosGrid = () => {
  const { posts, isLoading, isError, error, getUserPosts, deletePost } = usePostStore();

  useEffect(() => {
    getUserPosts(); // Fetch posts when the component mounts
  }, [getUserPosts]);

  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      await deletePost(postId);
    }
  };

  if (isLoading) return <div>Loading photos...</div>;
  if (isError) return <div>Error loading photos: {error}</div>;
  if (!posts.length) return <div>No photos available yet.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <div
          key={post._id}
          className="group relative aspect-[4/3] overflow-hidden border rounded-lg shadow-sm"
        >
          {/* Post Image */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <div className="flex items-center justify-between text-white">
              {/* Likes and Bookmarks */}
              <div className="flex items-center gap-2">
                <button className="flex items-center text-xs text-white">
                  <Heart className="h-4 w-4 mr-1" /> {post.likes?.length || 0}
                </button>
                <button className="flex items-center text-xs text-white">
                  <BookmarkIcon className="h-4 w-4 mr-1" /> {post.bookmarks?.length || 0}
                </button>
              </div>

              {/* Delete Button */}
              <button
                className="flex items-center text-xs text-red-500 hover:text-red-700"
                onClick={() => handleDeletePost(post._id)}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </button>
            </div>
            {/* Post Location */}
            <span className="mt-2 text-xs">{post.location}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotosGrid;

