import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoActions } from '../slice';

const ToDoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  return (
    <form>
      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            todoActions.requestAddToDo({
              title,
              description,
            }),
          );
        }}
      >
        Add To-Do
      </button>
    </form>
  );
};

export default ToDoForm;
