import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin=()=>{
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(null)
    const {dispatch}=useAuthContext();
    axios.defaults.withCredentials=true;

    const login=async (email,password)=>{
        setIsLoading(true)
        setError(null)
        try{
        const response=await axios.post('http://localhost:3001/auth/login',{email,password})
        const json=await response.data
        //update authContext
        if(json){
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type:'LOGIN',payload:json})
            setIsLoading(false);

        }
        }
        catch(error){
            setIsLoading(false)
            setError(error.message)
        }

    }

    return {login,isLoading,error}
}