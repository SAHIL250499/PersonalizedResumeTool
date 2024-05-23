import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

const  SignUp=()=>{
    const [values,setValues]=useState({
        email:'',
        password:''
    })
    axios.defaults.withCredentials=true;
    const {signup,error,isLoading}=useSignup()

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(values.email,values.password)
        await signup(values.email,values.password)
    }

  return (
    <>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
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
        {error && <div class="show_info text-sm mb-4 w-max text-red-500">Incorrect email or password</div>}
      </div>
    </form>
  </div>
</div>
</>
  )
}

export default SignUp;