import { ReactElement } from 'react';
import { TaskList } from '../../../widgets/task-list';
import { Header } from '../../../shared/components/header';
import { AddTask } from '../../../features/add-task';

export const Base = (): ReactElement => {
  return (
    <>
      <Header title="Task List" />
      <main>
        <AddTask />
        <TaskList />
      </main>
    </>
  );
};
