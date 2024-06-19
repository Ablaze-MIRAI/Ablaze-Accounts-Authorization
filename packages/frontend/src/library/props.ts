export const Delay = async (time: number): Promise<void> => await new Promise((r, _) => setTimeout(() => r(), time));
