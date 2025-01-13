import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../utils/auth';

export default function LandingPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login({ username, password });
    if (success) {
      console.log('Logowanie udane, przekierowanie na /cafes');
      router.push('/cafes');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl mb-4 font-bold">Zaloguj się</h1>
        <form onSubmit={handleLogin}>
          <label className="block mb-2">
            Nazwa użytkownika
            <input
              type="text"
              className="border w-full p-2 mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="block mb-4">
            Hasło
            <input
              type="password"
              className="border w-full p-2 mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Zaloguj
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>Nie masz konta?</p>
          <a
            className="text-blue-500 underline"
            href="/register"
          >
            Zarejestruj się
          </a>
        </div>
      </div>
    </div>
  );
}
