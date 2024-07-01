import { randomBytes } from "crypto";
import { v4 as UUIDv4 } from "uuid";
import * as SecurePin from "secure-pin";

export const PinGenerate = (): number => Number(SecurePin.generatePinSync(6));

export const SessionRevivalGenerate = (): string => `${UUIDv4()}-${randomBytes(64).toString("hex")}`;

export const OAuth2CodeGenerate = (): string => UUIDv4();

export const OAuth2RefreshTokenGenerate = (): string => randomBytes(64).toString("hex");
