import React, { useState } from 'react'
const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
    const [username, setName ] = useState("");
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");

    const handleName  = (event)=>{

        setName(event.target.value)
    }
    const handleEmail  = (event)=>{

        setEmail(event.target.value)
    }
    const handlePassword  = (event)=>{

        setPassword(event.target.value)
    }

    const handleSubmit = async (event)=>{

        event.preventDefault();

        const response = await fetch(`${API_URL}/api/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({ username, email, password})
        })

        const data = await response.json();

        console.log(data);
        
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            
            <input
                onChange={handleName}
                placeholder="Enter your Username"
            /><br/>

            <input
                onChange={handleEmail}
                placeholder="Enter your email"
                type="email"
            /><br/>

            <input
                onChange={handlePassword}
                placeholder="Enter your password"
                type="password"
            /><br/>

            <button type="submit">
                Submit
            </button>
        </form>
    </div>
)
}

export default Register
