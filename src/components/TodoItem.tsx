import { toggleCompleted } from "api/todos";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps): JSX.Element => {
  const queryClient = useQueryClient();
  const { mutateAsync: mutateCompleted } = useMutation(
    () => toggleCompleted(todo.id, !todo.fields.completed),
    {
      onMutate: () => {
        const prevTodos: Todo[] | undefined = queryClient.getQueryData("todos");
        queryClient.setQueryData("todos", prevTodos);
        return prevTodos;
      },
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
      onError: (prevTodos: Todo[] | undefined) => {
        queryClient.setQueriesData("tods", prevTodos);
      },
    }
  );

  return (
    <li className="todo-item">
      <label htmlFor={`${todo.id}`}>{todo.fields.title}</label>
      <input
        type="checkbox"
        onChange={() => mutateCompleted()}
        defaultChecked={todo.fields.completed}
        name="completed"
        id={`${todo.id}`}
      />
      <button>Delete task</button>
    </li>
  );
};

export default TodoItem;
