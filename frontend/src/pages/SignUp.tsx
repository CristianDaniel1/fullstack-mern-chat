import { FormEvent } from 'react';
import { useNavigateToHome } from '../hooks/useNavigateToHome.ts';
import { useAuthStore } from '../store/authStore.ts';
import { Button } from '../components/ui/Button.tsx';
import { Input } from '../components/ui/Input.tsx';
import { Link } from 'react-router';
import { FormDataType } from '../types.ts';

export const SignUp = () => {
  useNavigateToHome();
  const signup = useAuthStore(state => state.signup);
  const isSigningUp = useAuthStore(state => state.isSigningUp);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const {
      password,
      email,
      ['full-name']: fullName,
    } = Object.fromEntries(formData.entries()) as FormDataType;

    signup({ password, email, fullName });
    // event.currentTarget.reset();
  }

  return (
    <section className="min-h-screen grid md:grid-cols-2">
      <div className="flex flex-col bg-[#222831] justify-center items-center p-6 sm:p-12">
        <form onSubmit={handleSubmit} className="mx-auto w-2/3">
          <div className="flex flex-col gap-5 px-6 py-8 w-full">
            <Input
              label="Nome completo"
              id="full-name"
              placeholder="John Marston"
            />
            <Input
              label="Email"
              id="email"
              placeholder="marston@gmail.com"
              autoComplete="off"
            />
            <Input label="Senha" id="password" placeholder="********" />
            <Button
              className="bg-slate-700 font-medium px-2 py-3"
              disabled={isSigningUp}
            >
              {isSigningUp ? 'Enviando...' : 'Registrar-se'}
            </Button>
          </div>
        </form>
        <p>
          Já possui uma conta?{' '}
          <Link to="/login" className="font-medium text-violet-300 underline">
            login
          </Link>
        </p>
      </div>
      <div>fd</div>
    </section>
  );
};
