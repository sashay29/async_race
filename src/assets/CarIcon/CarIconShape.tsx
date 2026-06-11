import React from 'react';
import { shiftColor } from './carIconUtils';
import CarIconDefs from './CarIconDefs';

interface CarIconShapeProps {
   uid: string;
   fill: string;
}

function Wheel({ cx, rimId }: { cx: number; rimId: string }) {
   return (
      <>
         <circle cx={cx} cy="28" r="6.5" fill="#0c0e14" />
         <circle cx={cx} cy="28" r="5" fill="#161922" />
         <circle cx={cx} cy="28" r="3.2" fill={`url(#${rimId})`} />
         <circle cx={cx} cy="28" r="1.2" fill="#2a3040" />
      </>
   );
}

function CarIconShape({ uid, fill }: CarIconShapeProps) {
   const bodyMid = shiftColor(fill, 0.08);
   const bodyDark = shiftColor(fill, -0.3);
   const rimId = `rim-${uid}`;

   return (
      <>
         <CarIconDefs uid={uid} fill={fill} />
         <ellipse cx="48" cy="35" rx="34" ry="3" fill="rgba(0,0,0,0.45)" />
         <g filter={`url(#glow-${uid})`}>
            <rect x="78" y="21" width="3" height="4" rx="1" fill="#ff3355" opacity="0.9" />
            <rect x="12" y="20" width="5" height="3" rx="1" fill="#fff8e0" opacity="0.95" />
         </g>
         <path d="M10 26 L14 26 L16 22 L22 18 L38 15 L58 15 L72 18 L80 22 L84 26 L86 26 L86 28 L10 28 Z" fill={`url(#body-${uid})`} />
         <path d="M24 18 L34 14 L52 14 L64 17 L68 20 L30 20 Z" fill={bodyMid} opacity="0.55" />
         <path d="M26 18 L36 15 L50 15 L60 17 L58 19 L32 19 Z" fill={`url(#glass-${uid})`} />
         <path d="M32 19 L54 19 L52 17 L34 17 Z" fill="rgba(255,255,255,0.12)" />
         <path d="M78 20 L86 23 L86 26 L80 24 Z" fill={bodyDark} />
         <path d="M10 24 L16 22 L14 26 L10 26 Z" fill={bodyDark} />
         <line x1="42" y1="15" x2="42" y2="19" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
         <Wheel cx={24} rimId={rimId} />
         <Wheel cx={72} rimId={rimId} />
         <path d="M6 18 L10 20 L10 24 L6 22 Z" fill={fill} opacity="0.35" />
      </>
   );
}

export default CarIconShape;
