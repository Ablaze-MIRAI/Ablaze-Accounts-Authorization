"use client";

import { Result } from "@/typings/server";

type ServerFunction<T> = (data: T) => Promise<Result>;
type ClickFunction = () => Promise<void>;
type SuccessFunction = (code: number) => Promise<void>;
type ErrorFunction = (code: number) => Promise<void>;
export const SubmitClientHandler = async <T>(data: T, server: ServerFunction<T>, click: ClickFunction, success: SuccessFunction, error: ErrorFunction): Promise<void> =>{
  await click();
  try{
    const result = await server(data);
    if(!result.success) return await error(result.code);
    return await success(result.code);
  }catch(e){
    await error(2001);
  }
}
