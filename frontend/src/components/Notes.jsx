import React from 'react'
import { useEffect } from 'react'
const API_URL = import.meta.env.VITE_API_URL

const Notes = () => {
    const accessToken = localStorage.getItem("accessToken")

    const getNotes = async ()=>{
        const response = await fetch(`${API_URL}/api/notes`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
        })

        const data = await response.json()

    }
    useEffect(()=>{
        getNotes()

    },[])
  return (
    <div>
      
    </div>
  )
}

export default Notes
