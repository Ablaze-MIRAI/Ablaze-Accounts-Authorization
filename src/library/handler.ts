export const gle = (func: Function)  =>{
  try{
    const result = func();
    return [result, undefined];
  }catch(e){

  }
};
