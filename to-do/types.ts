export type ToDoStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface ToDoItemType {
  id: string;
  title: string;
  description: string;
  status: ToDoStatus;
}
