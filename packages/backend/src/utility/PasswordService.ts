import bcrypt from "bcrypt";

const HASH_SALT = 10;

export const Hash = async (password: string): Promise<string> =>{
  return await bcrypt.hash(password, HASH_SALT);
}

export const CompareHash = async (password: string, hashed: string): Promise<boolean> =>
  bcrypt.compare(password, hashed);
