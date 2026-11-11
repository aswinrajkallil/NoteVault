import { useState, useEffect } from "react";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Notes from "./components/Notes/Notes";



const API_URL = import.meta.env.VITE_API_URL;


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<Notes/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
