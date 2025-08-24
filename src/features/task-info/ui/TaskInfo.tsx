import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { editTaskById, getTaskById } from '../../../shared/api';
import { Spinner } from '../../../shared/spiner';
import styles from './TaskInfo.module.scss';

export const TaskInfo = (): ReactElement => {
  const { id } = useParams<string>();
  const navigate = useNavigate();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['tasks', id],
    queryFn: () => getTaskById(id!),
  });

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
    }
  }, [data]);

  const queryClient = useQueryClient();
  const mitation = useMutation({
    mutationFn: () => editTaskById(id!, { title, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', id] });
      navigate('/');
    },
  });

  const changeTitleHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const changeDescriptionHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mitation.mutate();
  };

  if (isLoading) return <Spinner />;
  if (isError) return <h1 className={styles.error}>${error.message}</h1>;

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label className={styles.label} htmlFor="title">
        Заголовок
      </label>
      <textarea
        className={styles.input}
        onChange={changeTitleHandler}
        id="title"
        name="title"
        required
        value={title}
        minLength={3}
      />
      <label className={styles.label} htmlFor="description">
        Описание
      </label>
      <textarea
        className={styles.input}
        onChange={changeDescriptionHandler}
        id="description"
        name="description"
        required
        value={description}
        minLength={5}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => navigate(-1)}>
          Назад
        </button>
        <button className={styles.button} type="submit">
          Сохранить
        </button>
      </div>
    </form>
  );
};
