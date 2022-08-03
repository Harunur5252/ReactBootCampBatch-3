import React, { Component } from 'react'

export default class CounterClass extends Component {
    state = {
        count : 0,
        title:'From Counter Component' 
    }

   //  countTimer 

      // componentDidMount(){
      //   this.countTimer =  setInterval(() => {
      //     this.setState({
      //        count : this.state.count + 1
      //     })
      //   },1000)
      // }


   // In React Lifecycle is three stage.
   // describing 3) UnMounting stage 
     // when a component hide or banish from browser then it's called. we can also used this method to stop a  long running action 
     componentWillUnmount(){
       console.log('CounterClass : componentWillUnmount')
      //  clearInterval(this.countTimer)
     }
   // end UnMounting stage 



   // In React Lifecycle is three stage.
   // describing 2) Updating stage(when props , state and forceUpdate is change/update then updating stage lifecycle method will work)

     // manipulate state based on parent props in children. jodi state update ar need hoi taile state return kore diben ar na hoi return null kore diben . tobe must return kisu korte hobe ai lifecycle method a .
     // dorun ami akta component a kaj kortesi tokon oi component ar parent theke jodi props hisabe kunu data ase tokon oi data upor base kore jodi state(children ar) ke update korte chai tahole ai lifecycle method use kora lagbe 
      static getDerivedStateFromProps(props,state){  // always return something and receive props ,state as parameter.
         console.log('CounterClass : getDerivedStateFromProps')
         // AppClass theke props unujai children class(Counter class) ar state ar title change koretesi ai lifecycle method dia.
         // return {
         //    title : props.AppTitle
         // }

         return {
            title : props.AppTitle
         }
      }


      
     // whether a component will update/re-render or not according to parent props(without initial props), we can manually tell(control) to a component. If we set only return true in this lifecycle method then a component will update
      shouldComponentUpdate(nextProps,nextState){
         return true
      }


      // before update dom we can take a screenshot,dom ar element dore kaj korte pari and must have return something and receive prevProps,prevState as parameter
      getSnapshotBeforeUpdate(prevProps,prevState){
         // manually dom update,selection
         return 'something'
      }


      // when dom updated and ready to show browser on that moment if we do something and receive props,state and snapShot from getSnapshotBeforeUpdate() method.
      // suppose parent theke akta props then props ar datar upor base kore dom update hoilo pore server a request pathai dia finally dom manipulate korle.
      // basically componentDidUpdate() and  componentDidMount() same way works but deals componentDidUpdate() in updating time and deals componentDidMount() in initial(Mounting) time.
      componentDidUpdate(props,state,snapShot){
        document.querySelector('h3').textContent = snapShot
      }


     handleIncrement = (num) =>{
         this.setState((prevState) => {
            return {
               count : prevState.count + num
            }
         })
         // this.forceUpdate() // it's only works an event. forceUpdate() lifecycle method overcome shouldComponentUpdate() lifecycle method if shouldComponentUpdate() lifecycle method is return false therefore call getDerivedStateFromProps(),render(),getSnapshotBeforeUpdate() and componentDidUpdate() lifecycle methods,but not call shouldComponentUpdate() lifecycle method.
     }
 
     handleDecrement = (num) =>{
         this.setState((prevState) => {
            return {
               count : prevState.count - num
            }
         })
         // this.forceUpdate() // it's only works an event. forceUpdate() lifecycle method overcome shouldComponentUpdate() lifecycle method if shouldComponentUpdate() lifecycle method is return false therefore call getDerivedStateFromProps(),render(),getSnapshotBeforeUpdate() and componentDidUpdate() lifecycle methods,but not call shouldComponentUpdate() lifecycle method.
     }
 
     handleReset = (num) =>{
         this.setState({
             count : num
         })
         // this.forceUpdate() // it's only works an event. forceUpdate() lifecycle method overcome shouldComponentUpdate() lifecycle method if shouldComponentUpdate() lifecycle method is return false therefore call getDerivedStateFromProps(),render(),getSnapshotBeforeUpdate() and componentDidUpdate() lifecycle methods,but not call shouldComponentUpdate() lifecycle method.
     }


 // create virtual dom(object akare) and then compare real dom with virtual dom and ki update kora lagbe ta kore. pore browser a show(output) kore.
   render() {
      console.log('CounterClass : render')
      const {count,title} = this.state
     return (
       <>
          <h3>{title}</h3>
          <p>Count : {count} </p>
          <button onClick={() => this.handleIncrement(1)}>Increment</button>
          <button onClick={() => this.handleDecrement(1)}>Decrement</button>
          <button onClick={() => this.handleReset(0)}>Reset</button>
       </>
     )
   }
}
