'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../componets/Header'; // Importamos el componente Header
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
    registrationDate: '15/03/2023',
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
    push: true,
    sms: false,
    bidActivity: true,
    auctionEnding: true,
    promotions: false
  });
  const [reputationData] = useState({
    rating: 4.8,
    reviews: [
      {
        id: 1,
        user: 'María González',
        rating: 5,
        comment: 'Excelente comprador, pago rápido y buena comunicación.',
        date: '15/05/2023',
        auction: 'Reloj Vintage'
      }
    ]
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Funciones de placeholder
  const handleEditClick = () => setIsEditing(!isEditing);
  const handleSaveClick = () => setIsEditing(false);
  const handleCancelClick = () => setIsEditing(false);
  const handleTabChange = (tab) => setActiveTab(tab);
  const handleDeleteClick = () => alert('Eliminar cuenta - Esta funcionalidad se conectará al backend');
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

  return (
    <div className="dashboard">
      <Header /> {/* Agregamos el componente Header aquí */}

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
            <p className="profile-member-since">Miembro desde {userData.registrationDate}</p>
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
            <div className="stat-item">
              <div className="stat-number">4.8</div>
              <div className="stat-title">Rating</div>
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
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <div>
                      <div className="info-label">Miembro desde</div>
                      <div className="info-value">{userData.registrationDate}</div>
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
                
                <div className="setting-card">
                  <div className="setting-icon">
                    <i className="fas fa-bell"></i>
                  </div>
                  <h3 className="setting-title">Notificaciones</h3>
                  <p className="setting-description">Personaliza cómo recibes notificaciones</p>
                  
                  <div className="notification-settings">
                    <div className="notification-group">
                      <h4>Métodos de notificación</h4>
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
                            name="sms" 
                            checked={notificationSettings.sms} 
                            onChange={handleNotificationChange} 
                          />
                          <span className="slider round"></span>
                        </label>
                        <span>Mensajes SMS</span>
                      </div>
                    </div>
                    
                    <div className="notification-group">
                      <h4>Tipos de notificación</h4>
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
                            name="promotions" 
                            checked={notificationSettings.promotions} 
                            onChange={handleNotificationChange} 
                          />
                          <span className="slider round"></span>
                        </label>
                        <span>Promociones y ofertas</span>
                      </div>
                    </div>
                    
                    <button className="save-notifications-btn" onClick={handleNotificationChange}>
                      <i className="fas fa-save"></i> Guardar Configuración
                    </button>
                  </div>
                </div>
                
                <div className="setting-card">
                  <div className="setting-icon">
                    <i className="fas fa-star"></i>
                  </div>
                  <h3 className="setting-title">Reputación</h3>
                  <p className="setting-description">Revisa tus valoraciones y comentarios</p>
                  
                  <div className="reputation-summary">
                    <div className="rating-display">
                      <div className="rating-value">{reputationData.rating}</div>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`fas fa-star ${i < Math.floor(reputationData.rating) ? 'filled' : ''}`}
                          ></i>
                        ))}
                      </div>
                      <div className="rating-count">{reputationData.reviews.length} valoraciones</div>
                    </div>
                    
                    <div className="reviews-list">
                      {reputationData.reviews.map(review => (
                        <div key={review.id} className="review-item">
                          <div className="review-header">
                            <div className="review-user">{review.user}</div>
                            <div className="review-rating">
                              {[...Array(5)].map((_, i) => (
                                <i 
                                  key={i} 
                                  className={`fas fa-star ${i < review.rating ? 'filled' : ''}`}
                                ></i>
                              ))}
                            </div>
                            <div className="review-date">{review.date}</div>
                          </div>
                          <div className="review-auction">Subasta: {review.auction}</div>
                          <div className="review-comment">{review.comment}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="setting-card danger">
                  <div className="setting-icon">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <h3 className="setting-title">Eliminar Cuenta</h3>
                  <p className="setting-description">Elimina permanentemente tu cuenta</p>
                  
                  <button 
                    className="delete-account-btn"
                    onClick={() => setDeleteModalOpen(true)}
                  >
                    <i className="fas fa-trash-alt"></i> Eliminar Cuenta
                  </button>
                  
                  {deleteModalOpen && (
                    <div className="delete-modal-overlay">
                      <div className="delete-modal">
                        <h3>¿Estás seguro de eliminar tu cuenta?</h3>
                        <p>Esta acción es irreversible. Todos tus datos, subastas e historial serán eliminados permanentemente.</p>
                        
                        <div className="delete-confirmation">
                          <label>
                            Escribe <strong>"ELIMINAR"</strong> para confirmar:
                          </label>
                          <input
                            type="text"
                            placeholder="ELIMINAR"
                          />
                        </div>
                        
                        <div className="modal-actions">
                          <button 
                            className="cancel-delete-btn"
                            onClick={() => setDeleteModalOpen(false)}
                          >
                            Cancelar
                          </button>
                          <button 
                            className="confirm-delete-btn"
                            onClick={handleDeleteClick}
                          >
                            Eliminar Permanentemente
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;