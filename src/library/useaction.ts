"use client";

import { FormEvent, useState } from "react";

export const useSuperFormActionState = (action: Function): { handleSubmit: Function, pending: boolean, event: Function } =>{
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent) =>{
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    console.log("HANDLE");
    formData.forEach((v) =>{
      console.log(v);
    });

    await action();
  };

  return { handleSubmit, pending, event: () =>{} };
};
