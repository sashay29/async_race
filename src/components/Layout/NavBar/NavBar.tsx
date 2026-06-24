import React from 'react';
import { ROUTE_SEGMENTS } from 'constants/routes';
import NavLink from 'components/Layout/NavLink/NavLink';
import styles from './NavBar.module.css';

function NavBar() {
   return (
      <nav className={styles.navBar} aria-label="Main">
         <ul>
            <NavLink to={ROUTE_SEGMENTS.GARAGE} label="Garage" />
            <NavLink to={ROUTE_SEGMENTS.WINNERS} label="Winners" />
         </ul>
      </nav>
   );
}

export default NavBar;
