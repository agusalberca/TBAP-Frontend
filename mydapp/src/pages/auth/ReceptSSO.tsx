import { useEffect, useState } from 'react';
import { getTokenBySSO } from '../../api/auth';
import useAppContext from '../../hooks/useAppContext';
import { useNavigate } from 'react-router-dom';
const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

export const ReceptSSO = () => {
  const [accessToken, setAccessToken] = useState(null);
  const { setToken } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      const url = 'https://127.0.0.1:8001/o/token/';
      const redirectUri = 'https://localhost:3000/recept-sso';

      if (code) {
        const data = {
          code: code,
          client_id: REACT_APP_CLIENT_ID,
          client_secret: REACT_APP_CLIENT_SECRET,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        };

        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data).toString(),
          });

          const result = await response.json();
          if (!accessToken) setAccessToken(result.access_token);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        console.error('No se encontró código en la URL');
      }
    };

    getAccessToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const data = await getTokenBySSO({ accessToken: accessToken });
          console.log('info', data);
          setToken(data.token);
          window.close();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <>
      <h1>Loading</h1>
    </>
  );
};

export default ReceptSSO;
