import "server-only";
import * as jwt from "jsonwebtoken";
import environment from "@/environment";
import { readFileSync } from "fs";

const PrivateKey = readFileSync(environment.OIDC_JWS_PRIVATE_KEY_PATH);
const PublicKey = readFileSync(environment.OIDC_JWS_PUBLIC_KEY_PATH);

export type UserJWTPayload = {
  name: string,
  avatar: string,
  role: string
};

export const signToken = (payload: UserJWTPayload, uid: string, audience: string | string[]): string =>{
  return jwt.sign(payload, PrivateKey, {
    algorithm: "RS256",
    issuer: environment.OIDC_JWT_ISSUER,
    expiresIn: environment.OIDC_JWS_EXPIRES,
    audience: audience,
    subject: `${environment.OIDC_JWT_SUBJECT_PREFIX}#${uid}`,
  });
};

// ToDo: JWT Verify
/*export const verifyToken = (token: string) =>{
  return jwt.verify(token, environment.OIDC_JWS_PUBLIC_KEY, {
    audience: ""
  });
};*/
