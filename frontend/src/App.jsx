import { useState } from 'react'
import './App.css'
import {Button} from "@/components/ui/button.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Button> TradeX</Button>
    </>
  )
}

export default App
