import type { ReactNode } from "react";

export const SignTitle = ({ title }: { title: string }) =>{
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    </div>
  );
};
