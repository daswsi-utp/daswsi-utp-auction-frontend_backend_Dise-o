'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../notifications/notifications.css';

const Notificaciones = ({ notificationSettings }) => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        // Simulación de carga desde API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockNotifications = [
          { 
            id: 1, 
            message: 'Nueva puja en tu subasta del Reloj Vintage', 
            date: '10/04/2023 14:30', 
            type: 'bid', 
            read: false,
            relatedItem: 'Reloj Vintage'
          },
          { 
            id: 2, 
            message: 'Subasta finalizada: Pintura al Óleo', 
            date: '09/04/2023 18:45', 
            type: 'auction', 
            read: true,
            relatedItem: 'Pintura al Óleo',
            result: 'Ganaste'
          },
          { 
            id: 3, 
            message: 'Tienes una nueva oferta por tu artículo', 
            date: '08/04/2023 09:15', 
            type: 'offer', 
            read: false,
            relatedItem: 'Colección de Monedas'
          },
          { 
            id: 4, 
            message: 'Pago procesado correctamente por $1,200', 
            date: '07/04/2023 11:20', 
            type: 'payment', 
            read: true,
            amount: '$1,200'
          },
          { 
            id: 5, 
            message: 'Recordatorio: Tu subasta termina en 2 horas', 
            date: '06/04/2023 16:10', 
            type: 'reminder', 
            read: false,
            relatedItem: 'Reloj Vintage'
          },
        ];
        
        // Filtrar según preferencias del usuario
        const filtered = mockNotifications.filter(notif => {
          if (!notificationSettings) return true;
          if (notif.type === 'bid' && !notificationSettings.bidActivity) return false;
          if (notif.type === 'auction' && !notificationSettings.auctionEnding) return false;
          if (notif.type === 'payment' && !notificationSettings.payment) return false;
          if (notif.type === 'reminder' && !notificationSettings.push) return false;
          return true;
        });

        setNotifications(filtered);
      } catch (error) {
        console.error('Error cargando notificaciones:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications();
  }, [notificationSettings]);

  const toggleReadStatus = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? {...notif, read: !notif.read} : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({
      ...notif,
      read: true
    })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    if (selectedNotification && selectedNotification.id === id) {
      setSelectedNotification(null);
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(notif => notif.type === filter);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="header-top-row">
          <button 
            onClick={() => router.push('/')}
            className="back-to-dashboard"
            title="Volver al panel principal"
          >
            <i className="fas fa-arrow-left"></i> Volver
          </button>
          
          <h2>
            <i className="fas fa-bell"></i> Notificaciones
            {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
          </h2>
        </div>
        
        <div className="notifications-actions">
          <button 
            onClick={markAllAsRead}
            className="mark-all-read"
            disabled={unreadCount === 0}
          >
            <i className="fas fa-check-double"></i> Marcar todas como leídas
          </button>
          
          <div className="notifications-filter">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todas</option>
              <option value="bid">Pujas</option>
              <option value="auction">Subastas</option>
              <option value="offer">Ofertas</option>
              <option value="payment">Pagos</option>
              <option value="reminder">Recordatorios</option>
            </select>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading-notifications">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Cargando notificaciones...</p>
        </div>
      ) : (
        <div className="notifications-list">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                data-type={notification.type}
                onClick={() => setSelectedNotification(notification)}
              >
                <div className="notification-icon">
                  {notification.type === 'bid' && <i className="fas fa-gavel"></i>}
                  {notification.type === 'auction' && <i className="fas fa-hourglass-end"></i>}
                  {notification.type === 'offer' && <i className="fas fa-handshake"></i>}
                  {notification.type === 'payment' && <i className="fas fa-credit-card"></i>}
                  {notification.type === 'reminder' && <i className="fas fa-clock"></i>}
                </div>
                
                <div className="notification-content">
                  <div className="notification-message">
                    {notification.message}
                    {notification.result && (
                      <span className={`notification-result ${notification.result.toLowerCase()}`}>
                        {notification.result}
                      </span>
                    )}
                  </div>
                  
                  <div className="notification-meta">
                    <span className="notification-date">
                      <i className="far fa-clock"></i> {notification.date}
                    </span>
                    {notification.relatedItem && (
                      <span className="notification-related">
                        <i className="fas fa-tag"></i> {notification.relatedItem}
                      </span>
                    )}
                    {notification.amount && (
                      <span className="notification-amount">
                        <i className="fas fa-dollar-sign"></i> {notification.amount}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="notification-actions">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleReadStatus(notification.id);
                    }}
                    className={`toggle-read-btn ${notification.read ? 'mark-unread' : 'mark-read'}`}
                    title={notification.read ? 'Marcar como no leída' : 'Marcar como leída'}
                  >
                    <i className={notification.read ? 'far fa-envelope' : 'far fa-envelope-open'}></i>
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="delete-btn"
                    title="Eliminar notificación"
                  >
                    <i className="far fa-trash-alt"></i>
                  </button>
                </div>
                
                {!notification.read && <div className="unread-badge"></div>}
              </div>
            ))
          ) : (
            <div className="empty-notifications">
              <i className="far fa-bell-slash"></i>
              <p>No hay notificaciones para mostrar</p>
              <p className="empty-subtext">
                {filter === 'all' 
                  ? 'No tienes ninguna notificación'
                  : `No tienes notificaciones de tipo ${filter}`}
              </p>
            </div>
          )}
        </div>
      )}

      {selectedNotification && (
        <MostrarMensaje
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
          onToggleRead={toggleReadStatus}
          onDelete={deleteNotification}
        />
      )}
    </div>
  );
};

const MostrarMensaje = ({ notification, onClose, onToggleRead, onDelete }) => {
  const router = useRouter();

  const handleAction = (action) => {
    switch(action) {
      case 'view-item':
        router.push(`/items/${notification.relatedItem?.toLowerCase().replace(/ /g, '-')}`);
        break;
      case 'view-payment':
        router.push('/payments');
        break;
      default:
        break;
    }
    onClose();
  };

  return (
    <div className="notification-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      
      <div className="modal-content" data-type={notification.type}>
        <div className="modal-header">
          <div className="notification-icon">
            {notification.type === 'bid' && <i className="fas fa-gavel"></i>}
            {notification.type === 'auction' && <i className="fas fa-hourglass-end"></i>}
            {notification.type === 'offer' && <i className="fas fa-handshake"></i>}
            {notification.type === 'payment' && <i className="fas fa-credit-card"></i>}
            {notification.type === 'reminder' && <i className="fas fa-clock"></i>}
          </div>
          
          <h3>{notification.message}</h3>
          
          <button onClick={onClose} className="close-modal">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-body">
          <div className="notification-details">
            <div className="detail-row">
              <span className="detail-label">Fecha:</span>
              <span className="detail-value">{notification.date}</span>
            </div>
            
            {notification.relatedItem && (
              <div className="detail-row">
                <span className="detail-label">Artículo:</span>
                <span className="detail-value">{notification.relatedItem}</span>
              </div>
            )}
            
            {notification.amount && (
              <div className="detail-row">
                <span className="detail-label">Monto:</span>
                <span className="detail-value">{notification.amount}</span>
              </div>
            )}
            
            {notification.result && (
              <div className="detail-row">
                <span className="detail-label">Resultado:</span>
                <span className={`detail-value ${notification.result.toLowerCase()}`}>
                  {notification.result}
                </span>
              </div>
            )}
          </div>
          
          <div className="action-buttons">
            {notification.type === 'bid' && (
              <button 
                onClick={() => handleAction('view-item')}
                className="action-btn view-item"
              >
                <i className="fas fa-eye"></i> Ver artículo
              </button>
            )}
            
            {notification.type === 'auction' && notification.result && (
              <button 
                onClick={() => handleAction('view-item')}
                className="action-btn view-item"
              >
                <i className="fas fa-gavel"></i> Ver resultados
              </button>
            )}
            
            {notification.type === 'payment' && (
              <button 
                onClick={() => handleAction('view-payment')}
                className="action-btn view-payment"
              >
                <i className="fas fa-receipt"></i> Ver recibo
              </button>
            )}
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            onClick={() => onToggleRead(notification.id)}
            className={`footer-btn ${notification.read ? 'mark-unread' : 'mark-read'}`}
          >
            <i className={notification.read ? 'far fa-envelope' : 'far fa-envelope-open'}></i>
            {notification.read ? 'Marcar como no leída' : 'Marcar como leída'}
          </button>
          
          <button 
            onClick={() => onDelete(notification.id)}
            className="footer-btn delete"
          >
            <i className="far fa-trash-alt"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notificaciones;