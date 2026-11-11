import React, { useState } from 'react'
const API_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';

const Register = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event)=>{

        event.preventDefault();
        setMessage("")

        try{

            const response = await axios.post(`${API_URL}/api/register`,formData)
             setMessage(response.data.message);
            
    
        }catch(e){
            setMessage(e.response?.data?.message || "Something went wrong");   
        }
  
        
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            
            <input
                name="username"
                onChange={handleChange}
                placeholder="Enter your Username"
            /><br/>

            <input
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
                type="email"
            /><br/>
   
            <input
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                type="password"
            /><br/>

            <button type="submit">
                Submit
            </button>
        </form>


        <h4>{message}</h4>
    </div>
)
}

export default Register
