import env from "@/env"
import * as jwt from "jsonwebtoken"

export const sign = (payload: object, audience: string | string[]) =>{
  return jwt.sign(payload, env.JWS_PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: env.OAUTH2_ACCESS_TOKEN_EXP_SECONDS,
    issuer: env.JWS_ISSUER,
    subject: env.JWS_SUBJECT,
    audience: audience
  });
}
