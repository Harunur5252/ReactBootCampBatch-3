import myStyles from './App.module.css'

function IsOddOrEven({count,pickedValue}){
    const isOddOrEven = pickedValue && pickedValue % 2 === 0 ? 'Even' : 'Odd'
      return (
         <div>
             <h2>Number is : {count % 2 === 0 ? 'Even' : 'Odd'} </h2>
             <h2>Picked number is : {(<span className={isOddOrEven === 'Even' ? myStyles.even : myStyles.odd}>{isOddOrEven}</span>) } </h2>
         </div>
      )
}

  export default IsOddOrEven