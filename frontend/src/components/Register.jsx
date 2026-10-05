import React, { useState } from 'react'

const Register = () => {
    const [name, setName ] = useState("");

    const handleName  = (event)=>{
        console.log(event.target.value);
        

    }

  return (
    <div>
      <input onClick={ handleName } placeholder='Enter your Username' type='string' />
      <input onClick={ handleEmail }placeholder='Enter your email' type='email' />
      <input onClick={ handlePassword }placeholder='Enter your password' type='password'/>
      <button onClick={ handleSubmit }>Submit</button>
    </div>
  )
}

export default Register
