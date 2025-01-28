import { useAuthStore } from '../../store/authStore.ts';
import { useChatStore } from '../../store/chatStore.ts';

export const ChatHeader = () => {
  const selectedUser = useChatStore(state => state.selectedUser);
  const setSelectedUser = useChatStore(state => state.setSelectedUser);
  const onlineUsers = useAuthStore(state => state.onlineUsers);

  return (
    <div>
      <div>
        <img
          src={selectedUser?.profilePic || ''}
          alt={selectedUser?.fullName}
        />
      </div>
      <div>
        <h3>{selectedUser?.fullName}</h3>
        <p>
          {selectedUser && onlineUsers.includes(selectedUser.id)
            ? 'Online'
            : 'Offline'}
        </p>
      </div>
      <button onClick={() => setSelectedUser(null)}>x</button>
    </div>
  );
};
