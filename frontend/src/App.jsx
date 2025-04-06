import { useState } from 'react'
import './App.css';
import Navbar from "@/page/Navbar/Navbar.jsx";
import Home from "@/page/Home/Home.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Navbar/>
        <Home/>
    </>
  )
}

export default App
