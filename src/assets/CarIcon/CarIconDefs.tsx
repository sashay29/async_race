import React from 'react';
import { shiftColor } from './carIconUtils';

interface CarIconDefsProps {
   uid: string;
   fill: string;
}

function CarIconDefs({ uid, fill }: CarIconDefsProps) {
   const bodyLight = shiftColor(fill, 0.35);
   const bodyDark = shiftColor(fill, -0.3);

   return (
      <defs>
         <linearGradient id={`body-${uid}`} x1="8" y1="8" x2="80" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={bodyLight} />
            <stop offset="45%" stopColor={fill} />
            <stop offset="100%" stopColor={bodyDark} />
         </linearGradient>
         <linearGradient id={`glass-${uid}`} x1="30" y1="10" x2="58" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1a2a3a" />
            <stop offset="100%" stopColor="#0a1018" />
         </linearGradient>
         <linearGradient id={`rim-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e8ecf4" />
            <stop offset="100%" stopColor="#5a6270" />
         </linearGradient>
         <filter id={`glow-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
               <feMergeNode in="blur" />
               <feMergeNode in="SourceGraphic" />
            </feMerge>
         </filter>
      </defs>
   );
}

export default CarIconDefs;
