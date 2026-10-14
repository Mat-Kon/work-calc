'use client';
import { TextInput } from '@/shared/inputs';
import st from './index.module.scss';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Mode = 'login' | 'register';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [isOpenPas, setOpenPas] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const isRegister = mode === 'register';

  const handleChecked = () => {
    setOpenPas((prev) => !prev);
  };

  const toggleMode = () => {
    setMode(isRegister ? 'login' : 'register');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const login = String(form.get('login') ?? '').trim();
    const password = String(form.get('password') ?? '');

    try {
      if (isRegister) {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ login, password }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error ?? 'Не удалось зарегистрироваться');
          return;
        }
      }

      const result = await signIn('credentials', { login, password, redirect: false });
      if (result?.error) {
        setError('Неверный логин или пароль');
        return;
      }

      router.replace('/calculate');
      router.refresh();
    } catch {
      setError('Ошибка сети, попробуйте ещё раз');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={st.login_form} onSubmit={handleSubmit}>
      <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>

      <fieldset>
        <TextInput
          placeholder="Логин"
          autoComplete="username"
          name="login"
          required
          minLength={3}
        />

        <input
          type={isOpenPas ? 'text' : 'password'}
          placeholder="Пароль"
          autoComplete={isRegister ? 'new-password' : 'current-password'}
          name="password"
          required
          minLength={4}
        />

        <label htmlFor="openPas" className={`${st.open_pas} ${isOpenPas ? st.active : ''}`}>
          показать пароль
          <input type="checkbox" id="openPas" className={st.checkbox} onChange={handleChecked} />
        </label>
      </fieldset>

      {error && (
        <p className={st.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={isLoading}>
        {isLoading ? '...' : isRegister ? 'Зарегистрироваться' : 'Войти'}
      </button>

      <button type="button" className={st.switch} onClick={toggleMode}>
        {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
      </button>
    </form>
  );
};
