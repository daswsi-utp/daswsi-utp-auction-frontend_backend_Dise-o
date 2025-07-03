'use client';

import React from 'react';
import Header from '../componets/Header';
export default function SearchPage() {
  return (
    <div>
      <Header /> {/* ✅ Mantiene el navbar */}
      <main style={styles.container}>
        <h1 style={styles.title}>🔧 Página de busqueda en mantenimiento</h1>
        <p style={styles.subtitle}>
          Estamos trabajando para mejorar la experiencia de búsqueda.
        </p>
        <p style={styles.subtitle}>Por favor, vuelve más tarde. 🙏</p>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh', 
    backgroundColor: '#f7f7f7',
    color: '#333',
    textAlign: 'center',
    padding: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
};
