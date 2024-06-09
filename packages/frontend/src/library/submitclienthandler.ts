"use client";

import { Result } from "@/typings/server";

type ServerFunction<T> = (data: T) => Promise<Result>;
type ClickFunction = () => void;
type SuccessFunction = (code: number) => void;
type ErrorFunction = (code: number) => void;
export const SubmitClientHandler = async <T>(data: T, server: ServerFunction<T>, click: ClickFunction, success: SuccessFunction, error: ErrorFunction): Promise<void> =>{
  click();
  try{
    const result = await server(data);
    if(!result.success) return error(result.code);
    return success(result.code);
  }catch(e){
    error(2001);
  }
}
