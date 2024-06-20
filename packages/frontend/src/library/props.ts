export const Delay = async (time: number): Promise<void> => await new Promise((r, _) => setTimeout(() => r(), time));

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
