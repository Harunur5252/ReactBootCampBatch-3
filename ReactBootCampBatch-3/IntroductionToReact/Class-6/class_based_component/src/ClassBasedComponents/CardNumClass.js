import React, { Component } from 'react'

export default class CardNumClass extends Component {
    pickedCard = () => {
        this.props.pickedCardParent(this.props.randomCard)
    }
  render() {
    return (
      <>
         <span className='cardRandom' onClick={this.pickedCard}>{this.props.randomCard} </span>
      </>
    )
  }
}
