import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import Loader from './Loader';

const  SignUp=()=>{
    const [values,setValues]=useState({
        email:'',
        password:''
    })
    axios.defaults.withCredentials=true;
    const {signup,error,isLoading}=useSignup()

    const handleSubmit=async (e)=>{
        e.preventDefault();
        await signup(values.email,values.password)
    }

  return (
    <>
    {/* <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up to your account</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" onChange={e=>setValues({...values,email:e.target.value})}  autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
  
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" onChange={e=>setValues({...values,password:e.target.value})} autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div class="text-sm">
          <Link to="/" class="font-semibold text-indigo-600 hover:text-indigo-500">Already Registered ? Sign In</Link>
        </div>
        <div>
          <button disabled={isLoading} type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
          {error && <div class="show_info text-sm mb-4 w-max text-red-500">Email Already exists</div>}
        </div>
      </form>
    </div>
  </div> */}
    {isLoading?(<Loader/>):(
      <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div class="w-full">
                <div class="text-center">
                    <h1 class="text-3xl font-semibold text-gray-900">Sign Up</h1>
                </div>
                <div class="mt-5">
                    <form  onSubmit={handleSubmit}>
                        <div class="relative mt-6">
                            <input type="email" name="email" id="email" placeholder="Email Address"  onChange={e=>setValues({...values,email:e.target.value})} class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autocomplete="NA" />
                            <label for="email" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                        </div>
                        <div class="relative mt-6">
                            <input type="password" name="password" id="password" placeholder="Password" onChange={e=>setValues({...values,password:e.target.value})} class="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                            <label for="password" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                        </div>
                        <div class="my-6">
                            <button disabled={isLoading} type="submit" class="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Sign up</button>
                            {error && <div class="show_info text-sm mb-4 w-max text-red-500">Email already exists</div>}
                        </div>
                        <p class="text-center text-sm text-gray-500">Already Registered ?
                            <Link to="/"
                                class="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign
                                In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
      </div>
    )} 
    
</>
  )
}

export default SignUp;