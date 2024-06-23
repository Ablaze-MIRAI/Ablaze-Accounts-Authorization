import { cookies } from "next/headers";

export const getUserInfo = async () =>{
  const cookie = cookies();
  const backendsession = cookie.get("backendsession");
  if(!backendsession) return false;
  try{
    const response = await fetch("http://localhost:3000/api/user/info", {
      method: "GET",
      headers: {
        Cookie: `backendsession=${backendsession.value};`,
        "Content-Type": "application/json"
      }
    });
    const result = await response.json();
    if(!result.success) return false;
    return result.data;
  }catch(e){
    return false;
  }
}
