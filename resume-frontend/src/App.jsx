import Login from './components/Login'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Resume from './Resume';
import SignUp from './components/SignUp';
import { useAuthContext } from './hooks/useAuthContext';
import PersistLogin from './components/PersistLogin';

const App=() => {
  const { user}=useAuthContext();

  return (
    <BrowserRouter>
        <Routes>
          <Route  path="/" element={user?<Navigate to="/resume"/>:<Login/>}></Route>
          <Route path="/signup" element={user?<Navigate to="/resume"/>:<SignUp/>}></Route>
          <Route element={<PersistLogin/>}>
              <Route path='/resume' element={user?<Resume/>:<Navigate to="/"/>}></Route>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
