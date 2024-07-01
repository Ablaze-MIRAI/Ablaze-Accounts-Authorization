export const Delay = async (time: number): Promise<void> => await new Promise((r, _) => setTimeout(() => r(), time));

export const DaysAgo = (days: number): Date =>{
  const date = new Date();
  date.setDate(days);
  return date;
}

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
