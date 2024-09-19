import { createFetch } from '@vueuse/core';

export const useApi = () => {
  const api = createFetch({
    // baseUrl: 'https://whos-out-api.maf2d.com/api/v1'
    baseUrl: 'http://localhost:3001/api/v1'
    // baseUrl: '/api/v1'
  });

  return { api };
};
