import { ReactElement } from 'react';
import styles from './Spinner.module.css';

export const Spinner = (): ReactElement => {
  return (
    <div className={styles.preloader}>
      <div className={styles.spinner}></div>
    </div>
  );
};
