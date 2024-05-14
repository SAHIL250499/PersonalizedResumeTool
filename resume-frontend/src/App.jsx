import React from 'react'
import Login from './components/Login'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Resume from './Resume';
import SignUp from './components/SignUp';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user}=useAuthContext();
  return (
    <BrowserRouter>
        <Routes>
          <Route  path="/" element={!user?<Login/>:<Navigate to="/resume"/>}></Route>
          <Route path="/signup" element={!user?<SignUp/>:<Navigate to="/resume"/>}></Route>
          <Route path='/resume' element={user?<Resume/>:<Navigate to="/"/>}></Route>
  
        </Routes>
    </BrowserRouter>
  );
}

export default App;
