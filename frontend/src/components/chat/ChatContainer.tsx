import { useChatStore } from '../../store/chatStore.ts';
import { Chat } from './Chat.tsx';
import { ChatSelected } from './ChatSelected.tsx';

export const ChatContainer = () => {
  const selectedUser = useChatStore(state => state.selectedUser);

  return (
    <div className="padding-y">
      {selectedUser ? <ChatSelected /> : <Chat />}
    </div>
  );
};
