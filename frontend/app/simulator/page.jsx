'use client';

import { useState, useEffect, useRef } from 'react';

export default function SimulatorPage() {
  const [strategy, setStrategy] = useState('AGGRESSIVE');
  const [auctionState, setAuctionState] = useState(null);
  const [isAuctionStarted, setIsAuctionStarted] = useState(false);
  const [userBid, setUserBid] = useState('');
  const [isSendingBid, setIsSendingBid] = useState(false);
  const intervalRef = useRef(null);

  const handleStartAuction = async () => {
    try {
      const res = await fetch('http://localhost:8085/iniciar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ strategy }),
      });

      const data = await res.json();
      setAuctionState(data);
      setIsAuctionStarted(true);

      intervalRef.current = setInterval(fetchAuctionState, 1000);
    } catch (error) {
      console.error('Error al iniciar la subasta:', error);
    }
  };

  const fetchAuctionState = async () => {
    try {
      const res = await fetch('http://localhost:8085/estado');
      const data = await res.json();

      setAuctionState(data);

      if (data.remainingTime <= 0) {
        clearInterval(intervalRef.current);
      }
    } catch (error) {
      console.error('Error al obtener estado de subasta:', error);
    }
  };

  const handleSendBid = async () => {
    if (!userBid || isNaN(userBid)) return;

    setIsSendingBid(true);
    try {
      const res = await fetch('http://localhost:8085/pujar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(userBid) }),
      });

      const data = await res.json();
      setAuctionState(data);
      setUserBid('');
    } catch (error) {
      console.error('Error al enviar puja:', error);
    } finally {
      setIsSendingBid(false);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setStrategy('AGGRESSIVE');
    setAuctionState(null);
    setUserBid('');
    setIsAuctionStarted(false);
    setIsSendingBid(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Simulador de Estrategias</h1>

      {!isAuctionStarted && (
        <>
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
          >
            Iniciar Subasta
          </button>
        </>
      )}

      {auctionState && (
        <div className="mt-6">
          <p className="text-lg mb-4">
            Tiempo restante: <span className="font-semibold">{auctionState.remainingTime}s</span>
          </p>

          {/* Input para pujar */}
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              placeholder="Ingresa tu puja"
              value={userBid}
              onChange={(e) => setUserBid(e.target.value)}
              className="w-full border rounded px-3 py-2"
              disabled={auctionState.remainingTime <= 0}
            />
            <button
              onClick={handleSendBid}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 rounded"
              disabled={isSendingBid || auctionState.remainingTime <= 0}
            >
              Enviar
            </button>
          </div>

          {/* Historial de pujas */}
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-3">Historial de Pujas</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {auctionState.bidHistory.map((bid, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm max-w-xs ${
                    bid.bidder === 'USER'
                      ? 'bg-blue-100 self-end ml-auto text-right'
                      : 'bg-gray-200 self-start mr-auto text-left'
                  }`}
                >
                  <span className="block font-medium">
                    {bid.bidder === 'USER' ? 'Tú' : 'Máquina'}
                  </span>
                  <span>S/. {bid.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mensaje final */}
          {auctionState.remainingTime <= 0 && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-4">
              <p className="font-semibold">Resultado:</p>
              <p>{auctionState.recommendation}</p>
            </div>
          )}

          {/* Botón de reinicio */}
          {auctionState.remainingTime <= 0 && (
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Reiniciar Simulación
            </button>
          )}
        </div>
      )}
    </div>
  );
}
