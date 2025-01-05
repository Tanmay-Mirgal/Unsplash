import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Heart } from "lucide-react"; // Import heart icon
import heroimg from "../../assets/hero-image.jpg";
import { Input } from "@/components/components/ui/input";
import { Button } from "@/components/components/ui/button";
import { usePostStore } from "../../Store/usePostStore";
import { useUserStore } from "../../Store/useUserStore";

const UnsplashClone = () => {
  const { getAllPosts, isLoading, isError, error} = usePostStore();
  const { followUser, unfollowUser } = useUserStore();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); 
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [isFollowing, setIsFollowing] = useState(false); // Track following status

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getAllPosts();
      if (fetchedPosts) {
        const shuffledPosts = [...fetchedPosts];
        for (let i = shuffledPosts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledPosts[i], shuffledPosts[j]] = [shuffledPosts[j], shuffledPosts[i]];
        }
        setPosts(shuffledPosts);
      }
    };

    fetchPosts();
  }, [getAllPosts]);

  // Persist follow state after reload
  useEffect(() => {
    const storedFollowState = JSON.parse(localStorage.getItem("isFollowing"));
    if (storedFollowState !== null) {
      setIsFollowing(storedFollowState);
    }
  }, []);

  // Handler to open the dialog
  const openDialog = (post) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
    setIsFollowing(post.user?.isFollowing || false); // Check if the user is already following
  };

  // Handler to close the dialog
  const closeDialog = () => {
    setSelectedPost(null);
    setIsDialogOpen(false);
  };

  // Handle follow/unfollow
  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(selectedPost.user._id);
        setIsFollowing(false);
        localStorage.setItem("isFollowing", JSON.stringify(false)); // Persist unfollow state
      } else {
        await followUser(selectedPost.user._id);
        setIsFollowing(true);
        localStorage.setItem("isFollowing", JSON.stringify(true)); // Persist follow state
      }

      setSelectedPost((prevPost) => ({
        ...prevPost,
        user: {
          ...prevPost.user,
          isFollowed: !prevPost.user.isFollowed,
        },
      }));
    } catch (error) {
      console.error("Error in follow/unfollow:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96">
        <div className="absolute inset-0">
          <img
            src={heroimg}
            alt="Mountain landscape"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/30">
          <div className="max-w-4xl mx-auto pt-20 px-4">
            <h2 className="text-4xl font-bold text-white mb-4">
              The internet's source for visuals.
            </h2>
            <p className="text-white mb-6">Powered by creators everywhere.</p>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search high-resolution images, categories, wallpapers"
                className="w-full pl-10 py-6"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="mt-2 text-sm text-white">
              Trending: forest, wallpaper, background, happy, love
            </div>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="w-full p-4">
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="relative group cursor-pointer overflow-hidden"
                style={{
                  gridRowEnd: `span ${Math.floor(
                    Math.random() * (20 - 10 + 1) + 10
                  )}`,
                }}
                onClick={() => openDialog(post)}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post Details Dialog */}
      {isDialogOpen && selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white w-11/12 sm:w-3/4 lg:w-1/2 p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-auto">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={closeDialog}
            >
              ✖
            </button>

            {/* Post Image */}
            <div className="flex justify-center mb-4">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-auto max-w-full max-h-[calc(100vh-8rem)] object-contain rounded-lg"
              />
            </div>

            {/* Post Title and Description */}
            <h3 className="text-xl font-bold mb-2">{selectedPost.title}</h3>
            <p className="text-gray-600 mb-4">{selectedPost.description}</p>

            {/* Post Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* User Details */}
            <div className="text-sm text-gray-500 mb-4">
              Uploaded by:
              <div className="flex items-center mt-2">
                <img
                  src={selectedPost.user?.profilePic}
                  alt={selectedPost.user?.username}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-bold">{selectedPost.user?.username}</p>
                  <p className="text-gray-400 text-xs">{selectedPost.user?.email}</p>
                </div>
              </div>
              {/* Follow/Unfollow Button */}
              <Button
                variant="outline"
                color={isFollowing ? "red" : "blue"}
                onClick={handleFollow}
                className="mt-4"
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </div>

            {/* Likes */}
            <div className="flex items-center mb-4">
              <p className="text-gray-600">{selectedPost.likes.length} likes</p>
            </div>

            {/* Comments */}
            <div>
              <h4 className="text-lg font-bold mb-2">Comments:</h4>
              {selectedPost.comments.length > 0 ? (
                <ul className="space-y-2">
                  {selectedPost.comments.map((comment) => (
                    <li
                      key={comment._id}
                      className="bg-gray-100 p-3 rounded-lg shadow-sm"
                    >
                      {comment.content}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnsplashClone;
