import React, { useEffect, useState } from 'react'

export default function Counter() {
    const [count,setCount] = useState(0)


   // React lifecycle hooks. joto bar khusi declare kora jai.
   // As Mounting,Updating,Unmounting it's called. so, we can control it some way.
   // 1) we can set [] empty array for initial mounting state.
   // 1) we can set [] empty array for initial mounting state.
   // 1) we can set [] empty array for initial mounting state.
   

   // 1) initial mounting one call
    // useEffect(() => {
    //    console.log('Hello From Lifecycle Hooks')
    // },[])


    // 2) initial mounting one call and updating stage call and set dependency in [] empty array
    // useEffect(() => {
    //     console.log('Hello From Lifecycle Hooks',count)
    //  },[count]) 


    // 3) unmounting stage call and long running action to stop
    useEffect(() => {
      console.log('Hello From Lifecycle Hooks',count)
      const timer = setInterval(() => {
         setCount(count + 1)
      },1000)

      return () => {
        clearInterval(timer)
      }
    },[count]) 
  

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
