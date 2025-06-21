// app/login/register/page.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import '../../styles/login.css'; // Importa el archivo CSS

function Register() {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-logo">
          <i className="fas fa-user-plus text-5xl text-indigo-600"></i>
        </div>
        <h1 className="auth-title text-2xl">Crear una cuenta</h1>
        <p className="auth-subtitle">Únete a nuestra plataforma de subastas</p>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="register-name" className="block mb-2 font-medium">Nombre completo</label>
          <input type="text" id="register-name" className="auth-input" placeholder="Ingresa tu nombre y apellidos" />
        </div>
        <div className="form-group">
          <label htmlFor="register-email" className="block mb-2 font-medium">Correo electrónico</label>
          <input type="email" id="register-email" className="auth-input" placeholder="Usarás este correo para iniciar sesión" />
        </div>
        <div className="form-group">
          <label htmlFor="register-password" className="block mb-2 font-medium">Contraseña</label>
          <input type="password" id="register-password" className="auth-input" placeholder="Mínimo 8 caracteres, incluyendo letras y números" />
        </div>
        <div className="form-group">
          <label htmlFor="register-confirm-password" className="block mb-2 font-medium">Confirmar contraseña</label>
          <input type="password" id="register-confirm-password" className="auth-input" placeholder="Confirma tu contraseña" />
        </div>
        <div className="form-group">
          <label htmlFor="register-phone" className="block mb-2 font-medium">Número de teléfono</label>
          <input type="tel" id="register-phone" className="auth-input" placeholder="Tu número de teléfono" />
        </div>
        <div className="form-group">
          <label htmlFor="register-address" className="block mb-2 font-medium">Dirección</label>
          <input type="text" id="register-address" className="auth-input" placeholder="Tu dirección completa" />
        </div>
        <div className="form-group">
          <label htmlFor="register-country" className="block mb-2 font-medium">País</label>
          <select id="register-country" className="auth-input">
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
          <label htmlFor="register-zipcode" className="block mb-2 font-medium">Código postal</label>
          <input type="text" id="register-zipcode" className="auth-input" placeholder="Tu código postal" />
        </div>
        <div className="form-group">
          <button type="submit" className="auth-btn auth-btn-primary w-full">Registrarse</button>
        </div>
      </form>
      <div className="form-help">
        ¿Ya tienes una cuenta? <Link href="/login">Inicia sesión aquí</Link>
      </div>
    </div>
  );
}

export default Register;
