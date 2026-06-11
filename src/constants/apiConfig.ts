const DEFAULT_API_URL = 'http://127.0.0.1:3000';

const resolveApiBaseUrl = (): string => {
   const envUrl = process.env.REACT_APP_API_URL?.trim();
   if (!envUrl) return DEFAULT_API_URL;
   if (envUrl.startsWith('http://') || envUrl.startsWith('https://')) {
      return envUrl.replace(/\/$/, '');
   }
   return DEFAULT_API_URL;
};

export const API_BASE_URL = resolveApiBaseUrl();
