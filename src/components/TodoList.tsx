import React from "react";

import { AirTableResponse, Todo } from "types/todo";
import TodoItem from "components/TodoItem";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useMutation,
} from "react-query";

type TodoListProps = {
  todos: Todo[];
  onNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<AirTableResponse, unknown>>;
  hasNextPage: boolean | undefined;
};

const TodoList = ({
  todos,
  onNextPage,
  hasNextPage,
}: TodoListProps): JSX.Element => {
  // const [mutateAsync ] = useMutation()
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <button onClick={() => onNextPage()} disabled={!hasNextPage}>
        {hasNextPage ? "Load more todos" : "No more to load"}
      </button>
    </>
  );
};

export default TodoList;
