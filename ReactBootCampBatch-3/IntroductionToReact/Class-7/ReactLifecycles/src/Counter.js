import React, { useState } from 'react'

export default function Counter() {
    const [count,setCount] = useState(0)
  
    const handleIncrement = () => {
      setCount(prevState => prevState + 1)
    }
  
    const handleDecrement = () => {
      setCount(prevState => prevState - 1)
    }
  
    const handleReset = () => {
      setCount(0)
    }
    return (
      <>
          <p>Count : {count} </p>
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleDecrement}>Decrement</button>
          <button onClick={handleReset}>Reset</button>
      </>
    );
}
