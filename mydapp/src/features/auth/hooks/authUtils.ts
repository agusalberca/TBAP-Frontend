import { useBackendAuthentication } from './useBackendAuthentication';
import { Navigate } from "react-router-dom";

// const requireAuth = (to, from, next) => {
//     const isBackendAuthenticated = useBackendAuthentication();
//     if (!isBackendAuthenticated) {
//       // Redirige al usuario a la página de inicio de sesión
//       next('/login');
//     } else {
//       // Deja que el usuario acceda a la ruta deseada
//       next();
//     }
//   };

// export { requireAuth };

const requireAuth = () => {
  // Obtiene el estado de autenticación del usuario
  const isAuthenticated = useBackendAuthentication();

  // Si el usuario no está logueado, redirecciona al login
  if (!isAuthenticated) {
    Navigate({ to: '/login' });
  }
};

export { requireAuth };