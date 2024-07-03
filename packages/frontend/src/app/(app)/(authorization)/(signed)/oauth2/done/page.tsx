"use client";

export default function OAuth2Done({ searchParams }: { searchParams: { [key:string]: string } }){
  const redirect_to = window.atob(searchParams.to);

  return (
    <div>
      <a href={redirect_to} target="_blank">{redirect_to}</a>
    </div>
  )
}
