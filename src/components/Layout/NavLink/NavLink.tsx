import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { isRaceLocked, RACE_STATUS } from 'constants/race';
import { setRace } from 'store/slices/garageSlice';
import styles from './NavLink.module.css';

interface NavLinkProps {
   to: string;
   label: string;
}

function NavLink({ to, label }: NavLinkProps) {
   const dispatch = useAppDispatch();
   const race = useAppSelector((state) => state.garage.race);

   return (
      <li>
         <RouterNavLink
            onClick={() => {
               if (isRaceLocked(race)) {
                  dispatch(setRace(RACE_STATUS.STOPPED));
               }
            }}
            to={to}
            className={({ isActive }) => classNames(styles.link, { [styles.active]: isActive })}
         >
            {label}
         </RouterNavLink>
      </li>
   );
}

export default NavLink;
