import { Result } from "@/typings/common";

export const ResultSuccess = <T>(code: number, data?: T): Result<T> =>{
  return { status: "success", code: code, data: data };
}

export const ResultFailure = <T>(code: number, data?: T): Result<T> =>{
  return { status: "failure", code: code, data: data };
}
