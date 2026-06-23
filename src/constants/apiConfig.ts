const LOCAL_API_URL = 'http://127.0.0.1:3000';

declare global {
   interface Window {
      APP_CONFIG?: {
         apiUrl?: string;
      };
   }
}

const resolveApiBaseUrl = (): string => {
   if (typeof window !== 'undefined') {
      const runtimeUrl = window.APP_CONFIG?.apiUrl?.trim();
      if (runtimeUrl?.startsWith('http://') || runtimeUrl?.startsWith('https://')) {
         return runtimeUrl.replace(/\/$/, '');
      }
   }

   const envUrl = process.env.REACT_APP_API_URL?.trim();
   if (envUrl?.startsWith('http://') || envUrl?.startsWith('https://')) {
      return envUrl.replace(/\/$/, '');
   }

   return LOCAL_API_URL;
};

export const API_BASE_URL = resolveApiBaseUrl();
