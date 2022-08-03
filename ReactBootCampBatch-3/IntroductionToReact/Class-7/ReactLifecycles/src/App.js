import React, { useState } from 'react'
import Counter from './Counter';


function App() {
  const [toggle,setToggle] = useState(true)

  const handleToggle = () => {
    setToggle(!toggle)   
 }

  return(
      <>
        <h3>Introduction to lifecycle hooks</h3>
        <button onClick={handleToggle}>Toggle</button>
        {toggle ? <Counter /> : <h3>Hidden component</h3>}
      </>
  )
}

export default App;
