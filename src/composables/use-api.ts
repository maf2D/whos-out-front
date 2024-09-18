import { createFetch } from '@vueuse/core';

export const useApi = () => {
  const api = createFetch({
    baseUrl: 'https://whos-out-api.maf2d.com/api/v1',
    fetchOptions: {
      mode: 'cors'
    }
  });

  return { api };
};
