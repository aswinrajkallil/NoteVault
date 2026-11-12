import React, { useState } from 'react'
import { useEffect } from 'react'
import NoteList from './NoteList'
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

const Notes = () => {
  const [content,setContent ] = useState([]);
  
  const getNotes = async ()=>{
    try{
        const accessToken = localStorage.getItem("accessToken")
        const response = await axios.get(`${API_URL}/api/admin/notes`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }});
  
        setContent(response.data.data)
      }
      catch(e){
        console.log(e.response?.data?.message || "something went wrong");
      }}
      useEffect(()=>{
          getNotes()

      },[])
  return (
    <div>
      {content.map((note) => (
      <div key={note._id}>
        <h3>{note.heading}</h3>
        <p>{note.content}</p>
      </div>
    ))}
    {/* <NoteList notes={content} /> */}
    </div>
  )
}

export default Notes
