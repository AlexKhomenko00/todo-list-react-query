import { QueryFunction } from "react-query";
import { AirTableResponse, Todo } from "../types/todo";

const AUTHORIZATION_HEADER = process.env.REACT_APP_API_KEY || "";
const BASE_URL = "https://api.airtable.com/v0/app8Cc6HeK1ZkmFYK/Table%201";

export const getAllTodos = async ({
  pageParam: offset,
}: // TODO: Define type for offset
any): Promise<AirTableResponse> => {
  const url = offset
    ? `${BASE_URL}?pageSize=2&offset=${offset}`
    : `${BASE_URL}?pageSize=2`;
  try {
    const res = await fetch(url + "&sort%5B0%5D%5Bfield%5D=title", {
      headers: {
        Authorization: `Bearer ${AUTHORIZATION_HEADER}`,
      },
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }

    const data: AirTableResponse = await res.json();

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const addTodo = async (title: string) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AUTHORIZATION_HEADER}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          title,
        },
      }),
    });

    const data: Todo = await res.json();

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const toggleCompleted = async (id: number, completed: boolean) => {
  try {
    const res = await fetch(BASE_URL + `/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AUTHORIZATION_HEADER}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          completed,
        },
      }),
    });
    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const deleteTodo = async (id: number) => {
  try {
    const res = await fetch(BASE_URL + `/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AUTHORIZATION_HEADER}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
