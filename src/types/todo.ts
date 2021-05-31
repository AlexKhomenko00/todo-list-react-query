export type Todo = {
  id: number;
  fields: {
    title: string;
    completed: boolean;
  };
  createdTime: Date;
};

export type AirTableResponse = {
  offset: string;
  records: Todo[];
};
