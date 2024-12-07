import { createFetch } from '@vueuse/core';

export const useApi = () =>
  createFetch({
    baseUrl: import.meta.env.VITE_API_URL,
    options: {
      async beforeFetch({ options }) {
        options.credentials = 'include';
      }
    }
  });
