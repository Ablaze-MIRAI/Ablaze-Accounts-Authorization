import { ReactNode } from "react";

export function TitleAuth({ children }: { children: ReactNode }){
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-bold text-gray-800">{children}</h1>
    </div>
  );
};
