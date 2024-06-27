import Link from "next/link";

export default function RootPage(){
  return (
    <>
    <Link href="/authorization">Auhorization</Link><br/>
    <a href="http://localhost:3000/oauth2/authorize?client_id=app.floorp.native&redirect_uri=https%3A%2F%2Foauthdebugger.com%2Fdebug&scope=user&response_type=code&response_mode=query&state=hreau5xzz3t&nonce=zoxh5whfuu">OAuth2 Debug</a>
    </>
  )
}
