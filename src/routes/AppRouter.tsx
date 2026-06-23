import React from 'react';
import { createHashRouter, Navigate, RouteObject } from 'react-router-dom';
import App from 'app/App';
import GaragePage from 'pages/GaragePage/GaragePage';
import WinnersPage from 'pages/WinnersPage/WinnersPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

function createAppRouter(): ReturnType<typeof createHashRouter> {
   const routes: RouteObject[] = [
      {
         path: '/',
         element: <App />,
         children: [
            { index: true, element: <Navigate replace to="/garage" /> },
            { path: 'garage', element: <GaragePage /> },
            { path: 'winners', element: <WinnersPage /> },
            { path: '*', element: <NotFoundPage /> },
         ],
      },
   ];

   return createHashRouter(routes);
}

export default createAppRouter;
