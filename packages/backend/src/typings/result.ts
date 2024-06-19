export type Result = {
  success: boolean,
  code: number,
};

export type ResultWithData<T> = {
  success: boolean,
  code: number,
  data: T
};
