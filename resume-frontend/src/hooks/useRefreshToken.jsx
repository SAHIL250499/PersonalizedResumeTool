import axios from '../api/axios';
import { useAuthContext } from './useAuthContext';

const useRefreshToken = () => {
  const {dispatch}=useAuthContext();
  const refresh = async ()=>{
    const response=await axios.post('/auth/refresh',{},{
        withCredentials: true
    });
    console.log("Hello from Refresh Token");
    console.log(response)
    dispatch({type:'LOGIN',payload:response.data})
    return response?.data?.access_token;
  }

  return refresh;
}

export default useRefreshToken
