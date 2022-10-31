import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@root/pages/store';
import { ToDoItem } from '@root/to-do/types';
import { useSelector } from 'react-redux';

interface ToDoState {
  items: ToDoItem[];
}

const initialState: ToDoState = {
  items: [],
};

type A = Pick<ToDoItem, 'title' | 'description'>;
export type RequestAddToDoAction = PayloadAction<A>;
export type RequestUpdateToDoStatusAction = PayloadAction<
  Pick<ToDoItem, 'id' | 'status'>
>;
export type RequestDeleteToDoAction = PayloadAction<Pick<ToDoItem, 'id'>>;

const toDoSlice = createSlice({
  name: 'toDos',
  initialState,
  reducers: {
    requestGetToDoApi: () => {},
    successGetToDoApi: (state, action: PayloadAction<ToDoItem[]>) => {},
    failureGetToDoApi: () => {},
    requestGetToDo: () => {},
    successGetToDo: (state, action: PayloadAction<ToDoItem[]>) => {
      state.items = action.payload;
    },
    failureGetToDo: () => {},

    requestAddToDoApi: (state, action: RequestAddToDoAction) => {},
    successAddToDoApi: (state, action: PayloadAction<ToDoItem>) => {},
    failureAddToDoApi: () => {},
    requestAddToDo: (state, action: RequestAddToDoAction) => {},
    successAddToDo: (state, action: PayloadAction<ToDoItem>) => {
      state.items.push(action.payload);
    },
    failureAddToDo: () => {},

    requestUpdateToDoStatusApi: (
      state,
      action: RequestUpdateToDoStatusAction,
    ) => {},
    successUpdateToDoStatusApi: (state, action: PayloadAction<ToDoItem>) => {},
    failureUpdateToDoStatusApi: () => {},
    requestUpdateToDoStatus: (
      state,
      action: RequestUpdateToDoStatusAction,
    ) => {},
    successUpdateToDoStatus: (state, action: PayloadAction<ToDoItem>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.status = action.payload.status;
      }
    },
    failureUpdateToDoStatus: () => {},

    requestDeleteToDoApi: (state, action: RequestDeleteToDoAction) => {},
    successDeleteToDoApi: (state, action: PayloadAction<ToDoItem>) => {},
    failureDeleteToDoApi: () => {},
    requestDeleteToDo: (state, action: RequestDeleteToDoAction) => {},
    successDeleteToDo: (state, action: PayloadAction<ToDoItem[]>) => {
      // const result = state.items.filter(
      //   (item) => item.id !== action.payload.id,
      // );
      state.items = action.payload;
    },
    failureDeleteToDo: () => {},
  },
});

export const todoActions = toDoSlice.actions;
export const toDoReducer = toDoSlice.reducer;
