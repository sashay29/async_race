const LOCAL_API_URL = 'http://127.0.0.1:3000';

declare global {
   interface Window {
      APP_CONFIG?: {
         apiUrl?: string;
      };
   }
}

const isLocalAppHost = (): boolean => {
   if (typeof window === 'undefined') return false;
   const { hostname } = window.location;
   return hostname === 'localhost' || hostname === '127.0.0.1';
};

const readConfiguredUrl = (): string | null => {
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

   return null;
};

const resolveApiBaseUrl = (): string => {
   const configuredUrl = readConfiguredUrl();
   if (configuredUrl) return configuredUrl;

   if (isLocalAppHost()) return LOCAL_API_URL;

   return '';
};

export const API_BASE_URL = resolveApiBaseUrl();

export const isApiConfigured = (): boolean => API_BASE_URL.length > 0;

export const API_NOT_CONFIGURED_MESSAGE =
   'API is not configured. Deploy the /api folder to Render, set APP_CONFIG.apiUrl in public/api-config.js, then run npm run deploy.';
