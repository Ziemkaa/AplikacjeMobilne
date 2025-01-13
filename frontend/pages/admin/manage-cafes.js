import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchWithAuth } from '../../utils/api';
import { jwtDecode } from 'jwt-decode';

export default function ManageCafes() {
  const [cafes, setCafes] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Nie zalogowany -> wracamy na /
      router.push('/');
      return;
    }
    const decoded = jwtDecode(token);
    if (decoded.role !== 'admin') {
      // Zalogowany, ale nie admin -> wracamy na /cafes
      router.push('/cafes');
      return;
    }

    const getCafes = async () => {
      const data = await fetchWithAuth('http://localhost:5000/api/cafes');
      setCafes(data);
    };
    getCafes();
  }, [router]);

  const addCafe = async () => {
    if (!name || !location) return;
    await fetchWithAuth('http://localhost:5000/api/cafes', {
      method: 'POST',
      body: JSON.stringify({ name, location, description }),
    });
    router.reload();
  };

  const deleteCafe = async (id) => {
    await fetchWithAuth(`http://localhost:5000/api/cafes/${id}`, {
      method: 'DELETE',
    });
    router.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.push('/cafes')}
        className="mb-4 px-4 py-2 bg-gray-200 rounded"
      >
        &larr; Powrót
      </button>
      <h1 className="text-2xl font-bold mb-4">Panel Admina: Zarządzaj Kawiarniami</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nazwa kawiarni"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lokalizacja"
          className="border p-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
         <label>
          Opis:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button
          onClick={addCafe}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Dodaj
        </button>
      </div>
      <ul className="space-y-2">
        {cafes.map((cafe) => (
          <li
            key={cafe._id}
            className="p-2 border rounded flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{cafe.name}</h2>
              <p className="text-sm">{cafe.location}</p>
            </div>
            <button
              onClick={() => deleteCafe(cafe._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
