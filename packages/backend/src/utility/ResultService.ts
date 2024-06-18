import { Result } from "@/typings/result";

export const ResultSuccess = (status: number): Result =>{
  return {
    success: true,
    status: status
  }
}

export const ResultFaild = (status: number): Result =>{
  return {
    success: false,
    status: status
  }
}
