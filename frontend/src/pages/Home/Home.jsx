import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import heroimg from "../../assets/hero-image.jpg";
import { Input } from "@/components/components/ui/input";
import { Button } from "@/components/components/ui/button";
import { usePostStore } from "../../Store/usePostStore";

const UnsplashClone = () => {
  const { getAllPosts, isLoading, isError, error } = usePostStore();
  const [posts, setPosts] = useState([]);

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getAllPosts(); // fetch the posts
      if (fetchedPosts) {
        setPosts(fetchedPosts); // set the posts in local state
      }
    };

    fetchPosts();
  }, [getAllPosts]); // Adding `getAllPosts` as a dependency ensures it's only fetched when needed

  if (isLoading) {
    return <p>Loading...</p>; // Return loading state while posts are being fetched
  }

  if (isError) {
    return <p>Error: {error}</p>; // Show error message if there's an issue with fetching posts
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

      {/* Full-Width Pinterest-Style Image Grid */}
      <div className="w-full p-4">
        {posts.length === 0 ? (
          <p>No posts available</p> // Handle the case when no posts are available
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            style={{
              gridAutoRows: "10px", // Adjust the spacing between rows
            }}
          >
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative group cursor-pointer overflow-hidden"
                style={{
                  gridRowEnd: `span ${Math.floor(
                    Math.random() * (20 - 10 + 1) + 10
                  )}`, // Random row span for Masonry effect
                }}
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

      {/* Community Section */}
      {/* <div className="bg-black text-white text-center py-16 mt-8">
        <h3 className="text-2xl font-bold mb-4">Join the community</h3>
        <p className="mb-6">
          Upload your photos and share them with millions of users.
        </p>
        <Button
          variant="outline"
          className="text-black border-white hover:bg-gray hover:text-black"
        >
          Submit a photo
        </Button>
      </div> */}
    </div>
  );
};

export default UnsplashClone;
