import React from 'react';
import CarForm from 'components/Garage/CarForm/CarForm';
import GarageToolbar from 'components/Garage/GarageToolbar/GarageToolbar';
import styles from './ControlPanel.module.css';

function ControlPanel() {
   return (
      <section className={styles.panel} aria-label="Garage controls">
         <CarForm />
         <GarageToolbar />
      </section>
   );
}

export default ControlPanel;
