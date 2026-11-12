import React from 'react'

const NoteList = () => {


  
  const getNote = () => {
    
      const response = await axios.get(
      `${API_URL}/api/notes/${noteId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
  }
  



  return (
    <div>

      <button onClick={getNote}>Notes</button>
    </div>
  )
}

export default NoteList
