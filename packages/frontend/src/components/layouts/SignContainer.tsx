export const SignContainer = ({ title, children }: { title: string, children: React.ReactNode }) =>{
  return (
    <>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>
      {children}
    </>
  )
}
