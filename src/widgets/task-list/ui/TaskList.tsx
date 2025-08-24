import { useInfiniteQuery } from '@tanstack/react-query';
import React, { ReactElement, useCallback, useEffect } from 'react';
import { getTasks } from '../../../shared/api';
import styles from './TaskList.module.scss';
import { Spinner } from '../../../shared/spiner';
import { TaskItem } from '../../../features/task-item';
import { nanoid } from 'nanoid';

export const TaskList = (): ReactElement => {
  const {
    data,
    isLoading,
    fetchNextPage,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['tasks'],
    queryFn: ({ pageParam }) => getTasks(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 1000,
  });

  const scrollHandler = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const isBottom = scrollY + windowHeight >= documentHeight;
    if (isBottom) fetchNextPage();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true });

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);

  if (isLoading) return <Spinner />;
  if (isError) return <h1 className={styles.error}>${error.message}</h1>;

  return (
    <>
      <ul className={styles.list}>
        {data?.pages.map((page) => (
          <React.Fragment key={nanoid()}>
            {page.data.map((task) => (
              <TaskItem key={task.id} {...task} />
            ))}
          </React.Fragment>
        ))}
      </ul>
      <>
        {!hasNextPage ? (
          <p className={styles.status}>Актуальные данные</p>
        ) : isFetchingNextPage ? (
          <p className={styles.status}>Загружаем данные</p>
        ) : null}
      </>
    </>
  );
};
