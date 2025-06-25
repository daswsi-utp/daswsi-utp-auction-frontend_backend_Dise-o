'use client';

import Link from 'next/link';

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
            <i className="fas fa-bell"></i>
            <span className="badge">5</span>
          </button>
          <button className="user-avatar">
            <i className="fas fa-user-circle"></i>
          </button>
        </div>
      </div>

      <nav className="main-nav">
        <div className="nav-brand">
          <i className="fas fa-gavel"></i> SubastaYa
        </div>
        <div className="nav-tabs">
          <button className="active">
            <i className="fas fa-home"></i> Inicio
          </button>
          <button>
            <i className="fas fa-search"></i> Buscar
          </button>
          <Link href="/create-auction" className="create-auction-btn">
            <i className="fas fa-plus-circle"></i> Crear Subasta
          </Link>
          <button>
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