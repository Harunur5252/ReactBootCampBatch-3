import { INCREMENT,DECREMENT,RESETCOUNT } from "./actions";

export const countReducer = (state,action) => {
    // action means an event
    // state means useReducer initialState
  
    const {type,payload} = action
    switch (type) {
      case INCREMENT:
        return state + payload
  
      case DECREMENT:
        return state - payload
  
      case RESETCOUNT:
        return 0
    
      default:
        return state
    }
  }