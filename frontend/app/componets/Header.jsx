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
            {/* Reemplazamos el icono FontAwesome por tu imagen */}
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
          {/* Logo que redirige al home */}
          <Link href="/" className="logo-link">
            <i className="fas fa-gavel"></i> SubastaYa
          </Link>
        </div>
        <div className="nav-tabs">
          {/* Botón de inicio que redirige al home */}
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