import React, { useState } from 'react'
import { useEffect } from 'react'
import NoteList from './NoteList'
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

const Notes = () => {
  try{

      const accessToken = localStorage.getItem("accessToken")
      const [content,setContent ] = useState([]);

      const getNotes = async ()=>{

      const response = await axios.get(`${API_URL}/api/notes`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
      });

          
      setContent(response.data)
    }

    }catch(e){
      console.log(error.response?.data?.message || "something went wrong");
    }
    useEffect(()=>{
        getNotes()

    },[])
  return (
    <div>
      {content.map((note) => (
      <div key={note._id}>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </div>
    ))}
    <NoteList notes={content} />
    </div>
  )
}

export default Notes
