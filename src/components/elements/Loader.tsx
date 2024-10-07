import { ReactNode } from "react";

export const Loader = ({ loading }: { loading: boolean }) =>{
  return (
    <span className={loading?"animate-spin mr-1 text-xl":"hidden"}>
      <i className="ri-loader-line"></i>
    </span>
  );
};

export const TitleLoader = ({ loading, title }: { loading: boolean, title: ReactNode }) =>{
  return (
    <div className="flex items-center">
      <div className={loading?"animate-spin mr-2 text-2xl flex items-center justify-center":"hidden"}>
        <i className="ri-loader-line"></i>
      </div>
      <h1 className="text-2xl">{title}</h1>
    </div>
  );
};

