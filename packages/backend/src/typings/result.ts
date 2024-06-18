export type Result = {
  success: boolean,
  status: number,
};

export type ResultWithData<T> = {
  success: boolean,
  status: number,
  data: T
};
