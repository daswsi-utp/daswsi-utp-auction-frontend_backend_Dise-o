'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../styles/login1.css';

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    country: '',
    zipcode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleRegister = () => {
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
              alt="Registro e inicio de sesión" 
              width={500} 
              height={500}
              className="auth-hero-image"
              priority
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">Únete a nuestra comunidad</h2>
            <p className="text-gray-600 mt-2">Regístrate para acceder a subastas exclusivas</p>
            
            <div className="benefits-container mt-6">
              <h3 className="benefits-title">Ventajas de registrarte</h3>
              <ul className="benefits-list">
                <li>Acceso a subastas premium</li>
                <li>Ofertas exclusivas para miembros</li>
                <li>Historial de tus pujas</li>
                <li>Alertas personalizadas</li>
                <li>Soporte prioritario 24/7</li>
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
                width={80} 
                height={80}
              />
            </div>
            <h1 className="auth-title">Crear una cuenta</h1>
            <p className="auth-subtitle">Completa el formulario para registrarte</p>
          </div>
          
          <button 
            onClick={handleGoogleRegister}
            className="google-btn"
            disabled={isLoading}
          >
            <Image 
              src="/iconos/iniciosesiongoole.png" 
              alt="Registrarse con Google" 
              width={20} 
              height={20}
            />
            Registrarse con Google
          </button>
          
          <div className="auth-divider">o</div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input
                type="text"
                id="name"
                name="name"
                className="auth-input"
                placeholder="Ingresa tu nombre y apellidos"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="auth-input"
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="auth-input"
                  placeholder="Repite tu contraseña"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Número de teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="auth-input"
                placeholder="Ej: +52 55 1234 5678"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="address"
                name="address"
                className="auth-input"
                placeholder="Calle, número, colonia"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="country">País</label>
                <select
                  id="country"
                  name="country"
                  className="auth-input"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona un país</option>
                  <option value="AR">Argentina</option>
                  <option value="BO">Bolivia</option>
                  <option value="CL">Chile</option>
                  <option value="CO">Colombia</option>
                  <option value="CR">Costa Rica</option>
                  <option value="CU">Cuba</option>
                  <option value="DO">República Dominicana</option>
                  <option value="EC">Ecuador</option>
                  <option value="SV">El Salvador</option>
                  <option value="GT">Guatemala</option>
                  <option value="HN">Honduras</option>
                  <option value="MX">México</option>
                  <option value="NI">Nicaragua</option>
                  <option value="PA">Panamá</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Perú</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="ES">España</option>
                  <option value="UY">Uruguay</option>
                  <option value="VE">Venezuela</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="zipcode">Código postal</label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  className="auth-input"
                  placeholder="Ej: 11520"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="checkbox-container mt-4">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                Acepto los <Link href="/terms" className="text-primary hover:underline">Términos y Condiciones</Link> y la <Link href="/privacy" className="text-primary hover:underline">Política de Privacidad</Link>
              </label>
            </div>
            
            <div className="form-group mt-6">
              <button
                type="submit"
                className="auth-btn auth-btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="auth-loading"></span>
                    Creando cuenta...
                  </>
                ) : 'Registrarse'}
              </button>
            </div>
          </form>
          
          <div className="form-help">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-medium">
              Inicia sesión aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;