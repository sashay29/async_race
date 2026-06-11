import React from 'react';
import NavLink from 'components/Layout/NavLink/NavLink';
import styles from './NavBar.module.css';

function NavBar() {
   return (
      <nav className={styles.navBar} aria-label="Main">
         <ul>
            <NavLink to="garage" label="Garage" />
            <NavLink to="winners" label="Winners" />
         </ul>
      </nav>
   );
}

export default NavBar;
