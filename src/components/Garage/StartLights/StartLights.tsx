import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { START_LIGHT_COUNT, START_LIGHT_STEP_MS } from 'constants/race';
import styles from './StartLights.module.css';

const GO_STEP = START_LIGHT_COUNT + 1;

interface StartLightsProps {
   isRacing: boolean;
}

function StartLights({ isRacing }: StartLightsProps) {
   const [step, setStep] = useState(0);

   useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;
      if (isRacing && step < GO_STEP) {
         timer = setTimeout(() => setStep(step + 1), START_LIGHT_STEP_MS);
      }
      if (!isRacing) setStep(0);
      return () => clearTimeout(timer);
   }, [isRacing, step]);

   const statusText = step === GO_STEP ? 'Go' : step > 0 ? `Red light ${step} of ${START_LIGHT_COUNT}` : 'Waiting';

   return (
      <div className={styles.startLight} role="group" aria-label="Start lights" aria-live="polite" aria-atomic="true">
         <span className="visuallyHidden">{isRacing ? statusText : 'Start lights off'}</span>
         {Array.from({ length: START_LIGHT_COUNT }, (_, index) => index + 1).map((light) => (
            <div
               key={light}
               className={classNames(styles.light, {
                  [styles.red]: step >= light && step < GO_STEP,
                  [styles.green]: step === GO_STEP,
               })}
               aria-hidden
            />
         ))}
      </div>
   );
}

export default StartLights;
