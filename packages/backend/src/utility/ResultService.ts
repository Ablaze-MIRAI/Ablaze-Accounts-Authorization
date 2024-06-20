import { Result, ResultWithData } from "@/typings/result";

export const ResultSuccess = (code: number): Result =>{
  return {
    success: true,
    code: code
  }
}

export const ResultSuccessWithData = <T = object>(code: number, data: T): ResultWithData<T> =>{
  return {
    success: true,
    code: code,
    data: data
  }
};

export const ResultFaild = (code: number): Result =>{
  return {
    success: false,
    code: code
  }
}
