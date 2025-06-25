'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../app/componets/Header';
import '../app/styles/global.css';
import DetalleArticle from './detail-article/page';

export default function Homepage() {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    {
      title: 'Smartphone Premium 256GB',
      subtitle: 'Último Modelo',
      imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/12/30/phone-1869510_960_720.jpg',
      price: '1799.00',
      bids: 5,
      description: 'Este es un smartphone de última generación, con 256GB de almacenamiento y una cámara increíble.',
    },
    {
      title: 'Tablet Android 10"',
      subtitle: 'Perfecta para Estudiantes',
      imageUrl: 'https://cdn.pixabay.com/photo/2016/03/27/19/43/samsung-1283938_960_720.jpg',
      price: '650.00',
      bids: 5,
      description: 'Una tablet Android de 10", ideal para estudiar y entretenimiento.',
    },
  ];

  return (
    <div className="dashboard">
      <Header />

      <div className="quick-filters">
        <button className="filter-btn active">Todos</button>
        <button className="filter-btn">Electrónica</button>
        <button className="filter-btn">Arte</button>
        <button className="filter-btn">Coleccionables</button>
        <button className="filter-btn">Vehículos</button>
        <button className="filter-btn">Inmuebles</button>
        <button className="filter-btn">Moda</button>
      </div>

      <main className="main-content">
        <section className="auction-section">
          <div className="section-header">
            <h2>Subastas Destacadas</h2>
            <button className="see-all">Ver todo</button>
          </div>
          
          <div className="auctions-grid">
            <div className="auction-card" onClick={() => setSelectedItem(items[0])}>
              <div className="auction-badge">Destacado</div>
              <img src="https://cdn.pixabay.com/photo/2016/11/29/12/30/phone-1869510_960_720.jpg" alt="Smartphone" />
              <div className="auction-info">
                <h3>Smartphone Premium 256GB</h3>
                <p className="subtitle">Último Modelo</p>
                <div className="price-section">
                  <span className="price">S/ 1,799.00</span>
                  <span className="bids">5 pujas</span>
                </div>
                <div className="auction-footer">
                  <span className="seller"><i className="fas fa-user"></i> TechSeller123</span>
                  <span className="time"><i className="fas fa-clock"></i> 4h 23m</span>
                </div>
              </div>
            </div>

            <div className="auction-card" onClick={() => setSelectedItem(items[1])}>
              <img src="https://cdn.pixabay.com/photo/2016/03/27/19/43/samsung-1283938_960_720.jpg" alt="Tablet" />
              <div className="auction-info">
                <h3>Tablet Android 10"</h3>
                <p className="subtitle">Perfecta para Estudiantes</p>
                <div className="price-section">
                  <span className="price">S/ 650.00</span>
                  <span className="bids">5 pujas</span>
                </div>
                <div className="auction-footer">
                  <span className="seller"><i className="fas fa-user"></i> ElectroDeals</span>
                  <span className="time"><i className="fas fa-clock"></i> 1d 12h</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="auction-section">
          <div className="section-header">
            <h2>Finalizando Pronto</h2>
            <button className="see-all">Ver todo</button>
          </div>
          
          <div className="auctions-grid">
            <div className="auction-card">
              <img src="https://cdn.pixabay.com/photo/2018/01/28/21/14/lens-3114729_960_720.jpg" alt="Lente" />
              <div className="auction-info">
                <h3>Lente Profesional 50mm</h3>
                <p className="subtitle">f/1.4 para Cámaras DSLR</p>
                <div className="price-section">
                  <span className="price">S/ 1,250.00</span>
                  <span className="bids">5 pujas</span>
                </div>
                <div className="auction-footer">
                  <span className="seller"><i className="fas fa-user"></i> FotoExperto</span>
                  <span className="time ending-soon"><i className="fas fa-clock"></i> 35m</span>
                </div>
              </div>
            </div>

            <div className="auction-card">
              <img src="https://cdn.pixabay.com/photo/2016/03/27/07/12/apple-watch-1282242_960_720.jpg" alt="Smartwatch" />
              <div className="auction-info">
                <h3>Smartwatch Multifunción</h3>
                <p className="subtitle">Con Seguimiento de Actividad</p>
                <div className="price-section">
                  <span className="price">S/ 450.00</span>
                  <span className="bids">5 pujas</span>
                </div>
                <div className="auction-footer">
                  <span className="seller"><i className="fas fa-user"></i> WearableTech</span>
                  <span className="time ending-soon"><i className="fas fa-clock"></i> 18m</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="auction-section">
          <div className="section-header">
            <h2>Subastas Recientes</h2>
            <button className="see-all">Ver todo</button>
          </div>

          <div className="auctions-grid">
            {items.map((item, index) => (
              <div key={index} className="auction-card" onClick={() => setSelectedItem(item)}>
                <div className="auction-badge">Nuevo</div>
                <img src={item.imageUrl} alt={item.title} />
                <div className="auction-info">
                  <h3>{item.title}</h3>
                  <p className="subtitle">{item.subtitle}</p>
                  <div className="price-section">
                    <span className="price">S/ {item.price}</span>
                    <span className="bids">{item.bids} pujas</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {selectedItem && (
        <DetalleArticle 
          item={selectedItem} 
          isOpen={Boolean(selectedItem)} 
          toggleDetails={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
}