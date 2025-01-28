import { useEffect, useState } from 'react';
import { useChatStore } from '../store/chatStore.ts';
import { useAuthStore } from '../store/authStore.ts';

export const Sidebar = () => {
  const users = useChatStore(state => state.users);
  const getUsers = useChatStore(state => state.getUsers);
  const setSelectedUser = useChatStore(state => state.setSelectedUser);
  const isUsersLoading = useChatStore(state => state.isUsersLoading);

  const onlineUsers = useAuthStore(state => state.onlineUsers);

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter(user => onlineUsers.includes(user.id))
    : users;

  if (isUsersLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-800 w-60 padding-y">
      <div className="w-full overflow-y-auto py-3">
        <div className="border-b border-base-300 w-full p-5">
          <div>Contacts</div>
          <div className="mt-3 flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={e => setShowOnlineOnly(e.target.checked)}
              />
              <span className="text-sm">Show online only</span>
            </label>
            <span className="text-xs text-zinc-500">
              ({onlineUsers.length - 1} online)
            </span>
          </div>
        </div>
        {filteredUsers && (
          <ul>
            {filteredUsers.map(user => (
              <li key={user.id}>
                <button onClick={() => setSelectedUser(user)}>
                  <div>
                    <img src={user.profilePic || ''} alt={user.fullName} />
                    {onlineUsers.includes(user.id) && <span>Active</span>}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
        {filteredUsers.length === 0 && <div>Nenhum usuário online</div>}
      </div>
    </div>
  );
};
