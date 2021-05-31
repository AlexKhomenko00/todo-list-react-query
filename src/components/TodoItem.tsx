import React from "react";
import { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps): JSX.Element => {
  return (
    <li className="todo-item">
      <label htmlFor={`${todo.id}`}>{todo.fields.title}</label>
      <input type="checkbox" name="completed" id={`${todo.id}`} />
      <button>Delete task</button>
    </li>
  );
};

export default TodoItem;
