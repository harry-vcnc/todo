import styles from '@root/styles/Home.module.css';
import { useDispatch } from 'react-redux';
import { todoActions, ToDoIdStatus } from '@root/to-do/slice';
import { ToDoItemType, ToDoStatus } from '@root/to-do/types';

function ToDoItem(props: ToDoItemType) {
  const dispatch = useDispatch();

  const dispatchUpdateStatus = (param: ToDoIdStatus) =>
    dispatch(todoActions.requestUpdateToDoStatus(param));
  const dispatchUpdateOpen = () =>
    dispatchUpdateStatus({ id: props.id, status: ToDoStatus.OPEN });
  const dispatchUpdateInProgress = () =>
    dispatchUpdateStatus({ id: props.id, status: ToDoStatus.IN_PROGRESS });
  const dispatchUpdateDone = () =>
    dispatchUpdateStatus({ id: props.id, status: ToDoStatus.DONE });

  const handleClickDelete = () => {
    const isDeleteConfirmed = window.confirm('삭제하시겠습니까?');
    if (isDeleteConfirmed) {
      dispatch(todoActions.requestDeleteToDo({ id: props.id }));
    }
  };

  return (
    <div className={styles.card} key={props.id}>
      <span>{props.title}</span>
      <span>{props.description}</span>
      <span>{props.status}</span>
      <div>
        <button onClick={dispatchUpdateOpen}>Open</button>
        <button onClick={dispatchUpdateInProgress}>In Progress</button>
        <button onClick={dispatchUpdateDone}>Done</button>{' '}
        <button onClick={handleClickDelete}>X</button>
      </div>
    </div>
  );
}

export default ToDoItem;
