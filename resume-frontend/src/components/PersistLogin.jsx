import {Outlet} from 'react-router-dom';
import { useState,useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import { useAuthContext } from '../hooks/useAuthContext';



const PersistLogin = () =>{
    const [isLoading,setIsLoading] =useState(true);
    const refresh = useRefreshToken();
    const {user} = useAuthContext();

    useEffect(()=>{
        const verifyRefreshToken = async () => {
            try{
                await refresh();
            }
            catch (err){
                console.error(err);
            }
            finally{
                setIsLoading(false);
            }
        }

        !user?.access_token ? verifyRefreshToken() : setIsLoading(false);
    },[])

    return (
        <>
        {isLoading ? <p>Loading ...</p>:<Outlet/>}
        </>
    )
}

export default PersistLogin;