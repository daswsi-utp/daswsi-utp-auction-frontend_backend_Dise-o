'use client';

import Link from 'next/link';
import Image from 'next/image';
import '../styles/header.css';
import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filters = ['Todos', 'Electrónica', 'Arte', 'Coleccionables', 'Vehículos', 'Inmuebles', 'Moda'];

  return (
    <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          
          <div className={`search-box ${searchFocused ? 'focused' : ''}`}>
            <Image 
              src="/iconos/icobuscar.png" 
              alt="Buscar"
              width={18}
              height={18}
              className="search-icon"
            />
            <input 
              type="text" 
              placeholder="Buscar subastas..." 
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <button className="search-button">
              Buscar
            </button>
          </div>
        </div>
        <div className="top-bar-right">
          <Link href="/notifications">
            <button className="notifications">
              <Image 
                src="/iconos/iconotifiacaiones.png" 
                alt="Notificaciones"
                width={24} 
                height={24}
              />
              <span className="badge pulse">5</span>
            </button>
          </Link>
          <Link href="/login/profile">
            <button className="user-avatar">
              <Image 
                src="/iconos/hombreperfil.png" 
                alt="Perfil"
                width={36}
                height={36}
                className="avatar-image"
              />
            </button>
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="main-nav">
        <div className="nav-brand">
          <Link href="/" className="logo-link">
            <Image 
              src="/iconos/logo-SUBASTA.png" 
              alt="SubastaYa"
              width={180}
              height={50}
              className="logo-image"
            />
          </Link>
        </div>
        <div className="nav-tabs">
          <Link href="/" className="nav-item active">
            <Image 
              src="/iconos/icoinicio.png" 
              alt="Inicio"
              width={20}
              height={20}
            />
            <span>Inicio</span>
          </Link>
          
          
          <Link href="/create-auction" className="create-auction-btn">
            <Image 
              src="/iconos/icocrearsubasta.png" 
              alt="Crear subasta"
              width={20}
              height={20}
            />
            <span>Crear Subasta</span>
          </Link>
          <Link href="/favorites" className="nav-item">
            <Image 
              src="/iconos/icofavorito.png" 
              alt="Favoritos"
              width={20}
              height={20}
            />
            <span>Favoritos</span>
          </Link>
        </div>
      </nav>

      {/* Quick Filters */}
      <div className="quick-filters">
        {filters.map(filter => (
          <button 
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </header>
  );
}