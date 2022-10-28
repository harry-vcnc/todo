import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToDoItem } from '@root/to-do/types';

interface ToDoState {
  toDos: ToDoItem[];
}

const initialState: ToDoState = {
  toDos: [],
};

export type RequestAddToDoAction = PayloadAction<
  Pick<ToDoItem, 'title' | 'description'>
>;
type ToggleProgressAction = PayloadAction<Pick<ToDoItem, 'id'>>;
type DeleteToDoAction = PayloadAction<ToDoItem & Pick<ToDoItem, 'id'>>;

const toDoSlice = createSlice({
  name: 'toDos',
  initialState,
  reducers: {
    requestGetToDo: () => {},
    successGetToDo: () => {},
    failureGetToDo: () => {},
    requestGetToDoApi: () => {},
    successGetToDoApi: (state, action: PayloadAction<ToDoItem[]>) => {
      state.toDos = action.payload;
    },
    failureGetToDoApi: () => {},

    requestAddToDo: (state, action: RequestAddToDoAction) => {},
    successAddToDo: () => {},
    failureAddToDo: () => {},
    requestAddToDoApi: (state, action: RequestAddToDoAction) => {},
    successAddToDoApi: (state, action: PayloadAction<ToDoItem>) => {
      state.toDos.push(action.payload);
    },
    failureAddToDoApi: () => {},

    toggleProgress: (state, action: ToggleProgressAction) => {
      const toDo = state.toDos.find((toDo) => action.payload.id === toDo.id);
      if (toDo) {
        // toDo.inProgess = !toDo.inProgess;
      }
    },
    deleteToDoApi: (state, action: DeleteToDoAction) => {},
  },
});

export const todoActions = toDoSlice.actions;
export const toDoReducer = toDoSlice.reducer;
