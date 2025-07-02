'use client';

import { useState } from 'react';

export default function SimulatorPage() {
  const [strategy, setStrategy] = useState('AGGRESSIVE');
  const [auctionState, setAuctionState] = useState(null);
  const [isAuctionStarted, setIsAuctionStarted] = useState(false);

  const handleStartAuction = async () => {
    
    setIsAuctionStarted(true);
    console.log('Subasta iniciada con estrategia:', strategy);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Simulador de Estrategias</h1>

      <div className="mb-4">
        <label htmlFor="strategy" className="block text-sm font-medium mb-2">
          Selecciona una estrategia:
        </label>
        <select
          id="strategy"
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="AGGRESSIVE">Agresiva</option>
          <option value="BALANCED">Balanceada</option>
          <option value="CONSERVATIVE">Conservadora</option>
        </select>
      </div>

      <button
        onClick={handleStartAuction}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        disabled={isAuctionStarted}
      >
        Iniciar Subasta
      </button>

    
    </div>
  );
}
