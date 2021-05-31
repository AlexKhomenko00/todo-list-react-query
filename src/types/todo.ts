export type Todo = {
  id: number;
  fields: {
    title: string;
  };
  createdTime: Date;
};

export type AirTableResponse = {
  offset: string;
  records: Todo[];
};
