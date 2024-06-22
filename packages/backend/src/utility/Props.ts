export const DaysAgo = (days: number): Date =>{
  const date = new Date();
  date.setDate(days);
  return date;
}

export const MinAgo = (min: number): Date =>{
  const date = new Date();
  date.setMinutes(min);
  return date;
}

const ACCEPT_LANGUAGES = ["en", "ja"];
export const AcceptLanguage = (lang: string) =>{
  if(ACCEPT_LANGUAGES.includes(lang)) return lang;
  return "en";
}
