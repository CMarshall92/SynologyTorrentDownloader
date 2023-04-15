import axios, { AxiosInstance } from 'axios';

export const axiosInstance = (
  {
    baseURL,
    jwt,
  }: {
    baseURL: string | null;
    jwt: string | null;
  } = {
    baseURL: null,
    jwt: null,
  }
): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseURL || 'http://localhost:4000',
    withCredentials: true,
    ...(jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : {}),
  });

  instance.defaults.withCredentials = true;

  return instance;
};

export default axiosInstance;
