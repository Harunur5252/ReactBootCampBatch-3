import { useContext } from 'react'
import { counterContext } from './context/CounterContext'

function App() {
  const context = useContext(counterContext)
  const {count,incrementCount,decrementCount,resetCount} = context

  return (
    <>
      <p>Count {count} </p>
      <button onClick={incrementCount}>Increment</button>
      <button onClick={decrementCount}>Decrement</button>
      <button onClick={resetCount}>Reset</button>
    </>
  )
}

export default App
