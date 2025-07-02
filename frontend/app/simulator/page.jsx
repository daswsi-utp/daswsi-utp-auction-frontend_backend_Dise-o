"use client";

import Header from "../componets/Header";
import React, { useState, useEffect, useRef } from "react";
import "./simulator.css";
import "../styles/global.css";

const STRATEGIES = [
  { id: "CONSERVATIVE", name: "Conservadora", description: "Puja poco a poco, esperando hasta el final." },
  { id: "AGGRESSIVE", name: "Agresiva", description: "Puja rápidamente y alto para dominar desde el inicio." },
  { id: "BALANCED", name: "Intermedia", description: "Equilibra rapidez y cautela según el momento." },
];

export default function SimulatorPage() {
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [auctionState, setAuctionState] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [userBid, setUserBid] = useState("");
  const intervalRef = useRef(null);

  const BASE_URL = "http://localhost:8085/auction";

  const fetchState = async () => {
    try {
      const res = await fetch(`${BASE_URL}/estado`);
      const data = await res.json();

      if (data.bidHistory?.length > 8) {
        data.bidHistory = data.bidHistory.slice(-8);
      }

      setAuctionState(data);

      if (data.remainingTime === 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
        setIsRunning(false);
      }
    } catch (err) {
      console.error("Error fetching state:", err);
    }
  };

  const startAuction = async () => {
    if (!selectedStrategy) return alert("Selecciona una estrategia primero.");

    try {
      const res = await fetch(`${BASE_URL}/iniciar?estrategia=${selectedStrategy.id}`, {
        method: "POST",
      });
      const data = await res.json();
      setAuctionState(data);
      setIsRunning(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(fetchState, 1000);
    } catch (err) {
      console.error("Error starting auction:", err);
    }
  };

  const sendBid = async () => {
    const amount = Number(userBid);
    if (!amount || amount <= 0) return alert("Ingresa un monto válido.");
    try {
      const res = await fetch(`${BASE_URL}/pujar?monto=${amount}`, {
        method: "POST",
      });
      const data = await res.json();
      setAuctionState(data);
      setUserBid("");
    } catch (err) {
      console.error("Error sending bid:", err);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setAuctionState(null);
    setUserBid("");
    setSelectedStrategy(null);
    setIsRunning(false);
  };

  const lastBid = auctionState?.bidHistory?.slice(-1)[0];

  const formatTime = (timeString) => {
    try {
      const date = new Date(`1970-01-01T${timeString}`);
      return date.toLocaleTimeString("es-PE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return timeString;
    }
  };

  return (
    <>
      <Header />
      <div className="simulator-container">
        {!auctionState ? (
          <div className="simulator-card">
            <div className="simulator-header">
              <h1 className="text-2xl font-bold">Simulador de Estrategias</h1>
              <p className="text-sm mt-1">¡Practica tus pujas como un profesional!</p>
            </div>

            <div className="simulator-body">
              <div className="simulator-section">
                <label className="block text-gray-700 font-medium mb-2">Selecciona una estrategia:</label>
                <select
                  value={selectedStrategy?.id || ""}
                  onChange={(e) =>
                    setSelectedStrategy(STRATEGIES.find((s) => s.id === e.target.value) || null)
                  }
                  className="simulator-select"
                  disabled={isRunning}
                >
                  <option value="">-- Selecciona --</option>
                  {STRATEGIES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedStrategy && (
                <p className="text-gray-500 italic text-sm">{selectedStrategy.description}</p>
              )}

              <button onClick={startAuction} className="simulator-button start-btn">
                Iniciar Subasta
              </button>
            </div>
          </div>
        ) : (
          <>
        
            <div className="simulator-card simulator-panel">
              <div className="simulator-section status-box">
                <div><strong>⏳ Tiempo restante:</strong> {auctionState.remainingTime}s</div>
                <div>
                  <strong>💰 Última puja:</strong>{" "}
                  {lastBid?.bidder || "—"} por {lastBid?.amount || "—"}
                </div>
              </div>

              {auctionState.remainingTime > 0 && (
                <>
                  <div className="simulator-section">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tu puja:</label>
                    <input
                      type="number"
                      value={userBid}
                      onChange={(e) => setUserBid(e.target.value)}
                      className="simulator-input"
                      placeholder="Ingresa tu monto"
                    />
                    <button
                      onClick={sendBid}
                      className="simulator-button bid-btn"
                      disabled={!userBid || Number(userBid) <= (lastBid?.amount || 0)}
                    >
                      Enviar Puja
                    </button>
                  </div>

                  {auctionState.recommendation && (
                    <div className="recommendation">
                      <strong>🎯 Consejo:</strong> {auctionState.recommendation}
                    </div>
                  )}
                </>
              )}

              {auctionState.remainingTime === 0 && (
                <div className="auction-result-box">
                  <h2
                    className={`result-message ${
                      auctionState.winner?.toLowerCase() === "usuario" ? "win" : "lose"
                    }`}
                  >
                    {auctionState.recommendation}
                  </h2>
                  <button onClick={reset} className="simulator-button reset-btn">
                    Reiniciar Subasta
                  </button>
                </div>
              )}
            </div>

   
            <div className="history-card">
              <h3 className="text-md font-semibold text-gray-800 mb-2">📜 Historial de Pujas</h3>
              <div className="bid-history">
                {auctionState.bidHistory.length === 0 ? (
                  <p className="text-gray-500 text-sm">No hay pujas aún.</p>
                ) : (
                  auctionState.bidHistory.map((b, i) => (
                    <div
                      key={i}
                      className={`bid-bubble ${b.bidder === "Usuario" ? "user-bid" : "machine-bid"}`}
                    >
                      <span><strong>{b.bidder}</strong> pujó <strong>{b.amount}</strong></span>
                      <span className="timestamp">{formatTime(b.time)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
