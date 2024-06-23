export const getApplication = async (client_id: string, redirect_uri: string) =>{
  try{
    const response = await fetch("http://localhost:3000/api/oauth2/verifyapplication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: client_id,
        redirect_uri: redirect_uri
      })
    });
    const result = await response.json();
    console.log(result)
    if(!result.success) return false;
    return result.data;
  }catch(e){
    console.error(e);
    return false;
  }
}
