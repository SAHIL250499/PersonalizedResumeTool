import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate, Outlet } from 'react-router-dom'
const ProtectedRoute = () => {
    const {user}=useAuthContext()
    console.log(user);
    return user?<Outlet/>:<Navigate to='/login'/>
}

export default ProtectedRoute