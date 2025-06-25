'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaStar, FaStarHalfAlt, FaGavel, FaInfoCircle, FaPaperPlane, FaTimes, FaLock, FaMapMarkerAlt, FaShieldAlt, FaCreditCard, FaUniversity, FaMobileAlt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import'../detail-article/detail-article.css';

const PayPalLogo = () => (
  <svg viewBox="0 0 100 35" width="80" height="28">
    <path d="M81.9 12.9c-1.5-1-3.5-1.5-5.9-1.5h-9.6c-0.4 0-0.7 0.3-0.8 0.7l-3.1 19.7c0 0.2 0.2 0.4 0.4 0.4h5.2c0.4 0 0.7-0.3 0.8-0.7l0.7-4.4c0-0.2 0.2-0.4 0.4-0.4h2.8c3.7 0 6.7-1.5 7.5-5.8 0.3-1.6 0-2.9-0.8-3.9zm-6.3 6.2c-0.5 3.2-2.6 3.2-4.9 3.2h-1.6l1.1-7.1h1.6c2.3 0 4.1 0 4.6 2.1 0.2 0.8 0.2 1.4 0.2 1.8z" fill="#253B80"/>
    <path d="M94.1 12.9c-1.5-1-3.5-1.5-5.9-1.5h-9.6c-0.4 0-0.7 0.3-0.8 0.7l-3.1 19.7c0 0.2 0.2 0.4 0.4 0.4h4.9c0.4 0 0.7-0.3 0.8-0.7l0.7-4.4c0-0.2 0.2-0.4 0.4-0.4h2.8c3.7 0 6.7-1.5 7.5-5.8 0.3-1.6 0-2.9-0.8-3.9zm-6.3 6.2c-0.5 3.2-2.6 3.2-4.9 3.2h-1.6l1.1-7.1h1.6c2.3 0 4.1 0 4.6 2.1 0.2 0.8 0.2 1.4 0.2 1.8z" fill="#253B80"/>
    <path d="M40.2 11.4h-5.7c-0.4 0-0.7 0.3-0.8 0.7l-3.1 19.7c0 0.2 0.2 0.4 0.4 0.4h4.9c0.4 0 0.7-0.3 0.8-0.7l0.7-4.4c0-0.2 0.2-0.4 0.4-0.4h2.8c3.7 0 6.7-1.5 7.5-5.8 0.3-1.6 0-2.9-0.8-3.9 -1.5-1-3.5-1.5-5.9-1.5zm-0.6 6.2c-0.5 3.2-2.6 3.2-4.9 3.2h-1.6l1.1-7.1h1.6c2.3 0 4.1 0 4.6 2.1 0.2 0.8 0.2 1.4 0.2 1.8z" fill="#253B80"/>
    <path d="M64.5 11.4h-5.7c-0.4 0-0.7 0.3-0.8 0.7l-0.3 1.9 -0.9-1.2c-1-1.3-2.8-1.9-5-1.9h-5.1c-0.4 0-0.7 0.3-0.8 0.7l-3.1 19.7c0 0.2 0.2 0.4 0.4 0.4h4.9c0.4 0 0.7-0.3 0.8-0.7l0.7-4.4c0-0.2 0.2-0.4 0.4-0.4h2.8c3.7 0 6.7-1.5 7.5-5.8 0.3-1.6 0-2.9-0.8-3.9 -1.4-1-3.4-1.5-5.8-1.5zm-0.6 6.2c-0.5 3.2-2.6 3.2-4.9 3.2h-1.6l1.1-7.1h1.6c2.3 0 4.1 0 4.6 2.1 0.2 0.8 0.2 1.4 0.2 1.8z" fill="#253B80"/>
    <path d="M23.4 11.4h-5.7c-0.4 0-0.7 0.3-0.8 0.7l-3.1 19.7c0 0.2 0.2 0.4 0.4 0.4h4.9c0.4 0 0.7-0.3 0.8-0.7l0.7-4.4c0-0.2 0.2-0.4 0.4-0.4h2.8c3.7 0 6.7-1.5 7.5-5.8 0.3-1.6 0-2.9-0.8-3.9 -1.5-1-3.5-1.5-5.9-1.5zm-0.6 6.2c-0.5 3.2-2.6 3.2-4.9 3.2h-1.6l1.1-7.1h1.6c2.3 0 4.1 0 4.6 2.1 0.2 0.8 0.2 1.4 0.2 1.8z" fill="#253B80"/>
    <path d="M15.7 0.1c-0.2-0.2-0.5-0.3-0.8-0.1l-12.9 8.5c-0.2 0.1-0.3 0.4-0.3 0.7v24.3c0 0.4 0.4 0.7 0.8 0.7h4.9c0.4 0 0.7-0.3 0.8-0.7l0.7-4.4c0-0.2 0.2-0.4 0.4-0.4h2.8c3.7 0 6.7-1.5 7.5-5.8 0.3-1.6 0-2.9-0.8-3.9 -1.5-1-3.5-1.5-5.9-1.5h-1.6l1.1-7.1h1.6c2.3 0 4.1 0 4.6 2.1 0.2 0.8 0.2 1.4 0.2 1.8 0.5-3.2-0.1-5.8-1.5-7.1z" fill="#179BD7"/>
  </svg>
);

const DetalleArticle = ({ item, isOpen, toggleDetails }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [activePaymentMethod, setActivePaymentMethod] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'TechEnthusiast',
      text: '¡Excelente producto! Pude verlo en persona y definitivamente vale la pena.',
      date: 'Hace 2 días'
    },
    {
      id: 2,
      author: 'MobileExpert',
      text: '¿El vendedor ofrece garantía adicional? La de fábrica es de solo 1 año.',
      date: 'Hace 3 días'
    },
    {
      id: 3,
      author: 'TechSeller123',
      text: '@MobileExpert Se puede extender la garantía por 1 año más con un costo adicional.',
      date: 'Hace 3 días'
    }
  ]);
  const modalRef = useRef();

  const carouselImages = [
    'https://cdn.pixabay.com/photo/2016/11/29/12/30/phone-1869510_960_720.jpg',
    'https://cdn.pixabay.com/photo/2017/08/11/14/19/honor-2631271_960_720.jpg',
    'https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_960_720.jpg'
  ];

  const bidHistory = [
    { bidder: 'Comprador245', amount: 1799.00, time: 'Hace 30m' },
    { bidder: 'TechLover', amount: 1750.00, time: 'Hace 45m' },
    { bidder: 'GadgetPro', amount: 1700.00, time: 'Hace 1h' },
    { bidder: 'MobileFan', amount: 1650.00, time: 'Hace 1h 20m' },
    { bidder: 'SmartphoneHunter', amount: 1600.00, time: 'Hace 2h' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleDetails();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [isOpen, toggleDetails]);

  if (!isOpen) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    alert(`Puja realizada por S/ ${bidAmount}`);
    setBidAmount('');
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    const newComment = {
      id: comments.length + 1,
      author: 'Tú',
      text: comment,
      date: 'Ahora mismo'
    };
    
    setComments([newComment, ...comments]);
    setComment('');
  };

  return (
   <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-xl font-bold">Detalle de Subasta</h2>
          <button 
            onClick={toggleDetails}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-6 rounded-lg overflow-hidden">
            <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {carouselImages.map((img, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img src={img} alt={`Vista del producto ${index + 1}`} className="w-full h-64 object-cover" />
                </div>
              ))}
            </div>
            
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              <FaChevronRight />
            </button>
            
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-xl text-blue-600 font-semibold mb-3">Precio Actual: S/ {item.price}</p>
              
              <div className="flex items-center text-red-500 mb-4">
                <FaClock className="mr-2" />
                <span>Termina en: {item.timeLeft}</span>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Descripción</h4>
                <p className="mb-3">{item.description}</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Pantalla AMOLED de 6.5 pulgadas con tasa de refresco de 120Hz</li>
                  <li>Procesador octa-core de última generación</li>
                  <li>256GB de almacenamiento interno</li>
                  <li>12GB de RAM</li>
                  <li>Batería de 5000 mAh con carga rápida</li>
                  <li>Cámara principal de 108MP + ultra gran angular + teleobjetivo</li>
                  <li>Resistente al agua y polvo (IP68)</li>
                  <li>Sistema operativo actualizado a la última versión</li>
                </ul>
                <p className="mt-3">El equipo está completamente nuevo, en su caja original con todos los accesorios (cargador, cable, auriculares, manual). Incluye garantía de fábrica por 1 año.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-3">Información del Vendedor</h4>
                <div className="flex items-center mb-3">
                  <FaUserCircle className="text-4xl text-gray-400 mr-3" />
                  <div>
                    <p className="font-bold">{item.seller}</p>
                    <div className="flex items-center text-yellow-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalfAlt />
                      <span className="text-gray-500 text-sm ml-1">(128)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gray-500" />
                    <span>Lima, Perú</span>
                  </p>
                  <p className="flex items-center">
                    <FaShieldAlt className="mr-2 text-green-500" />
                    <span>Vendedor verificado</span>
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-3">Realizar Puja</h4>
                <form onSubmit={handleBidSubmit}>
                  <div className="flex mb-3">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-600">
                      S/
                    </span>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`${item.price}`}
                      min={Number(item.price) + 1}
                      step="10"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center"
                  >
                    <FaGavel className="mr-2" />
                    Pujar Ahora
                  </button>
                </form>
                <div className="mt-2 p-2 bg-blue-50 text-blue-700 rounded text-sm flex items-start">
                  <FaInfoCircle className="mr-2 mt-0.5 flex-shrink-0" />
                  <span>Puja mínima: S/ {Number(item.price) + 50}.00</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-3">Historial de Pujas</h4>
                <div className="space-y-2">
                  {bidHistory.map((bid, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded mr-2">
                          S/ {bid.amount.toFixed(2)}
                        </span>
                        <span className="text-sm">{bid.bidder}</span>
                      </div>
                      <span className="text-gray-500 text-sm">{bid.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
           </div>
      </div>
    </div>
  );
};

export default DetalleArticle;