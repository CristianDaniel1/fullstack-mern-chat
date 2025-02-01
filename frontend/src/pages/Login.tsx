import { FormEvent } from 'react';
import { Button } from '../components/ui/Button.tsx';
import { useNavigateToHome } from '../hooks/useNavigateToHome.ts';
import { useAuthStore } from '../store/authStore.ts';
import { Link } from 'react-router';
import { Input } from '../components/ui/Input.tsx';
import { LoginData } from '../types.ts';

export const Login = () => {
  useNavigateToHome();
  const login = useAuthStore(state => state.login);
  const isLoggingIn = useAuthStore(state => state.isLoggingIn);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = Object.fromEntries(formData.entries()) as LoginData;

    login(data);
    // event.currentTarget.reset();
  }

  return (
    <section className="min-h-screen grid md:grid-cols-2">
      <div className="flex flex-col bg-[#222831] justify-center items-center p-6 sm:p-12">
        <form onSubmit={handleSubmit} className="mx-auto w-2/3">
          <div className="flex flex-col gap-5 px-6 py-8 w-full">
            <Input
              label="Email"
              id="email"
              placeholder="marston@gmail.com"
              autoComplete="off"
            />
            <Input label="Senha" id="password" placeholder="********" />
            <Button
              className="bg-slate-700 font-medium px-2 py-3"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Validando...' : 'Entrar'}
            </Button>
          </div>
        </form>
        <p>
          Não possui uma conta?{' '}
          <Link to="/signup" className="font-medium text-violet-300 underline">
            Criar uma conta
          </Link>
        </p>
      </div>
      <div>fd</div>
    </section>
  );
};
