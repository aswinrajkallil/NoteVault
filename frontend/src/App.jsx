import { useState, useEffect } from "react";



const API_URL = import.meta.env.VITE_API_URL;


function App() {
  const [message, setMessage] = useState("");
  const [note, setNote ] = useState("");


  const getMessage  = async ()=>{

    const fetchedData = await fetch(`${API_URL}`)
    const Data = await fetchedData.text()

    setMessage(Data)
  }

    useEffect(() => {
      getMessage()
    }, []);

  const handleSubmit = async ()=>{
    const response = await fetch(`${API_URL}/api/notes`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({ text: note })
      
    })
    const data = await response.json();

    console.log(data);

  }
  const inputValue = (event) =>{
    // console.log(event.target.value);
    setNote(event.target.value)
    
  }

  return (
    <div>
      {message}
      <input onChange={ inputValue }/>
      <button onClick={ handleSubmit }>Save Note</button>
      <p>{ note }</p>
    </div>
  )
}

export default App
