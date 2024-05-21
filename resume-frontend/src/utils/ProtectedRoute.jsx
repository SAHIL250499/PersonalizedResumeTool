import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import {useLocation, Navigate, Outlet } from 'react-router-dom'
const ProtectedRoute = () => {
    const {user}=useAuthContext();
    const location = useLocation();
    return (user?<Outlet/>:<Navigate to="/"/>)
}

export default ProtectedRoute