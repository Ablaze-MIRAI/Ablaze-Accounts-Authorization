export const WebMessageResponse = ({ code, redirecturi }: { code: string, redirecturi: string }) =>{
  return (
    <div>
      <h1>Web Message</h1>
      <p>{redirecturi}</p>
      <p>{code}</p>
    </div>
  );
};
