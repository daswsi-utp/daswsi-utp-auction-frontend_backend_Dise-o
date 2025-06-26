'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../styles/login1.css';

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-split-container">
        {/* Sección de la imagen */}
        <div className="auth-hero-section">
          <div className="auth-image-container">
            <Image 
              src="/iconos/registroiniciarsesion.png" 
              alt="Recuperación de contraseña" 
              width={500} 
              height={500}
              className="auth-hero-image"
              priority
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">¿Problemas para ingresar?</h2>
            <p className="text-gray-600 mt-2">Sigue las instrucciones para recuperar tu acceso</p>
            
            <div className="benefits-container mt-6">
              <h3 className="benefits-title">Consejos de seguridad</h3>
              <ul className="benefits-list">
                <li>Revisa tu carpeta de spam si no recibes el correo</li>
                <li>Asegúrate de escribir correctamente tu email</li>
                <li>El enlace de recuperación expira en 1 hora</li>
                <li>Contacta a soporte si necesitas ayuda</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sección del formulario */}
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <Image 
                src="/iconos/iniciosesiongoole.png" 
                alt="Logo de subastas" 
                width={60} 
                height={60}
              />
            </div>
            <h1 className="auth-title">Recuperar contraseña</h1>
            <p className="auth-subtitle">
              {emailSent 
                ? "Revisa tu correo electrónico" 
                : "Ingresa tu email para recibir instrucciones"}
            </p>
          </div>
          
          {emailSent ? (
            <div className="text-center py-6">
              <div className="mb-4 text-green-500">
                <i className="fas fa-check-circle text-5xl"></i>
              </div>
              <p className="mb-6">
                Hemos enviado un enlace de recuperación a <strong>{email}</strong>.
                Por favor revisa tu bandeja de entrada.
              </p>
              <button 
                onClick={handleGoogleLogin}
                className="google-btn"
                disabled={isLoading}
              >
                <Image 
                  src="/iconos/iniciosesiongoole.png" 
                  alt="Iniciar con Google" 
                  width={20} 
                  height={20}
                />
                Iniciar sesión con Google
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    className="auth-input"
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <button
                    type="submit"
                    className="auth-btn auth-btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="auth-loading"></span>
                        Enviando...
                      </>
                    ) : 'Recuperar contraseña'}
                  </button>
                </div>
              </form>
              
              <div className="auth-divider">o</div>
              
              <button 
                onClick={handleGoogleLogin}
                className="google-btn"
                disabled={isLoading}
              >
                <Image 
                  src="/iconos/iniciosesiongoole.png" 
                  alt="Iniciar con Google" 
                  width={20} 
                  height={20}
                />
                Iniciar sesión con Google
              </button>
            </>
          )}
          
          <div className="form-help">
            <Link href="/login" className="flex items-center justify-center text-primary">
              <i className="fas fa-arrow-left mr-2"></i>
              Volver a iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;