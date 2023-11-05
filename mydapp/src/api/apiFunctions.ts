import axios, { AxiosError } from 'axios';

import { API_URL } from '../constants';

interface GetQuery {
  path: string;
  token?: string;
  params?: any;
  callback?: (data: any) => any;
}

interface GeneralQuery {
  path: string;
  token?: string;
  body?: any;
  callback?: (data: any) => any;
}

export const getQuery = async <T>({
  path,
  token = '',
  params = {},
  callback = data => data,
}: GetQuery): Promise<T> => {
  const headers: Record<string, string> = {}; // Define los headers como un objeto vacío

  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  try {
    const { data } = await axios.get(`${API_URL}${path}`, {
      headers,
      params,
    });

    return callback(data);
  } catch (error) {
    return handleError(error);
  }
};

export const postQuery = async <T>({
  path,
  token = '',
  body = {},
  callback = data => data,
}: GeneralQuery): Promise<T> => {
  const headers: Record<string, string> = {}; // Define los headers como un objeto vacío

  if (token) {
    headers.Authorization = `Token ${token}`;
    // multipart/form-data
    headers['Content-Type'] = 'multipart/form-data';
  }

  try {
    const { data } = await axios.post(`${API_URL}${path}`, body, {
      headers,
    });
    return callback(data);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteQuery = async <T>({
  path,
  token = '',
  body = {},
  callback = data => data,
}: GeneralQuery): Promise<T> => {
  const headers: Record<string, string> = {}; // Define los headers como un objeto vacío

  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  try {
    const { data } = await axios.delete(`${API_URL}${path}`, {
      headers,
      data: body,
    });

    return callback(data);
  } catch (error) {
    return handleError(error);
  }
};

export const putQuery = async <T>({
  path,
  token = '',
  body = {},
  callback = data => data,
}: GeneralQuery): Promise<T> => {
  const headers: Record<string, string> = {}; // Define los headers como un objeto vacío

  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  try {
    const { data } = await axios.put(`${API_URL}${path}`, body, {
      headers,
    });

    return callback(data);
  } catch (error) {
    return handleError(error);
  }
};

export const patchQuery = async <T>({
  path,
  token = '',
  body = {},
  callback = data => data,
}: GeneralQuery): Promise<T> => {
  // const headers = token && {
  //   Authorization: `Token ${token}`,
  //   // 'Content-Type': 'multipart/form-data',
  // };
  const headers: Record<string, string> = {}; // Define los headers como un objeto vacío

  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  try {
    const { data } = await axios.patch(`${API_URL}${path}`, body, {
      headers,
    });

    return callback(data);
  } catch (error) {
    return handleError(error);
  }
};

const deleteInvalidToken = () => {
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('storage'));
};

const handleError = (error: any) => {
  if (
    typeof error.response?.data === 'string' &&
    error.response.data.startsWith('<!DOCTYPE html>')
  ) {
    return { error: 'internal server error' };
  }
  if (error.response?.data.detail === 'Invalid token.') {
    deleteInvalidToken();
  }
  return error.response?.data;
};
