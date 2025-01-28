import { ChatContainer } from '../components/chat/ChatContainer.tsx';
import { Sidebar } from '../components/Sidebar.tsx';
import { useNavigateToLogin } from '../hooks/useNavigateToLogin.ts';

export const Home = () => {
  useNavigateToLogin();

  return (
    <>
      <h1 className="h-full">
        <div className="flex">
          <Sidebar />
          <ChatContainer />
        </div>
      </h1>
    </>
  );
};
