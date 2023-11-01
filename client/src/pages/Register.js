//import { set } from 'mongoose'
import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'

import "./login.css"
const Register = () => {
  const navigate = useNavigate()
   const [username, setName] = useState("")
   const [email, setEmail] = useState("")
   
   const [password, setPassword] = useState("")
  
  const handleChange =(e)=>{
   if(e.target.name==="name"){
      setName(e.target.value)
      console.log(e.target.value)
   }
   if(e.target.name==="email"){
    setEmail(e.target.value)
    console.log(e.target.value)
  }
  if(e.target.name==="password"){
    setPassword(e.target.value)
    console.log(e.target.value)
  }


  }
  const handleSubmit=async (e)=>{
    e.preventDefault();

    const user = {username,email,password};
    const res = await fetch("http://localhost:5000/user/register",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },

      body:JSON.stringify(user)
    });
    const data = await res.json()
    console.log(data)
    if(data.status === 422 || !data){
          window.alert("Invalid registration")
          console.log("Invalid registration")
    }else{
      window.alert(" registration successful")
          console.log("Invalid successful")
          setName('')
          setEmail('')
          setPassword('')
       
        navigate("/login")
    }
 }
  return (
    <>
      <div className='App'>

      
<form className="form">
  <div className="input-container">
    <label className="label">Username: </label>
    <input
      type="text"
      name="name"
      className="input"
      onChange={handleChange}
      value={username}
      placeholder="Username"
      
    />
  </div>
  <div className="input-container">
    <label className="label">Email: </label>
    <input
      type="text"
      name="email"
      className="input"
      onChange={handleChange}
      value={email}
      placeholder="Username"
     
    />
  </div>

  <div className="input-container">
    <label className="label">Password: </label>
    <input
      type="password"
      name="password"
      className="input"
      onChange={handleChange}
      value={password}
      placeholder="Username"
      
    />
  </div>
  
  <button onClick={handleSubmit} type="submit" id="login-btn">
    Signup
  </button>
</form>
<div className='mt-10'>
  <h6 className='font font-poppins text-gray-300'>Already have an account?<a href="/login"><span className='text-pink-300 cursor-pointer'>Log In</span></a> </h6>
</div>
</div>
    </>
  )
}

export default Register