"use client";

import { useEffect } from "react";
import { startAuthorize } from "./actions";

let ignore = false;
export default function SigninGitHubPage(){
  useEffect(() =>{
    if(ignore) return; else ignore = true;
    startAuthorize();
  });

  return (
    <h1 className="text-2xl">Loading...</h1>
  );
}
