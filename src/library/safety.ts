export const SafetyURI = (address: string) =>{
  if(address.startsWith("http")) return "/";
  return address;
};
