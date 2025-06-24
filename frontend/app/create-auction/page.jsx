'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../create-auction/create-auction.css';

export default function CreateAuctionPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Todos');
  const [basePrice, setBasePrice] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [initialPrice, setInitialPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [shipping, setShipping] = useState(''); // Asegúrate de que 'shipping' sea un valor escalar
  const [paymentMethods, setPaymentMethods] = useState(''); // Asegúrate de que 'paymentMethods' sea un valor escalar
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFormats = ['image/jpeg', 'image/png']; // formatos de imagen válidos
    const validFiles = files.filter(file => validFormats.includes(file.type));

    // Añadir las imágenes nuevas a las imágenes existentes sin sobreescribirlas
    setImages(prevImages => [...prevImages, ...validFiles]);

    // Crear las previsualizaciones de las imágenes añadidas
    setPreviews(prevPreviews => [
      ...prevPreviews,
      ...validFiles.map(f => URL.createObjectURL(f)),
    ]);
  };

  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    const res = await fetch('/api/upload-images', { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Error subiendo imágenes');
    const { urls } = await res.json();
    return urls;
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePaymentMethodsChange = (e) => {
    setPaymentMethods(e.target.value); // Cambié de 'e.target.value' a 'e.target.value' para ajustarlo como un valor único
  };

  const handleShippingChange = (e) => {
    setShipping(e.target.value); // Asegúrate de que solo se maneje como una cadena, no como un array
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
          images: imageUrls,
          shipping,
          payment_methods: paymentMethods,
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
            <button onClick={() => router.push('/')} className="nav-item">
              <i className="fas fa-home"></i> Inicio
            </button>
            <button className="nav-item">
              <i className="fas fa-search"></i> Buscar
            </button>
            <button className="nav-item active">
              <i className="fas fa-plus-circle"></i> Crear Subasta
            </button>
            <button className="nav-item">
              <i className="fas fa-heart"></i> Favoritos
            </button>
            <button className="nav-item">
              <i className="fas fa-user"></i> Perfil
            </button>
          </div>
        </nav>
      </header>

      <main className="main-content create-auction-content">
        <div className="auction-form-container">
          <h1 className="auction-form-title">Crear Nueva Subasta</h1>
          {error && <p className="auction-form-error">{error}</p>}
          
          <form onSubmit={handleSubmit} className="auction-form">
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
                  <select value={category} onChange={handleCategoryChange} required>
                    <option value="Todos">Todos</option>
                    <option value="Electrónica">Electrónica</option>
                    <option value="Arte">Arte</option>
                    <option value="Coleccionables">Coleccionables</option>
                    <option value="Vehículos">Vehículos</option>
                    <option value="Inmuebles">Inmuebles</option>
                    <option value="Moda">Moda</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Descripción</label>
                <textarea 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  rows={3} 
                  required
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
                  accept="image/jpeg, image/png" 
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
                <p className="image-restriction">
                  Solo se permiten imágenes en formato JPG o PNG.
                </p>
              </div>
            </div>

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
                    className="datetime-input"
                  />
                </div>
                <div className="form-field">
                  <label>Fecha de Fin</label>
                  <input 
                    type="datetime-local" 
                    value={endDate} 
                    onChange={e => setEndDate(e.target.value)} 
                    required 
                    className="datetime-input"
                  />
                </div>
                <div className="form-field">
                  <label>Envío</label>
                  <select value={shipping} onChange={handleShippingChange} required>
                    <option value="Aéreo">Aéreo</option>
                    <option value="Terrestre">Terrestre</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Métodos de Pago</label>
                  <select value={paymentMethods} onChange={handlePaymentMethodsChange} required>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta">Tarjetas de Crédito/Débito</option>
                    <option value="Transferencia">Transferencias Bancarias</option>
                    <option value="Monedero">Monederos Digitales</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? (
                <React.Fragment>
                  <i className="fas fa-spinner fa-spin"></i> Creando...
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <i className="fas fa-gavel"></i> Publicar Subasta
                </React.Fragment>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
