'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../componets/Header';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`http://localhost:8082/api/search?query=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Resultados para: "{query}"</h1>
        {loading ? (
          <p>Cargando...</p>
        ) : results.length === 0 ? (
          <p>No se encontraron subastas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map((item) => (
              <div key={item.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
                <img src={item.imageUrl} alt={item.title} className="h-48 w-full object-cover rounded mb-2" />
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                <p className="text-green-600 font-bold mt-2">S/ {item.initialPrice}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
