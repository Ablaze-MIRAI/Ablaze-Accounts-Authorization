import Link from "next/link";

export default function RootPage(){
  return (
    <>
    <a href="/account">Account</a><br/>
    <a href="/signin?callback=P2NsaWVudF9pZD1hcHAuZmxvb3JwLm5hdGl2ZSZyZWRpcmVjdF91cmk9aHR0cHMlM0ElMkYlMkZvYXV0aGRlYnVnZ2VyLmNvbSUyRmRlYnVnJnNjb3BlPXVzZXImcmVzcG9uc2VfdHlwZT1jb2RlJnJlc3BvbnNlX21vZGU9cXVlcnkmc3RhdGU9aHJlYXU1eHp6M3Qmbm9uY2U9em94aDV3aGZ1dQ==">Signin With Callback</a><br/>
    <a href="http://localhost:3000/oauth2/authorize?client_id=app.floorp.native&redirect_uri=https%3A%2F%2Foauthdebugger.com%2Fdebug&scope=user&response_type=code&response_mode=query&state=hreau5xzz3t&nonce=zoxh5whfuu">OAuth2 Debug</a>
    </>
  )
}
