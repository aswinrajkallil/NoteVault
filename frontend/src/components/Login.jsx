import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;



const Login = () => {
    
    const [ formData, setFormData ] = useState({
        email:"",
        password:""
    })
    const [ message, setMessage ] = useState("");

    const navigate = useNavigate();

    const handleChange = (event)=>{
        const {name,value} = event.target

        setFormData({
            ...formData,
            [name]:value
        })
    }

    const handleSubmit = async (event)=>{
        
        event.preventDefault()

        try{

            const response = await axios.post(`${API_URL}/api/login`,formData)
            
            
            if (response.status === 200) {
                
                localStorage.setItem(
                    "accessToken",
                    response.data.accessToken
                )
            }

            setMessage(response.data.message);
            navigate("/register");
        }
        catch(e){
            setMessage(e.response?.data?.message || "Something went wrong")
        }

        
        console.log(formData);
        console.log(formData.email)
        
        
    }

    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input placeholder='Enter your email' name='email' onChange={ handleChange }/><br/>
            <input placeholder='Enter your password' name='password' onChange={ handleChange }/>
            <button type='submit'>Login</button>
            <button onClick={ ()=> navigate("/register")}>Register</button>
        </form>
        <h1>{message}</h1>
    </div>
  )
}

export default Login
