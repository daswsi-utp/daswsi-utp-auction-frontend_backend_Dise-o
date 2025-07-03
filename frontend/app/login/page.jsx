// app/login/page.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '../Services/authService';
import { setAuthToken } from '../utils/auth';
import '../styles/login1.css';

function Login() {
  const [screen, setScreen] = useState('welcome');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for OAuth errors or session expiration
  React.useEffect(() => {
    const oauthError = searchParams.get('error');
    const sessionExpired = searchParams.get('sessionExpired');
    
    if (oauthError) {
      setError('Error al autenticar con Google. Inténtalo de nuevo.');
    }
    
    if (sessionExpired) {
      setError('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
    }
  }, [searchParams]);

  const showScreen = (screenName) => {
    setScreen(screenName);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await login(formData);
      setAuthToken(response.token);
      router.push('/');
    } catch (err) {
      // El error ya viene formateado desde el interceptor de Axios
      setError(err.message || 'Error desconocido al iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Asegúrate de que NEXT_PUBLIC_API_BASE_URL apunte al Gateway (http://localhost:8080)
    // y que el path sea /oauth2/authorize/google
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorize/google`;
  };

  return (
    <div className="auth-container">
      <div className="auth-split-container">
        {/* Sección de la imagen */}
        <div className="auth-hero-section">
          <div className="auth-image-container">
            <Image 
              src="/iconos/registroiniciarsesion.png" 
              alt="Registro e inicio de sesión" 
              width={500} 
              height={500}
              className="auth-hero-image"
              priority
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">Plataforma de Subastas Premium</h2>
            <p className="text-gray-600 mt-2">Descubre artículos exclusivos y haz tus ofertas con seguridad</p>
            
            <div className="benefits-container mt-6">
              <h3 className="benefits-title">Beneficios de registrarte</h3>
              <ul className="benefits-list">
                <li>Acceso a subastas exclusivas</li>
                <li>Ofertas especiales para miembros</li>
                <li>Soporte prioritario</li>
                <li>Alertas personalizadas</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sección del formulario */}
        {screen === 'welcome' && (
          <div id="welcome-screen" className="auth-card screen active">
            <div className="auth-header">
              <div className="auth-logo">
                <Image 
                  src="/iconos/iniciosesiongoole.png" 
                  alt="Logo de subastas" 
                  width={80} 
                  height={80}
                  priority
                />
              </div>
              <h1 className="auth-title">Bienvenido a Subastas</h1>
              <p className="auth-subtitle">Accede para descubrir las mejores ofertas</p>
            </div>
            
            {error && <div className="auth-error">{error}</div>}
            
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3 className="step-title">Inicia sesión fácilmente</h3>
                  <p className="step-description">
                    Usa tu correo o inicia con Google en un solo clic
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3 className="step-title">Explora las subastas</h3>
                  <p className="step-description">
                    Descubre artículos únicos y haz tus ofertas
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3 className="step-title">Gana y disfruta</h3>
                  <p className="step-description">
                    Consigue los mejores productos al mejor precio
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => showScreen('login')}
              className="auth-btn auth-btn-primary"
            >
              <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
            </button>
            
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
              Continuar con Google
            </button>
            
            <div className="form-help">
              ¿No tienes cuenta?{' '}
              <Link href="/login/register" className="font-medium">
                Regístrate aquí
              </Link>
            </div>
          </div>
        )}

        {screen === 'login' && (
          <div id="login-screen" className="auth-card screen active">
            <div className="auth-header">
              <div className="auth-logo">
                <Image 
                  src="/iconos/iniciosesiongoole.png" 
                  alt="Logo de subastas" 
                  width={60} 
                  height={60}
                />
              </div>
              <h1 className="auth-title">Iniciar Sesión</h1>
              <p className="auth-subtitle">Ingresa tus credenciales para continuar</p>
            </div>
            
            {error && <div className="auth-error">{error}</div>}
            
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">
                  Correo electrónico
                  <span className="tooltip">
                    <i className="fas fa-info-circle"></i>
                    <span className="tooltip-text">Ingresa el correo con el que te registraste</span>
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="auth-input"
                  placeholder="tucorreo@ejemplo.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">
                  Contraseña
                  <span className="tooltip">
                    <i className="fas fa-info-circle"></i>
                    <span className="tooltip-text">Debe tener al menos 8 caracteres</span>
                  </span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="auth-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div className="checkbox-container">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Recordarme</label>
                </div>
                
                <Link href="/login/forgot-password" className="text-sm text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              
              <button 
                type="submit" 
                className="auth-btn auth-btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="auth-loading"></span>
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i> Iniciar sesión
                  </>
                )}
              </button>
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
              Continuar con Google
            </button>
            
            <div className="form-help">
              ¿No tienes una cuenta?{' '}
              <Link href="/login/register" className="font-medium">
                Regístrate aquí
              </Link>
            </div>
            
            <button 
              onClick={() => showScreen('welcome')} 
              className="mt-4 text-sm text-gray-500 hover:text-primary transition-colors flex items-center justify-center"
            >
              <i className="fas fa-arrow-left mr-2"></i> Volver al inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;