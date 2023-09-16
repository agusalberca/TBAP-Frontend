// import cntext
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';


export const useBackendAuthentication = () => {
  // TODO: check if the user is authenticated 
  const { token } = useContext(AppContext)
  const isAuthenticated = !!token
  return isAuthenticated ;
};
