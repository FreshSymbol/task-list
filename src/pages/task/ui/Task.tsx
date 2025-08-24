import { ReactElement } from 'react';
import { Header } from '../../../shared/components/header';
import { TaskInfo } from '../../../features/task-info';

export const Task = (): ReactElement => {
  return (
    <>
      <Header title="Task Info" />
      <TaskInfo />
    </>
  );
};
