import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;



const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async ()=>{
        const response = await fetch(`${API_URL}/api/login`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({ email, password })
      
    })
        const data = await response.json();


        localStorage.setItem(
            "accessToken",
            data.accessToken
        )
        console.log(data);

        console.log(email);
        
        
    }

    const handleEmail = (event)=>{
        setEmail(event.target.value);
        
    }

    const handlePassword = (event)=>{
        setPassword(event.target.value);
    }
    
  return (
    <div>
      <input placeholder='Enter your email' onChange={ handleEmail }/><br/>
      <input placeholder='Enter your password' onChange={ handlePassword }/>
      <button onClick={ handleSubmit }>Login</button>
      <button onClick={ ()=> navigate("/register")}>Register</button>
    </div>
  )
}

export default Login
