import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogout = () => {

    const {dispatch}=useAuthContext();
    axios.defaults.withCredentials=true;
    const logout=async ()=>{
        //remove user from cookie
        try{
        const response=await axios.get('http://localhost:3001/auth/logout')
        localStorage.removeItem('user');
        //update authContext
        dispatch({type:'LOGOUT'})
        }
        catch(error){
            console.error(error);
        }
        

    }

    return {logout}
}
