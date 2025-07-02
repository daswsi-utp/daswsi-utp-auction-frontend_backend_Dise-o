'use client';

import { useState, useEffect, useRef } from 'react';
import './styles/simulator.css'; 

export default function SimulatorPage() {
  

  return (
    <div className="simulator-container">
      <h1 className="simulator-title">Simulador de Estrategias</h1>

      {!isAuctionStarted && (
        <>
          <div className="strategy-select-box">
            <label htmlFor="strategy" className="label">
              Selecciona una estrategia:
            </label>
            <select
              id="strategy"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="select"
            >
              <option value="AGGRESSIVE">Agresiva</option>
              <option value="BALANCED">Balanceada</option>
              <option value="CONSERVATIVE">Conservadora</option>
            </select>
          </div>

          <button
            onClick={handleStartAuction}
            className="start-button"
          >
            Iniciar Subasta
          </button>
        </>
      )}

      {auctionState && (
        <div className="auction-box">
          <p className="time-counter">
            Tiempo restante: <span>{auctionState.remainingTime}s</span>
          </p>

          <div className="bid-input-group">
            <input
              type="number"
              placeholder="Ingresa tu puja"
              value={userBid}
              onChange={(e) => setUserBid(e.target.value)}
              className="bid-input"
              disabled={auctionState.remainingTime <= 0}
            />
            <button
              onClick={handleSendBid}
              className="bid-button"
              disabled={isSendingBid || auctionState.remainingTime <= 0}
            >
              Enviar
            </button>
          </div>

          <div className="history-box">
            <h2 className="history-title">Historial de Pujas</h2>
            <div className="history-scroll">
              {auctionState.bidHistory.map((bid, index) => (
                <div
                  key={index}
                  className={`bubble ${bid.bidder === 'USER' ? 'user' : 'machine'}`}
                >
                  <span className="bubble-author">
                    {bid.bidder === 'USER' ? 'Tú' : 'Máquina'}
                  </span>
                  <span>S/. {bid.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {auctionState.remainingTime <= 0 && (
            <>
              <div className="result-box">
                <p className="result-title">Resultado:</p>
                <p className="result-text">{auctionState.recommendation}</p>
              </div>

              <button
                onClick={handleReset}
                className="reset-button"
              >
                Reiniciar Simulación
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
