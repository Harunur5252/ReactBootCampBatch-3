import React, { Component } from 'react'
import CounterClass from './CounterClass'

export default class AppClass extends Component {
  // In React Lifecycle is three stage.
  // describing 1) Mounting stage 

  
  // Do all initiate(birth) and state data declare in constructor
  constructor(){
     super()
     this.state = {
        AppTitle :'describing lifecycle method from AppClass',
        showCounter : true
     }
    //  console.log('AppClass : constructor')
  }
 
  // manipulate state based on parent props. jodi state update ar need hoi taile state return kore diben ar na hoi return null kore diben . tobe must return kisu korte hobe ai lifecycle method a .
  // dorun ami akta component a kaj kortesi tokon oi component ar parent theke jodi props hisabe kunu data ase tokon oi data upor base kore jodi state(children ar) ke update korte chai tahole ai lifecycle method use kora lagbe 
  static getDerivedStateFromProps(props,state){  // always return something and receive props ,state as parameter.
    // console.log('AppClass : getDerivedStateFromProps')
    return null
  }

 // for side effects(accessing dom,subscriptions),api call and call after dom update/ready that means after render(). mane jokon dom/component ready to show a browser thokon jodi kisu korte chai then use this method
  componentDidMount(){
    // console.log('AppClass : componentDidMount')
  }

  toggleCounter = () =>{
    this.setState({
      showCounter : !this.state.showCounter
    })
  }

  // create virtual dom(object akare) and then compare real dom with virtual dom and ki update kora lagbe ta kore. pore browser a show(output) kore.
  render() {
    // console.log('AppClass : render')
    const {showCounter,AppTitle} = this.state
    return (
       <>
          <h3>Introduction To Lifecycle Methods</h3>
          <button onClick={this.toggleCounter}>Toggle</button>
          {showCounter ? <CounterClass  AppTitle={AppTitle} /> : <h3>Hidden counter component</h3>}
       </>
    )
  }
}
