import { ReactElement } from 'react';
import styles from './Header.module.scss';

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps): ReactElement => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};
