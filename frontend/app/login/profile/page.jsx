'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import '../profile/profile.css';

function Profile() {
  // Estados para los datos del usuario
  const [userData] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+5491123456789',
    address: 'Calle Falsa 123',
    country: 'AR',
    zipcode: 'C1425',
    profileImage: '/default-profile.jpg'
  });

  // Estados para el historial de subastas
  const [auctionHistory] = useState([
    { id: 1, item: 'Reloj Vintage', date: '10/04/2023', status: 'Ganada', price: '$1,200', image: '/auction1.jpg' },
    { id: 2, item: 'Pintura al Óleo', date: '22/05/2023', status: 'Perdida', price: '$850', image: '/auction2.jpg' },
    { id: 3, item: 'Colección de Monedas', date: '05/06/2023', status: 'Activa', price: '$1,750', image: '/auction3.jpg' },
  ]);

  // Estados para la interfaz
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [notificationSettings] = useState({
    email: true,
    bidActivity: true,
    auctionEnding: true
  });

  // Estados para métodos de pago
  const [paymentMethods, setPaymentMethods] = useState([
    {
      type: 'credit_card',
      cardNumber: '4242424242424242',
      cardName: 'Juan Pérez',
      expiryDate: '12/25',
      cvv: '123',
      isDefault: true
    }
  ]);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'credit_card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    isDefault: false
  });

  // Funciones para métodos de pago
  const handleAddPaymentMethod = () => {
    // Validación básica
    if (!newPaymentMethod.cardNumber || !newPaymentMethod.cardName || !newPaymentMethod.expiryDate || !newPaymentMethod.cvv) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Si es el primer método, lo establece como predeterminado
    const isFirstMethod = paymentMethods.length === 0;
    const methodToAdd = {
      ...newPaymentMethod,
      isDefault: isFirstMethod || newPaymentMethod.isDefault
    };

    // Si se marca como predeterminado, quita el predeterminado anterior
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

    // Si se eliminó el método predeterminado y hay otros métodos, establecer el primero como predeterminado
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

  // Funciones de placeholder (sin lógica real)
  const handleEditClick = () => setIsEditing(!isEditing);
  const handleSaveClick = () => setIsEditing(false);
  const handleCancelClick = () => setIsEditing(false);
  const handleTabChange = (tab) => setActiveTab(tab);
  const handleNotificationChange = () => alert('Configuración de notificaciones cambiada');
  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    alert('Configuración de seguridad guardada - Se conectará al backend');
  };

  // Función para obtener el nombre del país
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

  // Función para formatear el número de tarjeta
  const formatCardNumber = (number) => {
    if (!number) return '**** **** **** ****';
    const lastFour = number.slice(-4);
    return `**** **** **** ${lastFour}`;
  };

  return (
    <div className="profile-container">
      {/* Encabezado del perfil */}
      <div className="profile-header">
        <div className="profile-avatar-container">
          <div className="profile-avatar-wrapper">
            <img 
              src={userData.profileImage} 
              alt="Foto de perfil" 
              className="profile-avatar"
            />
            {isEditing && (
              <label className="avatar-upload-label">
                <i className="fas fa-camera"></i>
                <input 
                  type="file" 
                  className="hidden"
                />
              </label>
            )}
          </div>
          <h1 className="profile-name">{userData.name}</h1>
        </div>
        
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-number">12</div>
            <div className="stat-title">Subastas</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5</div>
            <div className="stat-title">Ganadas</div>
          </div>
        </div>
      </div>

      {/* Pestañas de navegación */}
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => handleTabChange('info')}
        >
          <i className="fas fa-user"></i> Información
        </button>
        <button 
          className={`tab-btn ${activeTab === 'auctions' ? 'active' : ''}`}
          onClick={() => handleTabChange('auctions')}
        >
          <i className="fas fa-gavel"></i> Subastas
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => handleTabChange('settings')}
        >
          <i className="fas fa-cog"></i> Configuración
        </button>
      </div>

      {/* Contenido de las pestañas */}
      <div className="tab-content">
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
                      defaultValue={userData.name}
                    />
                  </div>
                  <div className="form-group">
                    <label>Correo electrónico</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={userData.email}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={userData.phone}
                    />
                  </div>
                  <div className="form-group">
                    <label>Dirección</label>
                    <input
                      type="text"
                      name="address"
                      defaultValue={userData.address}
                    />
                  </div>
                  <div className="form-group">
                    <label>País</label>
                    <select
                      name="country"
                      defaultValue={userData.country}
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
                      defaultValue={userData.zipcode}
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
            
            {auctionHistory.length > 0 ? (
              <div className="auctions-grid">
                {auctionHistory.map(auction => (
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
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="newPassword">Nueva contraseña</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      placeholder="Ingresa tu nueva contraseña"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar nueva contraseña</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirma tu nueva contraseña"
                    />
                  </div>
                  
                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="twoFactorAuth"
                      name="twoFactorAuth"
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
                  </div>
                  
                  <button className="save-notifications-btn" onClick={handleNotificationChange}>
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