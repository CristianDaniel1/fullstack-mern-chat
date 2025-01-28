import { useEffect, useRef } from 'react';
import { useChatStore } from '../../store/chatStore.ts';
import { MessageInput } from '../MessageInput.tsx';
import { ChatHeader } from './ChatHeader.tsx';
import { useAuthStore } from '../../store/authStore.ts';
import { formatMessageTime } from '../../utils/format.ts';

export const ChatSelected = () => {
  const getMessages = useChatStore(state => state.getMessages);
  const messages = useChatStore(state => state.messages);
  const isMessagesLoading = useChatStore(state => state.isMessagesLoading);
  const selectedUser = useChatStore(state => state.selectedUser);
  const subscribeToMessages = useChatStore(state => state.subscribeToMessages);
  const unsubscribeToMessages = useChatStore(
    state => state.unsubscribeToMessages
  );

  const authUser = useAuthStore(state => state.authUser);

  const messageScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedUser) getMessages(selectedUser.id);

    subscribeToMessages();

    return () => {
      unsubscribeToMessages();
    };
  }, [getMessages, selectedUser, subscribeToMessages, unsubscribeToMessages]);

  useEffect(() => {
    const lastMessage = messageScroll.current;
    let timer: number;

    if (lastMessage && messages) {
      timer = setTimeout(() => {
        lastMessage.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <>
      <ChatHeader />
      {isMessagesLoading && <div>loading...</div>}
      {messages && (
        <div className="flex flex-col gap-8">
          {messages.map((message, index) => (
            <div
              key={message.id}
              ref={index === messages.length - 1 ? messageScroll : null}
              className={`mx-5 ${
                message.senderId === authUser?.id
                  ? 'text-blue-300 w-20'
                  : 'text-red-400'
              }`}
            >
              <div>
                <img
                  src={
                    message.senderId === authUser?.id
                      ? authUser.profilePic || ''
                      : selectedUser?.profilePic || ''
                  }
                  alt="Foto de perfil"
                  className="size-10 rounded-full"
                />
              </div>
              <div>
                <time className="text-xs">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="bg-slate-800 rounded-lg flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Imagem enviada"
                    className="rounded-md p-1"
                  ></img>
                )}
                {message.text && <p className="p-4">{message.text}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
      <MessageInput />
    </>
  );
};
