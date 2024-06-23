export const Delay = async (time: number): Promise<void> => await new Promise((r, _) => setTimeout(() => r(), time));

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const OAuth2QueryValidation = (queryparams: any) =>{
  if(queryparams.response_type !== "code") return false;
  if(queryparams.scope !== "user") return false;
  if(!queryparams.client_id) return false;
  if(!queryparams.redirect_uri) return false;
  if(!queryparams.state) return false;

  return {
    client_id: queryparams.client_id,
    redirect_uri: queryparams.redirect_uri,
    state: queryparams.state
  };
}
