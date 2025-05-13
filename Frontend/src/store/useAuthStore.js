
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { data } from 'react-router-dom';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
export const useAuthStore = create((set, get) => ({
   authUser: null,
   isSigningUp: false,
   isLoggingIn: false,
   isCheckingAuth: true,
   socket: null,

   checkAuth: async () => {
      try {
         const res = await axiosInstance.get('/auth/check');
         set({ authUser: res.data });
         get().connectSocket();
      } catch (error) {
         console.error('Error checking auth:', error);
         set({ authUser: null });
      } finally {
         set({ isCheckingAuth: false });
      }
   },
   signup: async (data) => {
      set({ isSigningUp: true });
      try {
         const res = await axiosInstance.post('/auth/signup', data);
         set({ authUser: res.data });
         get().connectSocket();
         alert('Signup successful');
      } catch (err) {
         console.error(err.response.data.message);
         alert('Error signing up');
      } finally {
         set({ isSigningUp: false });
      }
   },
   login: async (data) => {
      set({ isLoggingIn: true });
      try {
         const res = await axiosInstance.post('/auth/login', data);
         set({ authUser: res.data });
         get().connectSocket();
         alert('Login successful');
      } catch (err) {
         console.error(err.response.data.message);
         alert('Error logging in');
      } finally {
         set({ isLoggingIn: false });
      }
   },
   logout: async () => {
      try {
         await axiosInstance.post('/auth/logout');
         set({ authUser: null });
         get().disconnectSocket();
         alert('Logged out successfully');
      } catch (err) {
         console.error(err.response.data.message);
         alert('Error logging out');
      }
   },

   connectSocket: () => {
      const authUser = get().authUser;
      if (!authUser) return;
      const socket = io(BASE_URL)
      socket.connect();
      set({ socket: socket });
   },
   disconnectSocket: () => {
      if (get().socket?.connected) get().socket.disconnect();

   },
}))
// useAuthStore.persist = persist(