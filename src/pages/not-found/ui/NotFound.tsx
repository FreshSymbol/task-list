import { ReactElement } from 'react';
import { Header } from '../../../shared/components/header';
import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

export const NotFound = (): ReactElement => {
  return (
    <>
      <Header title="Not Found" />
      <main className={styles.main}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Страница не найдена</p>
        <p className={styles.text}>
          Извините, мы не можем найти страницу которую вы ищите
        </p>
        <Link className={styles.link} to="/">
          Вернуться на галвную
        </Link>
      </main>
    </>
  );
};
