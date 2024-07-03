"use client";

import { useEffect, useState } from "react";

export const WebMessageResponse = ({ query, origin }: any) =>{
  const [status, setStatus] = useState("Processing...");

  useEffect(() =>{
    (async () =>{
      console.log("Processing...");

      const response = await fetch("/api/oauth2/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          response_type: "code",
          client_id: query.client_id,
          redirect_uri: query.redirect_uri,
          scope: "user",
          state: query.state,
          raw: true
        })
      });
      const result = await response.json();

      console.log(result);
      if(!result.success) return setStatus("ERROR");

      console.log(result.data);
      try{
        window.parent.postMessage(JSON.stringify(result.data), origin);
        return setStatus("SUCCESS");
      }catch(e){
        console.error(e);
        return setStatus("POST ERROR");
      }
    })();
  });

  return <h1>{status}</h1>;
}
