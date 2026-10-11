import React, { useState } from 'react'
import { useEffect } from 'react'
import NoteList from './NoteList'

const API_URL = import.meta.env.VITE_API_URL

const Notes = () => {
    const accessToken = localStorage.getItem("accessToken")
    const [content,setContent ] = useState([]);

    const getNotes = async ()=>{

        const response = await fetch(`${API_URL}/api/notes`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
        })

        const data = await response.json()

        setContent(data)



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
