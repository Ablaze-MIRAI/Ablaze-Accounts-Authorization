import { Result } from "@/typings/result";

export const ResultSuccess = (code: number): Result =>{
  return {
    success: true,
    code: code
  }
}

export const ResultFaild = (code: number): Result =>{
  return {
    success: false,
    code: code
  }
}
