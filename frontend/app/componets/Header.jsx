'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="app-header">
      <div className="top-bar">
        <div className="top-bar-left">
          <button className="menu-toggle">
            <i className="fas fa-bars"></i>
          </button>
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Buscar subastas..." />
          </div>
        </div>
        <div className="top-bar-right">
          <button className="notifications">
            <Image 
              src="/iconos/iconotifiacaiones.png" 
              alt="Notificaciones"
              width={24} 
              height={24}
            />
            <span className="badge">5</span>
          </button>
          <button className="user-avatar">
            <i className="fas fa-user-circle"></i>
          </button>
        </div>
      </div>

      <nav className="main-nav">
        <div className="nav-brand">
          <Link href="/" className="logo-link">
            <Image 
              src="/iconos/logo-SUBASTA.png" 
              alt="SubastaYa"
              width={150}
              height={40}
              className="logo-image"
            />
          </Link>
        </div>
        <div className="nav-tabs">
          <Link href="/" className="nav-item active">
            <i className="fas fa-home"></i> Inicio
          </Link>
          <button className="nav-item">
            <i className="fas fa-search"></i> Buscar
          </button>
          <Link href="/create-auction" className="create-auction-btn">
            <i className="fas fa-plus-circle"></i> Crear Subasta
          </Link>
          <button className="nav-item">
            <i className="fas fa-heart"></i> Favoritos
          </button>
          <Link href="/login/profile" className="profile-btn">
            <i className="fas fa-user"></i> Perfil
          </Link>
        </div>
      </nav>
    </header>
  );
}