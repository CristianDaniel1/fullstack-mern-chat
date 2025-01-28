import { Link } from 'react-router';
import { useAuthStore } from '../store/authStore.ts';
import { useChatStore } from '../store/chatStore.ts';

export const Header = () => {
  const authUser = useAuthStore(state => state.authUser);
  const logout = useAuthStore(state => state.logout);

  const setSelectedUser = useChatStore(state => state.setSelectedUser);

  function handleLogout() {
    setSelectedUser(null);
    logout();
  }

  return (
    <header className="w-full fixed z-40 bg-slate-800/80 h-14">
      <div className="max-container padding-x flex justify-between items-center h-full">
        <div>
          <Link to="/" className="text-lg font-bold">
            Chat
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="">
            <Link to="/settings">Config</Link>
          </div>
          {authUser && (
            <>
              <div className="">
                <Link to="/profile">profile</Link>
              </div>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
