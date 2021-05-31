import React, { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";

import { addTodo } from "api/todos";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null!);

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isError, error } = useMutation(addTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    mutateAsync(ref.current.value);

    ref.current.value = "";
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="addTodo">Enter new todo</label>
      <input type="text" ref={ref} id="addTodo" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Processing..." : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
