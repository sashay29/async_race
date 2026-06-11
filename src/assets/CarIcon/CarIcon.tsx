import React, { CSSProperties, AnimationEventHandler, useId } from 'react';
import CarIconShape from './CarIconShape';

interface CarIconProps {
   width?: number;
   height?: number;
   fill?: string;
   className?: string;
   style?: CSSProperties;
   handleAnimationEnd?: AnimationEventHandler<SVGSVGElement>;
   'aria-label'?: string;
}

function CarIcon({
   width = 88,
   height = 36,
   fill = '#00e5ff',
   className = '',
   style,
   handleAnimationEnd,
   'aria-label': ariaLabel,
}: CarIconProps) {
   const uid = useId().replace(/:/g, '');

   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={width}
         height={height}
         viewBox="0 0 96 40"
         fill="none"
         className={className}
         style={style}
         onAnimationEnd={handleAnimationEnd}
         role={ariaLabel ? 'img' : undefined}
         aria-label={ariaLabel}
         aria-hidden={ariaLabel ? undefined : true}
      >
         <CarIconShape uid={uid} fill={fill} />
      </svg>
   );
}

export default CarIcon;
