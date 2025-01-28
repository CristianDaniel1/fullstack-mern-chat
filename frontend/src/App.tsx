import { createBrowserRouter, RouterProvider } from 'react-router';
import { Home } from './pages/Home.tsx';
import { RootLayout } from './pages/RootLayout.tsx';
import { Login } from './pages/Login.tsx';
import { SignUp } from './pages/SignUp.tsx';
import { Settings } from './pages/Settings.tsx';
import { Profile } from './pages/Profile.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'settings', element: <Settings /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
