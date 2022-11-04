export enum ToDoStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface ToDoItemType {
  id: string;
  title: string;
  description: string;
  status: ToDoStatus;
}
