type TaskRequest = {
  data: TTask[];
  nextPage: number | null;
};

export type TTask = {
  id: number;
  title: string;
  description: string;
};

export type TaskResponse = Omit<TTask, 'id'>;

const BASE_URL = import.meta.env.VITE_BASE_URL;
const LIMIT = 20;

const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) return await res.json();
  else {
    const err = await res.json();
    return Promise.reject(err);
  }
};

export const getTasks = async (pageParam: number): Promise<TaskRequest> => {
  const res = await fetch(`${BASE_URL}?_page=${pageParam}&_limit=${LIMIT}`);
  const data = await checkResponse<TTask[]>(res);
  const totalCount = res.headers.get('X-Total-Count');
  const hasNextPage = totalCount && pageParam * LIMIT < parseInt(totalCount);
  const nextPage = hasNextPage ? pageParam + 1 : null;

  return { data, nextPage };
};

export const getTaskById = async (id: string): Promise<TTask> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return checkResponse<TTask>(res);
};

export const deleteTaskById = async (id: string): Promise<Request> => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  return checkResponse(res);
};

export const editTaskById = async (
  id: string,
  task: TaskResponse
): Promise<Request> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return checkResponse(res);
};

export const addTask = async (task: TaskResponse): Promise<Request> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return checkResponse(res);
};
