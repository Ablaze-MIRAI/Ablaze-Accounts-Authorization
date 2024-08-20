import { ProcessingState } from "@/store/state/processing";
import { useSetAtom } from "jotai";
import { useEffect, useRef } from "react";

export const useMount = (effect: () => Promise<void>) =>{
  const isMounted = useRef(false);
  return useEffect(() =>{
    if(isMounted.current) return;
    (async () =>{
      await effect();
    })();
    isMounted.current = true;
  }, [effect]);
};

export const useMountWS = (effect: () => Promise<void>) =>{
  const setProcess = useSetAtom(ProcessingState);

  return useMount(async () =>{
    setProcess(true);
    await effect();
    setProcess(false);
  });
};

export const useProcess = (callback: () => Promise<void>) =>{
  const setProcess = useSetAtom(ProcessingState);
  return async () =>{
    setProcess(true);
    const result = await callback();
    setProcess(false);
    return result;
  };
};
