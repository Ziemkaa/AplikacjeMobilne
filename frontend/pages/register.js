import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Domyślnie rola 'user', admin do testów
  const [role, setRole] = useState('user');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });
      if (res.ok) {
        alert('Zarejestrowano pomyślnie!');
        router.push('/'); // powrót do logowania
      } else {
        const data = await res.json();
        alert(`Błąd rejestracji: ${data.message}`);
      }
    } catch (err) {
      alert('Błąd rejestracji');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl mb-4 font-bold">Rejestracja</h1>
        <form onSubmit={handleRegister}>
          <label className="block mb-2">
            Nazwa użytkownika
            <input
              type="text"
              className="border w-full p-2 mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="block mb-2">
            Hasło
            <input
              type="password"
              className="border w-full p-2 mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="block mb-4">
            Rola
            <select
              className="border w-full p-2 mt-1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">Użytkownik</option>
              <option value="admin">Administrator</option>
            </select>
          </label>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Zarejestruj się
          </button>
        </form>
      </div>
    </div>
  );
}
