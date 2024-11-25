import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import Loader from './Loader';

const  Login=()=>{
    const [values,setValues]=useState({
        email:'',
        password:''
    })
    
    const {login,error,isLoading}=useLogin();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        await login(values.email,values.password)
        
    }

  return (
    <>
    {isLoading?(
      <Loader/>
    ):(
      <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
      <div class="w-full">
          <div class="text-center">
              <h1 class="text-3xl font-semibold text-gray-900">Sign in</h1>
              <p class="mt-2 text-gray-500">Sign in below to access your account</p>
          </div>
          <div class="mt-5">
              <form  onSubmit={handleSubmit}>
                  <div class="relative mt-6">
                      <input type="email" name="email" id="email" placeholder="Email Address" onChange={e=>setValues({...values,email:e.target.value})} class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autocomplete="NA" />
                      <label for="email" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                  </div>
                  <div class="relative mt-6">
                      <input type="password" name="password" id="password" placeholder="Password" onChange={e=>setValues({...values,password:e.target.value})} class="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                      <label for="password" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                  </div>
                  <div class="my-6">
                      <button disabled={isLoading} type="submit" class="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Sign in</button>
                      {error && <div class="show_info text-sm mb-4 w-max text-red-500">Incorrect email or password</div>}
                  </div>
                  <p class="text-center text-sm text-gray-500">Don&#x27;t have an account yet?
                      <Link to="/signup"
                          class="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign
                          up
                      </Link>
                  </p>
                  <div className='pt-5 text-center'>email: test@gmail.com && password: 123456 </div>
              </form>
          </div>
      </div>
  </div>
    )}
    
</>
  )
}

export default Login;




