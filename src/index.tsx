import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import createAppRouter from 'routes/AppRouter';
import configureAppStore from 'store/configureStore';
import reportWebVitals from './reportWebVitals';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
   const root = ReactDOM.createRoot(rootElement);
   const store = configureAppStore();
   root.render(
      <Provider store={store}>
         <RouterProvider router={createAppRouter()} />
      </Provider>
   );
}

reportWebVitals();
