import {useState} from 'react';
import IsOddOrEven from './IsOddOrEven';
import RandomCard from './RandomCard';


// Must have remembered(jsx rules)
// 1) must have closing.
// 2) must have one parent.
// 3) must be careful of javaScript reserved keyword.
// 4) dynamic value(expression) must be written in { }.


// React events 
// 1) React create an extra layer on javaScript that is called synthetic event.


//onClick={handleIncrement()} events we can call just reference not call in (). If we can this () after function then it's called automatically.


// If a value is change/update in react then we can use state(useState()). Then automatically will re-render.
// useState() give an array. and receive 2 argument one is initial value then initial value is change the second argument that is a function.


// when re-renders
// 1) state update
// 2) props change
// 3) force update


// CSS Styling 
// 1) inline css
// 2) external css
// 3) module css
// 4) component base css


// child component can data send to parent component and parent can only change that data. but child component data can't change.

function App() {
  const [count,setCount] = useState(0)
  const cardValues = [30,23,98,55]
  const [pickedValue,setPickedValue] = useState(null)

  // pickedValue is change by setPickedValue().
  const myPickedValueFunction = (num)=>{
    setPickedValue(num)
  }

  const handleIncrement = (num) => {
    setCount((prevCount) => prevCount + num) // here prevCount  value means count value.
  }

  const handleDecrement = (num) => {
    setCount((prevCount) => prevCount - num)
  }

  const handleReset = () => {
    setCount(0)
  }
  
  return (
    <>
      <div className="container">
        <h2>Count : {count} </h2>
        <button onClick={() => handleIncrement(1)}>Increment</button>
        <button onClick={() => handleDecrement(1)}>Decrement</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <IsOddOrEven count={count} pickedValue={pickedValue} />
      <RandomCard cardValues={cardValues}  setPickedValue={myPickedValueFunction} />
    </>
  );
}


export default App;
