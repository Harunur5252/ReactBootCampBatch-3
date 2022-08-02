import React, { Component } from 'react'

export default class OddOrEvenClass extends Component {
  render() {
    const {count,pickedValue} = this.props
    return (
      <>
         <div>
            <h3>Counter Number is OddOrEven : {count % 2 === 0 ? 'Even' : 'Odd'} </h3><br />
            <h3>PickedValue is : {pickedValue ? pickedValue % 2 === 0 ? 'Even' : 'Odd' : <span>You haven't picked a number yet? </span>} </h3>
         </div>
      </>
    )
  }
}
