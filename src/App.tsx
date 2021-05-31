import React from "react";
import { useInfiniteQuery } from "react-query";

import { Todo } from "types/todo";

import { getAllTodos } from "api/todos";

import TodoList from "components/TodoList";
import TodoForm from "components/TodoForm";

const App: React.FC = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery("todos", getAllTodos, {
      getNextPageParam: (lastPage) => lastPage.offset,
    });

  if (isLoading)
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="error">
        <p>Oops...something went worng. Please try again later</p>
      </div>
    );

  const allTodos = data
    ? data.pages.reduce((acc, page) => [...acc, ...page.records], [] as Todo[])
    : ([] as Todo[]);

  return (
    <div className="App">
      <TodoForm />
      <TodoList
        todos={allTodos}
        onNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default App;
