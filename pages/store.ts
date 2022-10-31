import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas/rootSaga';
import { toDoReducer } from '@root/to-do/slice';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  middleware: [sagaMiddleware],
  reducer: { toDo: toDoReducer },
});
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
