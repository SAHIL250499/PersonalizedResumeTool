import React from 'react'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {

const {logout}=useLogout()
  const handleClick=async ()=>{
    await logout()
  }
  return (
    <div> <nav>
    <div>
        <div>
          <button onClick={handleClick} class="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">LOG OUT</button>
        </div>
    </div>
  </nav></div>
  )
}

export default Navbar