import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from "react-hot-toast";


export const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  isError: false,
  error: null,


  signup: async (data) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post('/auth/signup', data);
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({
        isLoading: false,
        isError: false,
        user
      });
      toast.success('User registered successfully');

      return user;

    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  login: async (data) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post('/auth/login', data);
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({
        isLoading: false,
        isError: false,
        user
      });
      toast.success('User logged in successfully');
      return user;
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || error.message || 'An unexpected error occurred';
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  logout: async (data) => {
    try {
      set({ isLoading: true })
      const response = await axiosInstance.post('/auth/logout');
      const { user, token } = response.data;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({
        isLoading: false,
        isError: false,
        user: null
      })
      toast.success('User logged out successfully');
      return user;
    } catch (error) {
      console.error(error)
      const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },
  getProfile: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get('/auth/profile');
      const { user } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      set({
        isLoading: false,
        isError: false,
        user
      });
      toast.success('Profile fetched successfully');
      return user;
    } catch (error) {
      console.error(error)
      const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  updateUserProfile: async (data) => {
    try {
      set({ isLoading: true, isError: false, error: null });
      
      // API request to update the user profile
      const response = await axiosInstance.put('/auth/update-profile', data);
      const { user } = response.data;
  
      // Save updated user to localStorage
      localStorage.setItem('user', JSON.stringify(user));
  
      // Update the state with the new user data
      set({
        isLoading: false,
        isError: false,
        user,
      });
  
      // Show success toast
      toast.success('Profile updated successfully');
      
      return user;
    } catch (error) {
      console.error(error);
  
      // Handle errors: get error message from response or fallback to default
      const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
      
      // Update the state to reflect the error
      set({
        isError: true,
        error: errorMessage,
        isLoading: false,
        user: null, // Optional: Reset the user state on error
      });
  
      // Show error toast
      toast.error(errorMessage);
      
      throw error; // Optionally, you can throw the error to handle it elsewhere
    }
  },
  
  getUserById: async (userId) => {
    try {
      set({ isLoading: true })
      const response = await axiosInstance.get(`/users/get-user/${userId}`);
      const { user } = response.data;
      localStorage.setItem('userbyid', JSON.stringify(user));
      set({
        isLoading: false,
        isError: false,
        user
      })
      toast.success('User fetched successfully');
      return user;
    } catch (error) {
      console.error(error)
      const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  getFollowers :async()=>{
    try {
      set({isLoading :true})
      const response = await axiosInstance.get('/user/get-followers');
      const { followers } = response.data;
      localStorage.setItem('followers', JSON.stringify(followers));
      set({
        isLoading : false,
        isError: false,
        followers
      })
      toast.success('Followers fetched successfully');
      return followers;
    } catch (error) {
      console.error(error)
      const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }

  },
  getFollowing : async()=>{
    try {
      set({isLoading :true})
      const response = await axiosInstance.get('/user/get-following');
      const { following } = response.data;
      localStorage.setItem('following', JSON.stringify(following));
      set({
        isLoading : false,
        isError: false,
        following
      })
      toast.success('Following fetched successfully');
      return following;
    } catch (error) {
      console.error(error)
      const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;

    }
  },
  followUser : async(userId) => {
    try {
      const response = await axiosInstance.post(`/user/follow-user/${userId}`);
      const { user } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      set({
        isLoading: false,
        isError: false,
        user
      })
      toast.success('User followed successfully');
      return user;
    } catch (error) {
      console.error(error)
      const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },
  unfollowUser : async(userId) => {
    try {
      const response = await axiosInstance.post(`/user/unfollow-user/${userId}`);
      const { user } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      set({
        isLoading: false,
        isError: false,
        user
      })
      toast.success('User unfollowed successfully');
      return user;
    } catch (error) {
      console.error(error)
      const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

}))


