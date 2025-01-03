import { create } from 'zustand'
import { axiosInstance } from '@/lib/axios'
import toast from 'react-hot-toast'

export const usePostStore = create((set, get) => ({
    posts: [],
    isLoading: false,
    isError: false,
    error: null,

    createPost: async (data) => {
      try {
        set({ isLoading: true, isError: false, error: null });
    
        // Initialize FormData
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });
    
        // Append the image if it's available (change the key to 'image')
        if (data.image) {
          formData.append('image', data.image);
        }
    
        const res = await axiosInstance.post('/post/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Required for file uploads
          },
        });
    
        const currentPost = get().posts; // Get current posts from store
        set({
          posts: [...currentPost, res.data], // Update posts
          isLoading: false,
        });
    
        return res;
      } catch (error) {
        console.error("Error creating post:", error);
        set({
          isLoading: false,
          isError: true,
          error: error.response?.data?.message || "An unexpected error occurred",
        });
      }
    },
    
  

  
    getPostById: async (id) => {
        set({ isError: false, error: null });
        try {
            const res = await axiosInstance.get(`/posts/get-post/${id}`);
            const post = res.data.post;
            // Update the state
            set({ post, isLoading: false });
            // Update the user's posts array in localStorage
            const parsedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const updatedUser = {
                ...parsedUser,
                posts: [...(parsedUser.posts || []), post],
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            // Show success notification
            toast.success('Post retrieved successfully');
            return post;
        } catch (error) {
            // Handle errors
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            set({ isLoading: false, isError: true, error: errorMessage });
            toast.error(errorMessage);
            console.error(error);
        }
    },
     getAllPosts : async () => {
        try {
          set({ isLoading: true, isError: false, error: null });
          const res = await axiosInstance.get('/post');  // Correct endpoint
          if (res?.data?.posts) {
            set({ posts: res.data.posts, isLoading: false });
            return res.data.posts;
          } else {
            set({ isLoading: false, isError: true, error: 'No posts found' });
            toast.error('No posts found');
          }
        } catch (error) {
          if (error.code === 'ERR_NETWORK') {
            set({ isLoading: false, isError: true, error: 'Network Error' });
            toast.error('Network Error');
          } else {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            set({ isLoading: false, isError: true, error: errorMessage });
            toast.error(errorMessage);
          }
          console.error(error);
        }
      },
      
    getUserPosts: async () => {
        try {
            set({ isLoading: true, isError: false, error: null });

            const res = await axiosInstance.get('/post/user');
            const { posts } = res.data;

            // Update state with retrieved posts
            set({ posts, isLoading: false });
            toast.success('User posts retrieved successfully');

            return posts;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';

            // Update state with error details
            set({ isLoading: false, isError: true, error: errorMessage });

            // Show error toast
            toast.error(errorMessage);

            console.error('Error fetching user posts:', error);
        }
    }


}))

