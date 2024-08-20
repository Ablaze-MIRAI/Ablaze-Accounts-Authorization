"use client";

import { useSuperFormActionState } from "@/library/useaction";

export default function ContentTest(){
  const { handleSubmit, pending, event } = useSuperFormActionState(() =>{ console.log("Server Action Mock"); return "sv resp"; });

  return (
    <div className="pt-24">
    <h1>{pending?"PENDING":"NOT PENDING"}</h1>
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="text" name="b1" className="border-2 border-violet-300" />
      <button type="submit">送信</button>
    </form>
    </div>
  );
}
