// amra context nia kaj korte gele duita kaj kora lage
// 1) create a context 
// 2) create a provider

import { createContext,useReducer } from "react";
import { INCREMENT,DECREMENT,RESETCOUNT } from "./actions";
import { countReducer } from "./countReducer";

// 1) create a context(joto bar khusi create kora ja). kunu akta jiniser perspective a kotha bolake context bole.jemon aikhane count ar perspective a bola
export const counterContext  = createContext()


// action creator(use in Redux)
// function increment(dispatch,num){
//   // dispatch means trigger event or raise event or make event
//   return dispatch({type:INCREMENT,payload : num})
// }




// 2) create a provider(provide data for count)
export const CountProvider = ({children}) => {

    const initialState = 0
  
  // useReducer is one kind of hook that take a function and initialState and on that function we can update data. when needed to multiple action on a single value and all works we can do in one function then use useReducer hook.
  const [count,dispatch] = useReducer(countReducer,initialState)

  const incrementCount = () => {
    //  increment(dispatch,2)

    dispatch({type:INCREMENT,payload : 1})
  }

  const decrementCount = () => {
    dispatch({type:DECREMENT,payload : 1})
 }

 const resetCount = () => {
  dispatch({type:RESETCOUNT})
}

   // but a provider a amra aksathe multiple object,function,array,or multiple data pathaite parbo nah. sudu singel data type pathiate parbo . ar jodi multiple data pathiatei hoi tahole array or object create kore then pathabo.
   return (
     <counterContext.Provider value={{incrementCount,decrementCount,resetCount,count}}>
          {children}
     </counterContext.Provider>
   )
}