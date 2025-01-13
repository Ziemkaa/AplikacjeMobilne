import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

export default function Cafes() {
  const [cafes, setCafes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('Token not found!');
      router.push('/');
      return;
    }
  
    try {
        // Użyj poprawnej funkcji 'jwt_decode'
        const decoded = jwtDecode(token);
        //console.log('Decoded token:', decoded);
  
      if (decoded.role === 'admin') {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error decoding token:', error); // Logowanie błędu
      router.push('/');
    }
  
    const fetchCafes = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/cafes');
        const data = await res.json();
        setCafes(data);
      } catch (err) {
        console.error('Error fetching cafes:', err);
      }
    };
  
    fetchCafes();
  }, [router]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Wrocławskie Kawiarnie</h1>
        {isAdmin && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => router.push('/admin/manage-cafes')}
          >
            Panel admina
          </button>
        )}
      </div>

      <ul className="space-y-4">
        {cafes.map((cafe) => (
          <li
            key={cafe._id}
            className="p-4 border rounded shadow cursor-pointer"
            onClick={() => router.push(`/cafes/${cafe._id}`)}
          >
            <h2 className="text-xl font-semibold">{cafe.name}</h2>
            <p>{cafe.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
