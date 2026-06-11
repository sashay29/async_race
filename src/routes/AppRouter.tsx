import React from 'react';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import App from 'app/App';
import GaragePage from 'pages/GaragePage/GaragePage';
import WinnersPage from 'pages/WinnersPage/WinnersPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

const basename = process.env.PUBLIC_URL?.replace(/\/$/, '') || '';

function createAppRouter(): ReturnType<typeof createBrowserRouter> {
   const routes: RouteObject[] = [
      {
         path: '/',
         element: <App />,
         children: [
            { index: true, element: <Navigate replace to="garage" /> },
            { path: 'garage', element: <GaragePage /> },
            { path: 'winners', element: <WinnersPage /> },
            { path: '*', element: <NotFoundPage /> },
         ],
      },
   ];

   return createBrowserRouter(routes, { basename });
}

export default createAppRouter;
