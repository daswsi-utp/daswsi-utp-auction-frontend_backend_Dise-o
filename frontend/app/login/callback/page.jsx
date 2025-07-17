// app/login/callback/page.jsx
'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setAuthToken } from '../../utils/auth';
import { oauthSuccess } from '../../Services/oauthService';

// Componente principal para manejar OAuth
function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const error = searchParams.get('error');

  useEffect(() => {
    const handleOAuth = async () => {
      try {
        if (error) {
          // Si hay un error en los parámetros de la URL, lo mostramos
          throw new Error(`OAuth Error: ${error}`);
        }

        if (token) {
          setAuthToken(token);
          
          // Redirigir a la página original o al home
          const redirectUrl = searchParams.get('redirect') || '/';
          router.push(redirectUrl);
        } else {
          throw new Error('Token de autenticación no recibido después de OAuth.');
        }
      } catch (err) {
        console.error('Error en OAuth Callback:', err);
        // Redirigir al login con un mensaje de error más específico
        router.push(`/login?error=${encodeURIComponent(err.message || 'oauth_failed')}`);
      }
    };

    handleOAuth();
  }, [token, error, router, searchParams]);

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Autenticando con Google...</p>
    </div>
  );
}

// Envolver el componente OAuthCallback dentro de Suspense
const OAuthCallbackSuspense = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <OAuthCallback />
  </Suspense>
);

export default OAuthCallbackSuspense;