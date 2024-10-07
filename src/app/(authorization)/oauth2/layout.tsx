import { Loader } from "@/components/elements/Loader";
import type { ReactNode } from "react";
import { Suspense } from "react";

export default async function OAuth2Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Suspense fallback={(<Fallback/>)}>
      {children}
    </Suspense>
  );
}

const Fallback = () =>{
  return (
    <div>
      <h1 className="text-xl">
        <Loader loading={true}/>
        アプリケーションを読み込み中
      </h1>
    </div>
  );
};
