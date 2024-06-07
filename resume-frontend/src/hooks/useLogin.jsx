import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from '../api/axios';

const LOGIN_URL='/auth/local/login';

export const useLogin=()=>{
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const {dispatch}=useAuthContext();

    const login=async (email,password)=>{
        setIsLoading(true)
        setError(null)
        try{
        const response=await axios.post(LOGIN_URL,{email,password},{
            headers: {'Content-Type':'application/json'},
            withCredentials: true
        })
        const json=await response?.data
        if(json){
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