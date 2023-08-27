export const useBackendAuthentication = () => {
  // TODO: check if the user is authenticated 
  const isAuthenticated = localStorage.getItem('token') !== null;
  return { isAuthenticated };
};
