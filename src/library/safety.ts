import { createHash } from "crypto";

export const SafetyURI = (address: string) =>{
  if(address.startsWith("http")) return "/";
  return address;
};

export const TokenHash = (token: string) =>{
  const hash = createHash("sha256");
  hash.update(token);
  return hash.digest("hex");
};
