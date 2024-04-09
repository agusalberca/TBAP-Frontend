const { REACT_APP_URL_BACK, REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

export const add_base_url = (url: string) => {
    let final_url = ''
    if (url){
        final_url = `${REACT_APP_URL_BACK}${url}`
    }
  return final_url;
};

export const convert_epoch_to_date = (epoch: number) => {
    const date = new Date(epoch * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export const getAccessToken = async (code) => {
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
      console.log(result); // Maneja la respuesta según sea necesario
      return result.access_token;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  } else {
    console.error('No se encontró código en la URL');
  }
};
