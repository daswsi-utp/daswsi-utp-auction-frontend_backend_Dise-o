// app/login/page.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import '../styles/login.css';

function Login() {
  const [screen, setScreen] = useState('welcome'); // Estado para manejar las pantallas

  const showScreen = (screenName) => {
    setScreen(screenName); // Cambia la pantalla activa
  };

  return (
    <div className="auth-container">
      {/* Pantalla de Bienvenida */}
      {screen === 'welcome' && (
        <div id="welcome-screen" className="screen active">
          <div className="auth-header">
            <div className="auth-logo">
              <i className="fas fa-gavel text-5xl text-indigo-600"></i>
            </div>
            <h1 className="auth-title text-2xl">Bienvenido a la Plataforma de Subastas</h1>
          </div>
          <div className="flex flex-col gap-4">
            <button onClick={() => showScreen('login')} className="auth-btn auth-btn-primary w-full">
              Iniciar Sesión
            </button>
            
            <Link href="/login/register" passHref>
              <button className="auth-btn auth-btn-secondary w-full">
                Registrarse
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Pantalla de Iniciar Sesión */}
      {screen === 'login' && (
        <div id="login-screen" className="screen active">
          <div className="auth-header">
            <div className="auth-logo">
              <i className="fas fa-user-lock text-5xl text-indigo-600"></i>
            </div>
            <h1 className="auth-title text-2xl">Iniciar Sesión</h1>
            <p className="auth-subtitle">Accede a tu cuenta</p>
          </div>
          <form>
            <div className="form-group">
              <input type="email" className="auth-input" placeholder="Correo electrónico" />
            </div>
            <div className="form-group">
              <input type="password" className="auth-input" placeholder="Contraseña" />
            </div>
            <div className="form-group">
              <button type="submit" className="auth-btn auth-btn-primary w-full">Iniciar sesión</button>
            </div>
          </form>
          <div className="form-help">
            <Link href="/login/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>
          <div className="form-help">
            <Link href="/login/register">
              <button className="auth-btn auth-btn-secondary w-full">
                Regístrate aquí
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
