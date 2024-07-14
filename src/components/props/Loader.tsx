export const Loader = ({ loading }: { loading: boolean }) =>{
  return (
    <span>
      <span className={loading?"animate-spin mr-1 text-xl":"hidden"}>
        <i className="ri-loader-line"></i>
      </span>
    </span>
  );
};
