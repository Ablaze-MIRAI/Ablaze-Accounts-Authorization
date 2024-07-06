export const Loader = ({ view }: { view: boolean }) =>{
  return (
    <>
      {view?(<i className="ri-loader-line animate-spin mx-2"></i>):(<></>)}
    </>
  )
}
