'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../componets/Header';
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
  const [shipping, setShipping] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    cci: ''
  });
  const [digitalWallet, setDigitalWallet] = useState({
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFormats = ['image/jpeg', 'image/png'];
    const validFiles = files.filter(file => validFormats.includes(file.type));

    setImages(prevImages => [...prevImages, ...validFiles]);
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

  const handleShippingChange = (e) => {
    setShipping(e.target.value);
  };

  const validateDates = () => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start <= now) {
      setError('La fecha de inicio debe ser en el futuro');
      return false;
    }

    if (end <= start) {
      setError('La fecha de fin debe ser posterior a la fecha de inicio');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (!validateDates()) {
      setLoading(false);
      return;
    }

    try {
      if (!paymentMethod) {
        throw new Error('Debe seleccionar un método de pago');
      }

      let paymentData = { method: paymentMethod };
      if (paymentMethod === 'transferencia') {
        if (!bankDetails.bankName || !bankDetails.accountNumber || !bankDetails.cci) {
          throw new Error('Debe completar todos los datos bancarios');
        }
        paymentData.details = bankDetails;
      } else if (paymentMethod === 'yape' || paymentMethod === 'plin') {
        if (!digitalWallet.phoneNumber) {
          throw new Error('Debe ingresar el número de teléfono');
        }
        paymentData.phoneNumber = digitalWallet.phoneNumber;
      }

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
          payment_methods: paymentData
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
      <Header />
      
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
              </div>
            </div>

            <div className="form-section">
              <h2>Métodos de Pago Aceptados</h2>
              
              <div className="form-field">
                <label>Seleccione su método de pago preferido</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="">Seleccione un método</option>
                  <option value="transferencia">Transferencia Bancaria</option>
                  <option value="yape">Yape</option>
                  <option value="plin">Plin</option>
                </select>
              </div>

              {paymentMethod === 'transferencia' && (
                <div className="payment-details">
                  <div className="form-field">
                    <label>Nombre del Banco</label>
                    <input
                      type="text"
                      value={bankDetails.bankName}
                      onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                      placeholder="Ej: BCP, BBVA, Interbank"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Número de Cuenta</label>
                    <input
                      type="text"
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                      placeholder="Número de cuenta bancaria"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>CCI (Código de Cuenta Interbancario)</label>
                    <input
                      type="text"
                      value={bankDetails.cci}
                      onChange={(e) => setBankDetails({...bankDetails, cci: e.target.value})}
                      placeholder="CCI de 20 dígitos"
                      required
                    />
                  </div>
                </div>
              )}

              {(paymentMethod === 'yape' || paymentMethod === 'plin') && (
                <div className="payment-details">
                  <div className="form-field">
                    <label>Número de Teléfono {paymentMethod === 'yape' ? 'Yape' : 'Plin'}</label>
                    <input
                      type="tel"
                      value={digitalWallet.phoneNumber}
                      onChange={(e) => setDigitalWallet({
                        phoneNumber: e.target.value
                      })}
                      placeholder="Ej: 987654321"
                      required
                    />
                  </div>
                </div>
              )}
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