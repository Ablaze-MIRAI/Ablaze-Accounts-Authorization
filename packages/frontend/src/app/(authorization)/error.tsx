"use client";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error, reset: () => void }){
  return (
    <div>
      <h2>{ error.message }</h2>
      <Button variant="default" onClick={() => reset()}>再レンダリングする</Button>
    </div>
  )
}
