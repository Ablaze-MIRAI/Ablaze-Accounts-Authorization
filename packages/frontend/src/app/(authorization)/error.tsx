"use client";

export default function Error({ error, reset }: { error: Error, reset: () => void }){
  return (
    <div>
      <h2>{ error.message }</h2>
      <button onClick={() => reset()}>再レンダリングする</button>
    </div>
  )
}
