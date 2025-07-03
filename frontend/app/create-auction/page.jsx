'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../componets/Header';
import '../create-auction/create-auction.css';

import { createProduct } from '../Services/productService';
import { createAuction } from '../Services/auctionService';

export default function CreateAuctionPage() {
  const router = useRouter();
  const userId = 10; // para pruebas

  // — Producto —
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Todos');
  const [basePrice, setBasePrice] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [productStatus, setProductStatus] = useState('CREATED');
  const [productVisible, setProductVisible] = useState(true);

  // — Subasta —
  const [initialPrice, setInitialPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [auctionStatus, setAuctionStatus] = useState('PENDING');
  const [auctionVisible, setAuctionVisible] = useState(true);

  // — UI —
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    const valid = files.filter(f => ['image/jpeg','image/png'].includes(f.type));
    setImageFiles(prev => [...prev, ...valid]);
    setPreviews(prev => [...prev, ...valid.map(f => URL.createObjectURL(f))]);
  };

  const validateDates = () => {
    const now = Date.now();
    const s = new Date(startDate).getTime();
    const e = new Date(endDate).getTime();
    if (s <= now) {
      setError('Fecha de inicio debe ser en el futuro');
      return false;
    }
    if (e <= s) {
      setError('Fecha de fin debe ser posterior');
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    if (!validateDates()) return;
    setLoading(true);

    try {
      // Genera URL local para pruebas
      const imageUrl = imageFiles.length > 0
        ? URL.createObjectURL(imageFiles[0])
        : '';

      // 2) Crear producto
      const product = await createProduct({
        name,
        description,
        imageUrl,
        category,
        basePrice:    parseFloat(basePrice),
        userId,
        status:       productStatus,
        visible:      productVisible
      });

      // 3) Crear subasta
      const auction = await createAuction({
        productId:    product.id,
        initialPrice: parseFloat(initialPrice),
        startDate,
        endDate,
        status:       auctionStatus,
        visible:      auctionVisible
      });

      // 4) Redirigir
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

            {/* --- PRODUCTO --- */}
            <div className="form-section">
              <h2>Información del Producto</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label>Nombre</label>
                  <input
                    type="text" value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Categoría</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    required
                  >
                    <option value="Todos">Todos</option>
                    <option value="Electrónica">Electrónica</option>
                    <option value="Arte">Arte</option>
                    <option value="Coleccionables">Coleccionables</option>
                    <option value="Vehículos">Vehículos</option>
                    <option value="Inmuebles">Inmuebles</option>
                    <option value="Moda">Moda</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Precio Base (S/)</label>
                  <input
                    type="number" step="0.01"
                    value={basePrice}
                    onChange={e => setBasePrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Estado</label>
                  <select
                    value={productStatus}
                    onChange={e => setProductStatus(e.target.value)}
                  >
                    <option value="CREATED">CREATED</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>
                    <input
                      type="checkbox"
                      checked={productVisible}
                      onChange={e => setProductVisible(e.target.checked)}
                    /> Visible
                  </label>
                </div>
              </div>

              <div className="form-field">
                <label>Descripción</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Imágenes (JPG/PNG)</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  multiple
                  onChange={handleImageChange}
                />
                {previews.length > 0 && (
                  <div className="image-previews">
                    {previews.map((src,i) => (
                      <img key={i} src={src} alt={`Preview ${i}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* --- SUBASTA --- */}
            <div className="form-section">
              <h2>Detalles de la Subasta</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label>Precio Inicial (S/)</label>
                  <input
                    type="number" step="0.01"
                    value={initialPrice}
                    onChange={e => setInitialPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Fecha Inicio</label>
                  <input
                    type="datetime-local"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Fecha Fin</label>
                  <input
                    type="datetime-local"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Estado</label>
                  <select
                    value={auctionStatus}
                    onChange={e => setAuctionStatus(e.target.value)}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="RUNNING">RUNNING</option>
                    <option value="FINISHED">FINISHED</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>
                    <input
                      type="checkbox"
                      checked={auctionVisible}
                      onChange={e => setAuctionVisible(e.target.checked)}
                    /> Visible
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading
                ? <><i className="fas fa-spinner fa-spin"></i> Creando...</>
                : <><i className="fas fa-gavel"></i> Publicar Subasta</>
              }
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
