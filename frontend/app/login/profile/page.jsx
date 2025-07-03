//app\login\profile\page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateUser } from '../../Services/userService';
import { getAuthToken, clearAuthToken, isAuthenticated } from '../../utils/auth';
import Notificaciones from '../../notifications/page';
import '../profile/profile.css';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    bidActivity: true,
    auctionEnding: true,
    push: true,
    payment: true
  });
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'credit_card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    isDefault: false
  });
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false
  });
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        setUserData(user);
        setEditedData(user);
        
        // Simular carga de métodos de pago (deberías implementar un servicio real)
        setPaymentMethods(user.paymentMethods || []);
        setNotificationSettings(user.notificationSettings || {
          email: true,
          bidActivity: true,
          auctionEnding: true,
          push: true,
          payment: true
        });
      } catch (err) {
        setError(err.message || 'Error al cargar los datos del usuario');
        if (err.message.includes('No autorizado')) {
          clearAuthToken();
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleSaveClick = async () => {
    try {
      setIsLoading(true);
      const updatedUser = await updateUser(userData.id, editedData);
      setUserData(updatedUser);
      setEditedData(updatedUser);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Error al actualizar los datos del usuario');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    clearAuthToken();
    router.push('/login');
  };

  // Funciones para métodos de pago
  const handleAddPaymentMethod = () => {
    if (!newPaymentMethod.cardNumber || !newPaymentMethod.cardName || !newPaymentMethod.expiryDate || !newPaymentMethod.cvv) {
      setError('Por favor completa todos los campos');
      return;
    }

    const isFirstMethod = paymentMethods.length === 0;
    const methodToAdd = {
      ...newPaymentMethod,
      isDefault: isFirstMethod || newPaymentMethod.isDefault
    };

    const updatedMethods = methodToAdd.isDefault 
      ? paymentMethods.map(method => ({ ...method, isDefault: false }))
      : [...paymentMethods];

    setPaymentMethods([...updatedMethods, methodToAdd]);
    setShowAddPaymentModal(false);
    setNewPaymentMethod({
      type: 'credit_card',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      isDefault: false
    });
  };

  const handleRemovePaymentMethod = (index) => {
    const methodToRemove = paymentMethods[index];
    const updatedMethods = [...paymentMethods];
    updatedMethods.splice(index, 1);

    if (methodToRemove.isDefault && updatedMethods.length > 0) {
      updatedMethods[0].isDefault = true;
    }

    setPaymentMethods(updatedMethods);
  };

  const setDefaultPaymentMethod = (index) => {
    const updatedMethods = paymentMethods.map((method, i) => ({
      ...method,
      isDefault: i === index
    }));
    setPaymentMethods(updatedMethods);
  };

  // Funciones para notificaciones
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const saveNotificationSettings = async () => {
    try {
      // Aquí deberías implementar la llamada real al backend
      console.log('Guardando configuración:', notificationSettings);
      setError('');
      // Simular éxito
      alert('Configuración de notificaciones guardada correctamente');
    } catch (err) {
      setError(err.message || 'Error al guardar la configuración');
    }
  };

  // Funciones para seguridad
  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurityData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    
    if (securityData.newPassword !== securityData.confirmPassword) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }

    try {
      // Aquí deberías implementar la llamada real al backend
      console.log('Datos de seguridad:', securityData);
      setError('');
      // Simular éxito
      alert('Configuración de seguridad actualizada');
      setSecurityData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorAuth: securityData.twoFactorAuth
      });
    } catch (err) {
      setError(err.message || 'Error al actualizar la configuración de seguridad');
    }
  };

  const getCountryName = (code) => {
    const countries = {
      'AR': 'Argentina', 'BO': 'Bolivia', 'CL': 'Chile', 'CO': 'Colombia',
      'CR': 'Costa Rica', 'CU': 'Cuba', 'DO': 'República Dominicana',
      'EC': 'Ecuador', 'SV': 'El Salvador', 'GT': 'Guatemala',
      'HN': 'Honduras', 'MX': 'México', 'NI': 'Nicaragua', 'PA': 'Panamá',
      'PY': 'Paraguay', 'PE': 'Perú', 'PR': 'Puerto Rico', 'ES': 'España',
      'UY': 'Uruguay', 'VE': 'Venezuela'
    };
    return countries[code] || code;
  };

  const formatCardNumber = (number) => {
    if (!number) return '**** **** **** ****';
    const lastFour = number.slice(-4);
    return `**** **** **** ${lastFour}`;
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="error-container">
        {error || 'Usuario no encontrado'}
        <button onClick={() => router.push('/login')} className="auth-btn auth-btn-primary mt-4">
          Volver al login
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Link href="/" className="back-button">
        <i className="fas fa-arrow-left"></i> Volver al Inicio
      </Link>
      
      {/* Encabezado del perfil */}
      <div className="profile-header">
        <div className="profile-avatar-container">
          <div className="profile-avatar-wrapper">
            <img 
              src={userData.profileImage || '/iconos/perfilusuarios.png'} 
              alt="Foto de perfil" 
              className="profile-avatar"
            />
            {isEditing && (
              <label className="avatar-upload-label">
                <i className="fas fa-camera"></i>
                <input 
                  type="file" 
                  className="hidden"
                  onChange={(e) => {
                    // Implementar lógica para subir imagen si es necesario
                  }}
                />
              </label>
            )}
          </div>
          <h1 className="profile-name">{userData.name}</h1>
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Cerrar sesión
          </button>
        </div>
        
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-number">{userData.auctionsCount || 0}</div>
            <div className="stat-title">Subastas</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{userData.wonAuctionsCount || 0}</div>
            <div className="stat-title">Ganadas</div>
          </div>
        </div>
      </div>

      {/* Pestañas de navegación */}
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          <i className="fas fa-user"></i> Información
        </button>
        <button 
          className={`tab-btn ${activeTab === 'auctions' ? 'active' : ''}`}
          onClick={() => setActiveTab('auctions')}
        >
          <i className="fas fa-gavel"></i> Subastas
        </button>
        <button 
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <i className="fas fa-bell"></i> Notificaciones
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <i className="fas fa-cog"></i> Configuración
        </button>
      </div>

      {/* Contenido de las pestañas */}
      <div className="tab-content">
        {error && <div className="profile-error">{error}</div>}
        
        {activeTab === 'info' && (
          <div className="info-content">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-id-card"></i> Información Personal
              </h2>
              {!isEditing && (
                <button 
                  onClick={handleEditClick}
                  className="edit-btn"
                >
                  <i className="fas fa-edit"></i> Editar
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="edit-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Nombre completo</label>
                    <input
                      type="text"
                      name="name"
                      value={editedData.name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Correo electrónico</label>
                    <input
                      type="email"
                      name="email"
                      value={editedData.email || ''}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editedData.phone || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Dirección</label>
                    <input
                      type="text"
                      name="address"
                      value={editedData.address || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>País</label>
                    <select
                      name="country"
                      value={editedData.country || ''}
                      onChange={handleInputChange}
                    >
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
                    <label>Código postal</label>
                    <input
                      type="text"
                      name="zipcode"
                      value={editedData.zipcode || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button onClick={handleSaveClick} className="save-btn">
                    <i className="fas fa-save"></i> Guardar Cambios
                  </button>
                  <button onClick={handleCancelClick} className="cancel-btn">
                    <i className="fas fa-times"></i> Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <div className="info-label">Nombre completo</div>
                    <div className="info-value">{userData.name}</div>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <div className="info-label">Correo electrónico</div>
                    <div className="info-value">{userData.email}</div>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <div className="info-label">Teléfono</div>
                    <div className="info-value">{userData.phone}</div>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <div className="info-label">Dirección</div>
                    <div className="info-value">{userData.address}</div>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-globe-americas"></i>
                  </div>
                  <div>
                    <div className="info-label">País</div>
                    <div className="info-value">{getCountryName(userData.country)}</div>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-mail-bulk"></i>
                  </div>
                  <div>
                    <div className="info-label">Código postal</div>
                    <div className="info-value">{userData.zipcode}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'auctions' && (
          <div className="auctions-content">
            <h2 className="section-title">
              <i className="fas fa-gavel"></i> Historial de Subastas
            </h2>
            
            {userData.auctionHistory && userData.auctionHistory.length > 0 ? (
              <div className="auctions-grid">
                {userData.auctionHistory.map(auction => (
                  <div key={auction.id} className={`auction-card ${auction.status.toLowerCase()}`}>
                    <div className="auction-image" style={{ backgroundImage: `url(${auction.image})` }}></div>
                    <div className="auction-details">
                      <h3 className="auction-title">{auction.item}</h3>
                      <div className="auction-meta">
                        <span className="auction-date">
                          <i className="fas fa-calendar-alt"></i> {auction.date}
                        </span>
                        <span className={`auction-status ${auction.status.toLowerCase()}`}>
                          {auction.status}
                        </span>
                      </div>
                      <div className="auction-price">{auction.price}</div>
                      <button className="auction-action-btn">
                        <i className="fas fa-eye"></i> Ver Detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-gavel empty-icon"></i>
                <h3>No has participado en ninguna subasta aún</h3>
                <p>Explora nuestras subastas activas para comenzar</p>
                <Link href="/auctions" className="explore-btn">
                  Explorar Subastas
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="notifications-content">
            <Notificaciones 
              notificationSettings={notificationSettings} 
              onNotificationChange={handleNotificationChange}
              onSave={saveNotificationSettings}
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-content">
            <h2 className="section-title">
              <i className="fas fa-cog"></i> Configuración y Seguridad
            </h2>
            
            <div className="settings-grid">
              {/* Formulario de Seguridad */}
              <div className="setting-card">
                <div className="setting-icon">
                  <i className="fas fa-lock"></i>
                </div>
                <h3 className="setting-title">Seguridad de la Cuenta</h3>
                <p className="setting-description">Cambia tu contraseña y configura la autenticación</p>
                
                <form onSubmit={handleSecuritySubmit} className="security-form">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Contraseña actual</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      placeholder="Ingresa tu contraseña actual"
                      value={securityData.currentPassword}
                      onChange={handleSecurityChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="newPassword">Nueva contraseña</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      placeholder="Ingresa tu nueva contraseña"
                      value={securityData.newPassword}
                      onChange={handleSecurityChange}
                      required
                      minLength="8"
                    />
                    <small className="form-text">Mínimo 8 caracteres</small>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar nueva contraseña</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirma tu nueva contraseña"
                      value={securityData.confirmPassword}
                      onChange={handleSecurityChange}
                      required
                    />
                  </div>
                  
                  <div className="form-checkbox">
                    <input
                      type="checkbox"
                      id="twoFactorAuth"
                      name="twoFactorAuth"
                      checked={securityData.twoFactorAuth}
                      onChange={handleSecurityChange}
                    />
                    <label htmlFor="twoFactorAuth">Habilitar autenticación de dos factores</label>
                  </div>
                  
                  <button type="submit" className="security-save-btn">
                    <i className="fas fa-save"></i> Guardar Cambios
                  </button>
                </form>
              </div>
              
              {/* Configuración de Notificaciones */}
              <div className="setting-card">
                <div className="setting-icon">
                  <i className="fas fa-bell"></i>
                </div>
                <h3 className="setting-title">Notificaciones</h3>
                <p className="setting-description">Personaliza cómo recibes notificaciones</p>
                
                <div className="notification-settings">
                  <div className="notification-group">
                    <h4>Tipos de notificación</h4>
                    <div className="notification-item">
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          name="email" 
                          checked={notificationSettings.email} 
                          onChange={handleNotificationChange} 
                        />
                        <span className="slider round"></span>
                      </label>
                      <span>Correo electrónico</span>
                    </div>
                    <div className="notification-item">
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          name="bidActivity" 
                          checked={notificationSettings.bidActivity} 
                          onChange={handleNotificationChange} 
                        />
                        <span className="slider round"></span>
                      </label>
                      <span>Actividad en mis pujas</span>
                    </div>
                    <div className="notification-item">
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          name="auctionEnding" 
                          checked={notificationSettings.auctionEnding} 
                          onChange={handleNotificationChange} 
                        />
                        <span className="slider round"></span>
                      </label>
                      <span>Subastas por finalizar</span>
                    </div>
                    <div className="notification-item">
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          name="push" 
                          checked={notificationSettings.push} 
                          onChange={handleNotificationChange} 
                        />
                        <span className="slider round"></span>
                      </label>
                      <span>Notificaciones push</span>
                    </div>
                    <div className="notification-item">
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          name="payment" 
                          checked={notificationSettings.payment} 
                          onChange={handleNotificationChange} 
                        />
                        <span className="slider round"></span>
                      </label>
                      <span>Notificaciones de pago</span>
                    </div>
                  </div>
                  
                  <button 
                    className="save-notifications-btn" 
                    onClick={saveNotificationSettings}
                  >
                    <i className="fas fa-save"></i> Guardar Configuración
                  </button>
                </div>
              </div>

              {/* Sección de Métodos de Pago */}
              <div className="setting-card">
                <div className="setting-icon">
                  <i className="fas fa-credit-card"></i>
                </div>
                <h3 className="setting-title">Métodos de Pago</h3>
                <p className="setting-description">Administra tus métodos de pago para compras y subastas</p>
                
                {paymentMethods.length > 0 ? (
                  <div className="payment-methods-list">
                    {paymentMethods.map((method, index) => (
                      <div key={index} className={`payment-method ${method.isDefault ? 'default' : ''}`}>
                        <div className="method-icon">
                          <i className={`fab fa-${method.type === 'credit_card' ? 'cc-visa' : 'cc-mastercard'}`}></i>
                        </div>
                        <div className="method-details">
                          <div className="method-type">
                            {method.type === 'credit_card' ? 'Tarjeta de crédito' : 'Tarjeta de débito'} 
                            {method.isDefault && <span className="default-badge">Predeterminado</span>}
                          </div>
                          <div className="method-number">{formatCardNumber(method.cardNumber)}</div>
                          <div className="method-name">{method.cardName}</div>
                          <div className="method-expiry">Expira: {method.expiryDate}</div>
                        </div>
                        <div className="method-actions">
                          {!method.isDefault && (
                            <button 
                              onClick={() => setDefaultPaymentMethod(index)}
                              className="set-default-btn"
                            >
                              Establecer predeterminado
                            </button>
                          )}
                          <button 
                            onClick={() => handleRemovePaymentMethod(index)}
                            className="remove-btn"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-payment-methods">
                    <i className="far fa-credit-card empty-icon"></i>
                    <p>No has añadido ningún método de pago</p>
                  </div>
                )}
                
                <button 
                  onClick={() => setShowAddPaymentModal(true)}
                  className="add-payment-btn"
                >
                  <i className="fas fa-plus"></i> Añadir método de pago
                </button>
                
                <div className="payment-security-note">
                  <i className="fas fa-shield-alt"></i>
                  <span>Tu información de pago está protegida. Nos hemos asociado con Stripe, uno de los procesadores de pagos más seguros y de mejor reputación que existen.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal para añadir método de pago */}
      {showAddPaymentModal && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <div className="modal-header">
              <h3>Añadir Método de Pago</h3>
              <button onClick={() => setShowAddPaymentModal(false)} className="close-btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="payment-form">
              <div className="form-group">
                <label>Tipo de tarjeta</label>
                <select 
                  value={newPaymentMethod.type}
                  onChange={(e) => setNewPaymentMethod({...newPaymentMethod, type: e.target.value})}
                >
                  <option value="credit_card">Tarjeta de crédito</option>
                  <option value="debit_card">Tarjeta de débito</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Número de tarjeta</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={newPaymentMethod.cardNumber}
                  onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardNumber: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Nombre en la tarjeta</label>
                <input
                  type="text"
                  placeholder="Juan Pérez"
                  value={newPaymentMethod.cardName}
                  onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardName: e.target.value})}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha de expiración</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={newPaymentMethod.expiryDate}
                    onChange={(e) => setNewPaymentMethod({...newPaymentMethod, expiryDate: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={newPaymentMethod.cvv}
                    onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cvv: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="defaultPayment"
                  checked={newPaymentMethod.isDefault}
                  onChange={(e) => setNewPaymentMethod({...newPaymentMethod, isDefault: e.target.checked})}
                />
                <label htmlFor="defaultPayment">Establecer como método de pago predeterminado</label>
              </div>
              
              <div className="security-note">
                <i className="fas fa-lock"></i>
                <span>Tu información de pago está protegida. Usamos cifrado SSL para mantener tus datos seguros.</span>
              </div>
              
              <div className="form-actions">
                <button onClick={() => setShowAddPaymentModal(false)} className="cancel-btn">
                  Cancelar
                </button>
                <button onClick={handleAddPaymentMethod} className="save-btn">
                  Guardar Tarjeta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;