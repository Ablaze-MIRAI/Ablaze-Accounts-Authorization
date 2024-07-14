import { randomBytes } from "crypto";

export const generateSessionId = () => randomBytes(32).toString("hex");

export const generateRestoreToken = () => randomBytes(64).toString("hex");

export const generateOAuth2Code = () => randomBytes(32).toString("hex");

export const generateOAuth2Refresh = () => randomBytes(64).toString("hex");
