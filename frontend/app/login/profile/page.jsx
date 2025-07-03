// app/login/profile/page.jsx
'use client';

import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { getCurrentUser, updateUser } from '../../Services/userService';
// import { getAuthToken, clearAuthToken, isAuthenticated } from '../../utils/auth';
// import Notificaciones from '../../notifications/page';
import '../profile/profile.css';

export default function Profile() {
  // Funcionalidades deshabilitadas para vista estática
  // const [userData, setUserData] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState('');
  // const [activeTab, setActiveTab] = useState('info');
  // const [isEditing, setIsEditing] = useState(false);
  // const [editedData, setEditedData] = useState({});
  // const [notificationSettings, setNotificationSettings] = useState({});
  // const [paymentMethods, setPaymentMethods] = useState([]);
  // const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  // const [newPaymentMethod, setNewPaymentMethod] = useState({});
  // const [securityData, setSecurityData] = useState({});
  // const router = useRouter();

  // useEffect(() => {
  //   // Simular lógica de autenticación y carga de datos deshabilitada
  // }, []);

  // Handlers deshabilitados
  // const handleEditClick = () => {};
  // const handleSaveClick = async () => {};
  // const handleCancelClick = () => {};
  // const handleInputChange = (e) => {};
  // const handleLogout = () => {};
  // const handleAddPaymentMethod = () => {};
  // const handleRemovePaymentMethod = () => {};
  // const setDefaultPaymentMethod = () => {};
  // const handleNotificationChange = () => {};
  // const saveNotificationSettings = async () => {};
  // const handleSecurityChange = () => {};
  // const handleSecuritySubmit = (e) => { e.preventDefault(); };

  // Datos estáticos para render
  const userData = {
    profileImage: '/iconos/perfilusuarios.png',
    name: 'Nombre de Usuario',
    auctionsCount: 0,
    wonAuctionsCount: 0,
    // auctionHistory: []
  };

  return (
    <div className="profile-container">
      {/* Botón de regreso deshabilitado */}
      <button className="back-button" disabled>
        ← Volver al Inicio
      </button>

      {/* Encabezado del perfil */}
      <div className="profile-header">
        <div className="profile-avatar-container">
          <div className="profile-avatar-wrapper">
            <img
              src={userData.profileImage}
              alt="Foto de perfil"
              className="profile-avatar"
            />
          </div>
          <h1 className="profile-name">{userData.name}</h1>
          <button className="logout-btn" disabled>
            Cerrar sesión
          </button>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-number">{userData.auctionsCount}</div>
            <div className="stat-title">Subastas</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{userData.wonAuctionsCount}</div>
            <div className="stat-title">Ganadas</div>
          </div>
        </div>
      </div>

      {/* Pestañas estáticas */}
      <div className="profile-tabs">
        <button className="tab-btn active" disabled>Información</button>
        <button className="tab-btn" disabled>Subastas</button>
        <button className="tab-btn" disabled>Notificaciones</button>
        <button className="tab-btn" disabled>Configuración</button>
      </div>

      {/* Contenido estático */}
      <div className="tab-content">
        {/* Información Personal */}
        <div className="info-content">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon"><i className="fas fa-user"></i></div>
              <div>
                <div className="info-label">Nombre completo</div>
                <div className="info-value">{userData.name}</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><i className="fas fa-envelope"></i></div>
              <div>
                <div className="info-label">Correo electrónico</div>
                <div className="info-value">email@example.com</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><i className="fas fa-phone"></i></div>
              <div>
                <div className="info-label">Teléfono</div>
                <div className="info-value">123-456-7890</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
