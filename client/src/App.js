

import Navbar from './components/Navbar';
import { Routes,Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Ques from './components/Ques';
import Question from './pages/Question';
import UserDashboard from './pages/UserDashboard';
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import CreateTest from './pages/CreateTest';
function App() {
  return (
    <>
          <Navbar/>
          <Routes>
          <Route exact path='/' element={<><Home/></>}/>
            <Route  path='/register' element={<><Register/></>}/>
            <Route  path='/adminregister' element={<><AdminRegister/></>}/>
            <Route  path='/login' element={<><Login/></>}/>
            <Route  path='/adminlogin' element={<><AdminLogin/></>}/>
            <Route  path='/createTest' element={<><CreateTest/></>}/>
            <Route  path='/admindashboard' element={<><AdminDashboard/></>}/>
            <Route  path='/question' element={<><Ques/></>}/>
            <Route path="/test/:testId" element={<Question/>} />
            <Route path="/userdashboard" element={<UserDashboard/>} />
          </Routes>

    </>
  );
}

export default App;
