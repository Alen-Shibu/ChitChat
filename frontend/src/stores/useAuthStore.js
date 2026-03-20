import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp:false,
    isLoggingIn:false,
    socket: null,
    onlineUsers: [],

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            console.log("Error in checkAuth:",error)
            set({authUser:null})
        } finally {
            set({isCheckingAuth:false})
        }
    },

    signup: async(data) => {
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post('/auth/signup',data)
            set({authUser:res.data})
            toast.success("Successfully signed in")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
        set({isSigningUp:false})
        }
    },

    login: async(data) => {
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post('/auth/login',data)
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isLoggingIn:false})
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post('/auth/logout')
            set({authUser:null})
            toast.success("Logged Out Successfully")
            get().disconnectSocket()
        } catch (error) {
            toast.error("Error in Logging out:",error)
            console.log('Error in logout:',error.message)
        }
    },

    updateProfile:async(data) => {
        try {
            const res = await axiosInstance.put('/auth/update-profile',data)
            set({authUser:res.data})
        } catch (error) {
            toast.error("Error in updating profile:",error)
            console.log('Error in profile update:',error)
        }
    },

    connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true, // this ensures cookies are sent with the connection
    });

    socket.connect();

    set({ socket });

    // listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}))