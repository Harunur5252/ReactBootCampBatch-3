import { memo } from 'react'
import myStyles from './App.module.css'

// memo(higher order function) = check parent props change and then according to change re-randers or not re-renders
   // memo has disadvantage : when as props come complex data type then memo can not check.

function IsOddOrEven({pickedValue,randomValue}){
    console.log('OddOrEven called')
    console.log(randomValue)
    const isOddOrEven = !pickedValue ? 'Not selected' : pickedValue % 2 === 0 ? 'Even' : 'Odd'

      return (
         <div>
             {/* <h2>Number is : {count % 2 === 0 ? 'Even' : 'Odd'} </h2> */}
             <h2>Picked number is : {(<span className={isOddOrEven === 'Even' ? myStyles.even : myStyles.odd}>{isOddOrEven}</span>) } </h2>
         </div>
      )
}

  export default memo(IsOddOrEven)