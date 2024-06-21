import * as SecurePin from "secure-pin";

export const PinGenerate = (): number => Number(SecurePin.generatePinSync(6));
