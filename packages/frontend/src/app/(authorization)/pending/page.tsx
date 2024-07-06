import { redirect } from "next/navigation"


export default function Pending({ searchParams }: { searchParams: { callback?: string } }){

  //if(searchParams.callback) return redirect(searchParams.callback);

  return (
    <h1>Loading...</h1>
  )
}
