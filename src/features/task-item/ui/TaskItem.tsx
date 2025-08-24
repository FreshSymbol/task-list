import { memo, ReactElement } from 'react';
import styles from './TaskItem.module.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTaskById, TTask } from '../../../shared/api';
import { Link } from 'react-router-dom';

type TaskItemProps = TTask;

export const TaskItem = memo(
  ({ id, title, description }: TaskItemProps): ReactElement => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: () => deleteTaskById(String(id)),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
    });
    return (
      <li className={styles.item}>
        <p>{id}.</p>
        <h2 className={styles.title}>{title}.</h2>
        <p className={styles.text}>{description}</p>
        <div className={styles.buttonContainer}>
          <Link className={styles.button} to={`tasks/${id}`}>
            просмотр
          </Link>
          <button onClick={() => mutation.mutate()} className={styles.button}>
            удалить
          </button>
        </div>
      </li>
    );
  }
);
