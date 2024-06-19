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
    if(!result.success) {
      console.error(result);
      return error(result.code)
    };
    return success(result.code);
  }catch(e){
    console.error(e);
    error(2002);
  }
}
