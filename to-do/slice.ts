import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@root/pages/store';
import { ToDoItemType, ToDoStatus } from '@root/to-do/types';
import { useSelector } from 'react-redux';

interface ToDoState {
  items: ToDoItemType[];
}

const initialState: ToDoState = {
  items: [],
};

type ToDoContent = Pick<ToDoItemType, 'title' | 'description'>;
export type RequestAddToDoAction = PayloadAction<ToDoContent>;
// export type RequestUpdateToDoStatusAction = PayloadAction<
export type ToDoIdStatus = Pick<ToDoItemType, 'id' | 'status'>;
// export type PayloadActionType = PayloadAction<ToDoIdStatus>;
export type RequestDeleteToDoAction = PayloadAction<Pick<ToDoItemType, 'id'>>;

const toDoSlice = createSlice({
  name: 'toDos',
  initialState,
  reducers: {
    requestGetToDoApi: () => {},
    successGetToDoApi: (state, action: PayloadAction<ToDoItemType[]>) => {
      state.items = action.payload;
    },
    failureGetToDoApi: () => {},
    requestGetToDo: () => {},
    successGetToDo: () => {},
    failureGetToDo: () => {},

    requestAddToDoApi: (state, action: RequestAddToDoAction) => {},
    successAddToDoApi: (state, action: PayloadAction<ToDoItemType>) => {
      state.items.push(action.payload);
    },
    failureAddToDoApi: () => {},
    requestAddToDo: (state, action: RequestAddToDoAction) => {},
    successAddToDo: () => {},
    failureAddToDo: () => {},

    requestUpdateToDoStatusApi: (
      state,
      action: PayloadAction<ToDoIdStatus>,
    ) => {},
    successUpdateToDoStatusApi: (
      state,
      action: PayloadAction<ToDoItemType>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.status = action.payload.status;
      }
    },
    failureUpdateToDoStatusApi: () => {},
    requestUpdateToDoStatus: (state, action: PayloadAction<ToDoIdStatus>) => {},
    successUpdateToDoStatus: () => {},
    failureUpdateToDoStatus: () => {},

    requestDeleteToDoApi: (state, action: RequestDeleteToDoAction) => {},
    successDeleteToDoApi: (state, action: PayloadAction<ToDoItemType[]>) => {
      state.items = action.payload;
    },
    failureDeleteToDoApi: () => {},
    requestDeleteToDo: (state, action: RequestDeleteToDoAction) => {},
    successDeleteToDo: () => {},
    failureDeleteToDo: () => {},
  },
});

export const todoActions = toDoSlice.actions;
export const toDoReducer = toDoSlice.reducer;

const selectToDos = (state: RootState) => state.toDo.items;
const selectStatusFilter = (_: RootState, statusFilter: ToDoStatus) =>
  statusFilter;
export const selectFilteredToDos = createSelector(
  selectToDos,
  selectStatusFilter,
  (items: ToDoItemType[], statusFilter) =>
    items.filter((item: ToDoItemType) => item.status === statusFilter),
);
