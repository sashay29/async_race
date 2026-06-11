import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './StartLights.module.css';

interface StartLightsProps {
   isRacing: boolean;
}

function StartLights({ isRacing }: StartLightsProps) {
   const [step, setStep] = useState(0);

   useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;
      if (isRacing && step < 4) {
         timer = setTimeout(() => setStep(step + 1), 1000);
      }
      if (!isRacing) setStep(0);
      return () => clearTimeout(timer);
   }, [isRacing, step]);

   const statusText = step === 4 ? 'Go' : step > 0 ? `Red light ${step} of 3` : 'Waiting';

   return (
      <div className={styles.startLight} role="group" aria-label="Start lights" aria-live="polite" aria-atomic="true">
         <span className="visuallyHidden">{isRacing ? statusText : 'Start lights off'}</span>
         {[1, 2, 3].map((light) => (
            <div
               key={light}
               className={classNames(styles.light, {
                  [styles.red]: step >= light && step < 4,
                  [styles.green]: step === 4,
               })}
               aria-hidden
            />
         ))}
      </div>
   );
}

export default StartLights;
