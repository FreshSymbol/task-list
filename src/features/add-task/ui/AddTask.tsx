import { ReactElement, useState } from 'react';
import styles from './AddTask.module.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTask } from '../../../shared/api';

export const AddTask = (): ReactElement => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const queryClient = useQueryClient();
  const mitation = useMutation({
    mutationFn: () => addTask({ title, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setDescription('');
      setTitle('');
    },
  });

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mitation.mutate();
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label className={styles.label} htmlFor="title">
        Заголовок
      </label>
      <input
        className={styles.input}
        onChange={changeTitleHandler}
        type="text"
        id="title"
        name="title"
        required
        value={title}
        minLength={3}
        placeholder="Заголовок"
      />
      <label className={styles.label} htmlFor="description">
        Описание
      </label>
      <input
        className={styles.input}
        onChange={changeDescriptionHandler}
        type="text"
        id="description"
        name="description"
        required
        value={description}
        minLength={5}
        placeholder="Описание"
      />
      <button className={styles.button} type="submit">
        Добавить
      </button>
    </form>
  );
};
