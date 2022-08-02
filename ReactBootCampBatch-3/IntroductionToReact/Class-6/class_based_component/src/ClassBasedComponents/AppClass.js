import React, { Component } from 'react'
import CardNumClass from './CardNumClass'
import OddOrEvenClass from './OddOrEvenClass'
import '../App.css'
import reactLogo from '../Images/logo512.png'

// ImageCard deal
const bdCards = [
    {
        image:'/logo192.png',
        title:'sample title',
        description:'sample title description'
    },

    {
        image:'/logo192.png',
        title:'sample title2',
        description:'sample title description2'
    },

    {
        image:'/logo192.png',
        title:'sample title3',
        description:'sample title description3'
    },

    {
        image:'/logo192.png',
        title:'sample title4',
        description:'sample title description4'
    },
]


 class AppClass extends Component {
    // state declare rule on class based component and access it by this keyword.
    state = {
        count : 0,
        randomCards : [10,22,23,25,30,55,26],
        pickedValue : null
    }
    constructor(props){
        super(props) // super() call react Component constructor().
        this.incrementCount = this.incrementCount.bind(this)
        this.decrementCount = this.decrementCount.bind(this)
        this.resetCount = this.resetCount.bind(this)
    }

    // Note : we can declare state in constructor()
    /*
       Example : 
       constructor(props){
         super(props)
         this.state = {
             count : 0
         }
       }
    */

       // If a state value is depended on exact before state value then use callback function in setState(). we can also use this callback in class and functional same way just state declare is different. 
       /*
          Example : 
            this.setState((prevState) = {
               return {
                  count : prevState.count + 1
                }
            })

            Or,

            this.setState((prevState) => ({count : prevState.count + 1}))
       */


    // Note : three way to set this keyword in class based component method
    /* 
       1) write arrow function
       2) In constructor function we can set this keyword by bind(this). But once we bind(this) way then this is not changeable. 
       3) when call a function then we can set this keyword by bind(this).
    */

    // class based method declare by arrow function for this keyword access and access this method by this keyword
    incrementCount (){
       this.setState((prevState) => ({count : prevState.count + 1}))
    }

    // class based method declare by arrow function for this keyword access and access this method by this keyword
    decrementCount(){
        this.setState((prevState) => ({count : prevState.count - 1}))
    }

    // class based method declare by arrow function for this keyword access and access this method by this keyword
    resetCount(){
        this.setState({count : 0})
    }

    pickedCardParent = (cardValue) => {
         this.setState({
            pickedValue : cardValue
         })
    }

    render() {
        const {count,randomCards,pickedValue} = this.state
        return (
            <>
                <div>
                    <p>Count : {this.state.count} </p>
                    <button onClick={this.incrementCount}>Increment</button>
                    <button onClick={this.decrementCount}>Decrement</button>
                    <button onClick={this.resetCount}>Reset</button>
                    <OddOrEvenClass count = {count} pickedValue={pickedValue} />
                    <br />
                    {randomCards.map((randomCard,index)=>{
                        return (
                            <CardNumClass key={index} randomCard={randomCard} pickedCardParent={this.pickedCardParent} />
                        )
                    })}
                      <br /><br /><br /><br />
                      {/* <img src={reactLogo}  alt='logo'/> */}
                      {bdCards.map((card,index)=>{
                          return (
                            <div>
                                <h3>
                                    {card.title}
                                </h3>
                                <p>{card.description}</p>
                                <img src={card.image}  alt='logo'/>
                             </div>
                          )
                      })}
                </div>
            </>
        )
    }
    }

export default AppClass
