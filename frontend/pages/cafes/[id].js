import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';

export default function CafeDetails() {
  const router = useRouter();
  const { id } = router.query; // cafeId
  const [cafe, setCafe] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }

    if (!id) return; // jeśli nie załadował się jeszcze id z query

    const fetchCafe = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/cafes/${id}`);
        const data = await res.json();
        setCafe(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCafe();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment) return;
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Musisz być zalogowany, aby dodać komentarz!');
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Token musi być wysyłany
        },
        body: JSON.stringify({ text: newComment }),
      });
  
      if (!res.ok) {
        throw new Error('Błąd dodawania komentarza');
      }
  
      const commentData = await res.json();
  
      // Dodaj nowy komentarz do stanu
      setCafe({
        ...cafe,
        comments: [...(cafe.comments || []), commentData],
      });
      setNewComment('');
    } catch (error) {
      alert('Błąd dodawania komentarza');
      console.error(error);
    }
  };

  if (!cafe) {
    return <div className="p-4">Ładowanie...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.push('/cafes')}
        className="mb-4 px-4 py-2 bg-gray-200 rounded"
      >
        &larr; Powrót
      </button>
      <h1 className="text-2xl font-bold mb-2">{cafe.name}</h1>
      <p className="mb-4">{cafe.location}</p>
      <p className="mb-4">{cafe.description}</p> {/* Wyświetl opis */}
      
      <h2 className="text-xl font-semibold mb-2">Komentarze:</h2>
      {cafe.comments && cafe.comments.length > 0 ? (
        <ul className="space-y-2 mb-4">
          {cafe.comments.map((comment) => (
            <li key={comment._id} className="border p-2 rounded">
              <p>{comment.text}</p>
              {comment.user && (
                <p className="text-sm text-gray-600">
                  Autor: {comment.user.username}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak komentarzy</p>
      )}

      {loggedIn ? (
        <div className="mt-4">
          <textarea
            className="border w-full p-2"
            rows="3"
            placeholder="Dodaj komentarz..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Dodaj komentarz
          </button>
        </div>
      ) : (
        <p className="mt-2 text-red-500">
          Musisz się zalogować, aby dodać komentarz
        </p>
      )}
    </div>
  );
}
