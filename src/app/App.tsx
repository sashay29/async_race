import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { initPageHistory } from 'storage/pageHistory';
import Header from 'components/Layout/Header/Header';

function App() {
   useEffect(() => {
      initPageHistory();
   }, []);

   return (
      <div className="wrapper">
         <div className="container">
            <Header />
            <Outlet />
         </div>
      </div>
   );
}

export default App;
