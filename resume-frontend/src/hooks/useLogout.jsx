import { useAuthContext } from "./useAuthContext";
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export const useLogout = () => {

    const {dispatch}=useAuthContext();
    const axiosPrivate = useAxiosPrivate();
    const logout=async ()=>{
        //remove user from cookie
        try{
        const response=await axiosPrivate.post('/auth/logout');
        //update authContext
        dispatch({type:'LOGOUT'})
        }
        catch(error){
            console.error(error);
        }
        

    }

    return {logout}
}
