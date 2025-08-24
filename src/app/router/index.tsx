import { createBrowserRouter } from 'react-router-dom';
import { Base } from '../../pages/base';
import { Task } from '../../pages/task';
import { NotFound } from '../../pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Base />,
  },
  {
    path: 'tasks/:id',
    element: <Task />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
