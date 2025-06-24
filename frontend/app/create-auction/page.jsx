// app/create-auction/page.jsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../create-auction/create-auction.css';

export default function CreateAuctionPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [initialPrice, setInitialPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    const res = await fetch('/api/upload-images', { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Error subiendo imágenes');
    const { urls } = await res.json();
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const imageUrls = images.length ? await uploadImages(images) : [];

      const prodRes = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          category,
          base_price: basePrice,
          images: imageUrls
        })
      });
      if (!prodRes.ok) throw new Error('Error creando producto');
      const product = await prodRes.json();

      const aucRes = await fetch('/api/auctions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          initial_price: initialPrice,
          start_date: startDate,
          end_date: endDate
        })
      });
      if (!aucRes.ok) throw new Error('Error creando subasta');
      const auction = await aucRes.json();

      router.push(`/auctions/${auction.id}`);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      {/* Barra superior con iconos */}
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

        {/* Barra de navegación principal */}
        <nav className="main-nav">
          <div className="nav-brand">
            <i className="fas fa-gavel"></i> SubastaYa
          </div>
          <div className="nav-tabs">
            <button onClick={() => router.push('/')}>
              <i className="fas fa-home"></i> Inicio
            </button>
            <button>
              <i className="fas fa-search"></i> Buscar
            </button>
            <button className="create-auction-btn active">
              <i className="fas fa-plus-circle"></i> Crear Subasta
            </button>
            <button>
              <i className="fas fa-heart"></i> Favoritos
            </button>
            <button>
              <i className="fas fa-user"></i> Perfil
            </button>
          </div>
        </nav>
      </header>

      {/* Contenido principal del formulario */}
      <main className="main-content create-auction-content">
        <div className="auction-form-container">
          <h1 className="auction-form-title">Crear Nueva Subasta</h1>
          {error && <p className="auction-form-error">{error}</p>}
          
          <form onSubmit={handleSubmit} className="auction-form">
            {/* Sección de producto */}
            <div className="form-section">
              <h2>Información del Producto</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label>Nombre del Producto</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-field">
                  <label>Categoría</label>
                  <input 
                    type="text" 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="form-field">
                <label>Descripción</label>
                <textarea 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  rows={3} 
                />
              </div>
              
              <div className="form-field">
                <label>Precio Base (S/)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  value={basePrice} 
                  onChange={e => setBasePrice(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="form-field">
                <label>Imágenes del Producto</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={handleImageChange} 
                />
                {previews.length > 0 && (
                  <div className="image-previews">
                    {previews.map((src, i) => (
                      <img key={i} src={src} alt={`Preview ${i}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Sección de subasta */}
            <div className="form-section">
              <h2>Detalles de la Subasta</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label>Precio Inicial (S/)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={initialPrice} 
                    onChange={e => setInitialPrice(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-field">
                  <label>Fecha de Inicio</label>
                  <input 
                    type="datetime-local" 
                    value={startDate} 
                    onChange={e => setStartDate(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-field">
                  <label>Fecha de Fin</label>
                  <input 
                    type="datetime-local" 
                    value={endDate} 
                    onChange={e => setEndDate(e.target.value)} 
                    required 
                  />
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Creando...
                </>
              ) : (
                <>
                  <i className="fas fa-gavel"></i> Publicar Subasta
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}