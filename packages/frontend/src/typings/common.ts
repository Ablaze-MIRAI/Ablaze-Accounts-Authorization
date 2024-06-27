export type Result<T = undefined> = {
  status: "success" | "failure",
  code: number,
  data?: T
};
