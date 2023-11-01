import React ,{useState} from 'react'
import {  useNavigate} from 'react-router-dom'
//import { background } from '../assets';
import { useAuth } from '../context/AuthContext'
import "./login.css"
const AdminLogin = () => {
  const { adminlogin } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    // other registration fields
  });
  
  const handleSubmit=async (e)=>{
    e.preventDefault()
          console.log(formData)
    await adminlogin(formData);
    navigate("/")
  }
  return (
    <>
      <div className='App'>

      
      <form type="POST" className="form" >
        <div className="input-container">
          <label className="label">email: </label>
          <input
            type="text"
            name="email"
            className="input"
            placeholder="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="input-container">
          <label className="label">Password: </label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <a href="/" className="link forgotten-password">
            Forgot password?
          </a>
        </div>
        <button onClick={handleSubmit} type="submit" id="login-btn">
          Login
        </button>
      </form>
      <div className='mt-10'>
        <h6 className='font font-poppins text-gray-300'>Dont have an account?<a href="/adminregister"><span className='text-pink-300 cursor-pointer'>Sign Up</span></a> </h6>
      </div>
      </div>
    </>
  )
}

export default AdminLogin