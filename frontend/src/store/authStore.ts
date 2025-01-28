import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';
import { axiosInstance } from '../lib/axios.ts';
import { LoginData, SignupData, UserAuth } from '../types.ts';
import { io, Socket } from 'socket.io-client';

const BASE_URL = 'http://localhost:3000';

interface AuthType {
  authUser: UserAuth | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  onlineUsers: string[];
  socket: Socket | null;

  checkAuth: () => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: { profilePic: string }) => Promise<void>;

  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<AuthType>((set, get) => {
  return {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
      try {
        const res: AxiosResponse<UserAuth> = await axiosInstance.get(
          '/auth/check'
        );

        set({ authUser: res.data });

        get().connectSocket();
      } catch (error) {
        console.log('Error in checkAuth: ', error);
        set({ authUser: null });
      }

      set({ isCheckingAuth: false });
    },

    login: async data => {
      set({ isLoggingIn: true });
      try {
        const res = await axiosInstance.post('auth/login', data);
        set({ authUser: res.data });

        get().connectSocket();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response!.data.message);
        }
      }

      set({ isLoggingIn: false });
    },

    signup: async data => {
      set({ isSigningUp: true });
      try {
        const res = await axiosInstance.post('auth/signup', data);
        set({ authUser: res.data });

        get().connectSocket();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);
        }
      }

      set({ isSigningUp: false });
    },

    logout: async () => {
      try {
        await axiosInstance.post('/auth/logout');
        set({ authUser: null });

        get().disconnectSocket();
      } catch (error) {
        console.log(error);
      }
    },

    updateProfile: async data => {
      set({ isUpdatingProfile: true });

      try {
        const res = await axiosInstance.put('/auth/update-profile', data);

        const authData = get().authUser;

        const updatedAuth = {
          ...authData,
          profilePic: res.data,
        } as UserAuth | null;

        set({ authUser: updatedAuth });
      } catch (error) {
        console.log(error);
      }

      set({ isUpdatingProfile: false });
    },

    connectSocket: () => {
      const authUser = get().authUser;
      if (!authUser || get().socket?.connected) return;

      const socket = io(BASE_URL, {
        query: { userId: authUser.id },
      });
      socket.connect();

      set({ socket });

      socket.on('getOnlineUsers', (userIds: string[]) => {
        set({ onlineUsers: userIds });
      });
    },

    disconnectSocket: () => {
      if (get().socket?.connected) get().socket?.disconnect();
    },
  };
});
