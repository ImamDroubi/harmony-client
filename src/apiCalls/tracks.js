import axios from "axios"

export const getUserResources = async ({queryKey})=>{
  const type = queryKey[0];
  const userId = queryKey[1]; 
  const returnValue = {
    error : undefined,
    result : undefined
  };
  try{
    const resources = await axios.get(`/${type}/user/${userId}`);
    returnValue.result = resources.data;  
    console.log(resources.data);
  }catch(error){
    const {response} = error; 
    returnValue.error = response.data.message;
  }
  return returnValue;
}