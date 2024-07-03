import { cookies } from "next/headers";

export const getUser = async () =>{
  const cookie = cookies().getAll();

  const response = await fetch("http://localhost:3000/api/user/info", {
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookie.map(v => `${v.name}=${v.value}`).join(";")
    }
  }).then(response => response.json());

  return response;
}
