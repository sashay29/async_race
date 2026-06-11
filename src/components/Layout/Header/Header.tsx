import React from 'react';
import Logo from 'components/Layout/Logo/Logo';
import NavBar from 'components/Layout/NavBar/NavBar';
import styles from './Header.module.css';

function Header() {
   return (
      <header className={styles.header}>
         <Logo />
         <NavBar />
      </header>
   );
}

export default Header;
