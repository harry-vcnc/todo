export type ToDoStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface ToDoItem {
  id: string;
  title: string;
  description: string;
  status: ToDoStatus;
}
