import * as SecurePin from "secure-pin";
import { v4 as UUIDv4 } from "uuid";
import { randomBytes } from "crypto";

export const PinGenerate = (): number => Number(SecurePin.generatePinSync(6));

export const OAuth2CodeGenerate = (): string => UUIDv4();

export const OAuth2RefreshTokenGenerate = (): string => randomBytes(64).toString("hex");
