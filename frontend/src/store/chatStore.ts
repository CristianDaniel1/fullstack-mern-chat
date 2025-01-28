import { create } from 'zustand';
import { MessageInfo, UserAuth } from '../types.ts';
import { axiosInstance } from '../lib/axios';
import axios from 'axios';
import { useAuthStore } from './authStore.ts';

type Message = {
  text?: string;
  image?: string;
};

interface ChatType {
  messages: MessageInfo[];
  users: UserAuth[];
  selectedUser: UserAuth | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (message: Message) => Promise<void>;
  setSelectedUser: (selectedUser: UserAuth | null) => void;
  subscribeToMessages: () => void;
  unsubscribeToMessages: () => void;
}

export const useChatStore = create<ChatType>((set, get) => {
  return {
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
      set({ isUsersLoading: true });

      try {
        const res = await axiosInstance.get('/message/users');

        set({ users: res.data });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);
        }
      }

      set({ isUsersLoading: false });
    },

    getMessages: async userId => {
      set({ isMessagesLoading: true });

      try {
        const res = await axiosInstance.get(`/message/${userId}`);

        set({ messages: res.data });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);
        }
      }

      set({ isMessagesLoading: false });
    },

    sendMessage: async message => {
      const messages = get().messages;
      const selectedUser = get().selectedUser;

      try {
        const res = await axiosInstance.post(
          `/message/send/${selectedUser?.id}`,
          message
        );

        set({ messages: [...messages, res.data] });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);
        }
      }
    },

    setSelectedUser: selectedUser => {
      set({ selectedUser });
    },

    subscribeToMessages: () => {
      const selectedUser = get().selectedUser;

      if (!selectedUser) return;

      const socket = useAuthStore.getState().socket;

      socket?.on('newMessage', newMessage => {
        if (newMessage.senderId !== selectedUser.id) return;

        set({ messages: [...get().messages, newMessage] });
      });
    },

    unsubscribeToMessages: () => {
      const socket = useAuthStore.getState().socket;

      socket?.off('newMessage');
    },
  };
});
