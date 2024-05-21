import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from '../api/axios';

export const useSignup=()=>{
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(null)
    const {dispatch}=useAuthContext();

    const signup=async (email,password)=>{
        setIsLoading(true)
        setError(null)
        try{
        const response=await axios.post('/auth/local/register',{email,password},{
            headers: {'Content-Type':'application/json'},withCredentials: true
        })
        const json=await response?.data
        //update authContext
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

    return {signup,isLoading,error}
}