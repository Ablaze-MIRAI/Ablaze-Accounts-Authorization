"use client";

import { useEffect } from "react";

export const SelfXSSWarning = () =>{
  useEffect(() =>{
    if(process.env.NODE_ENV === "development") return;

    console.log(
      "%c警告/Warning",
      "color: red; font-size: 2rem; background-color: yellow;");
    console.log(
      "%cここを操作したり何かを貼り付けることは、Self-XSSと呼ばれる攻撃を受ける可能性があります。",
      "color: red; font-size: 1.5rem; background-color: yellow;");
  });

  return <></>;
};
