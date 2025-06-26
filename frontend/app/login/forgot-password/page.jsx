//app\login\forgot-password\page.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import '../../styles/login1.css';

function ForgotPassword() {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-logo">
          <i className="fas fa-key text-5xl text-indigo-600"></i>
        </div>
        <h1 className="auth-title text-2xl">Olvidé mi contraseña</h1>
        <p className="auth-subtitle">Recupera tu contraseña</p>
      </div>
      <form>
        <div className="form-group">
          <input type="email" className="auth-input" placeholder="Correo electrónico" />
        </div>
        <div className="form-group">
          <button type="submit" className="auth-btn auth-btn-primary w-full">Recuperar contraseña</button>
        </div>
      </form>
      <div className="form-help">
        <Link href="/login">Volver a iniciar sesión</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
