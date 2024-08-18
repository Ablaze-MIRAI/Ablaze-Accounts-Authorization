import { ToTopage } from "./ToToppage";

export function UnknownError(){
  return (
    <div className="space-y-2">
      <h1 className="text-2xl text-red-500 font-bold">エラーが発生しました</h1>
      <ToTopage/>
    </div>
  );
}
