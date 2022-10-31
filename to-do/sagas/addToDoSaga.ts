import { RequestAddToDoAction, todoActions } from '@root/to-do/slice';
import { call, fork, put, take, takeLeading } from 'typed-redux-saga';
import axios from 'axios';
import { TODO_API_URL } from '@root/constants/urls';

function* fetchAddToDo(action: RequestAddToDoAction) {
  try {
    const response = yield* call(() =>
      axios.post(TODO_API_URL, {
        title: action.payload.title,
        description: action.payload.description,
      }),
    );
    yield* put(todoActions.successAddToDoApi(response.data));
  } catch (error) {
    yield* put(todoActions.failureAddToDoApi());
  }
}

export function* addToDoSaga(action: RequestAddToDoAction) {
  // 큰 타입 action으로 넘겨주면, 이 사가에서 호출되는
  // 제너레이터 혹은 사가 내부에 사용한다

  // 사가 합성도 다음처럼 가능함
  // yield* fork('saga', 'action');
  // yield* call('saga', 'action');

  yield* fork(fetchAddToDo, action);
  const result = yield* take([
    todoActions.successAddToDoApi,
    todoActions.failureAddToDoApi,
  ]);

  if (result.type === todoActions.failureAddToDoApi.type) {
    yield* put(todoActions.failureAddToDo());
    // 제너레이터에서 리턴은?
    return;
  }

  yield* put(todoActions.successAddToDo(result.payload));
}

export const addToDoWatcher = takeLeading(
  todoActions.requestAddToDo,
  addToDoSaga,
);
