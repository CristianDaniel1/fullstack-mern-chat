import { Outlet } from 'react-router';
import { Header } from '../components/Header.tsx';
import { useAuthStore } from '../store/authStore.ts';
import { useEffect } from 'react';

export const RootLayout = () => {
  const checkAuth = useAuthStore(state => state.checkAuth);
  const authUser = useAuthStore(state => state.authUser);
  const isCheckingAuth = useAuthStore(state => state.isCheckingAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return <div className="text-4xl">LOADING</div>;

  return (
    <>
      <Header />
      <main className="relative overflow-x-clip">
        <Outlet />
      </main>
    </>
  );
};
