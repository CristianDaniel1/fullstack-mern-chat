import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore.ts';
import { useEffect } from 'react';

export const useNavigateToLogin = () => {
  const authUser = useAuthStore(state => state.authUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) navigate('/login');
  }, [authUser, navigate]);
};
