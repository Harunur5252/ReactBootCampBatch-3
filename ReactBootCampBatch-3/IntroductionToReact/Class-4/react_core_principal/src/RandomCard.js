import myStyles from './App.module.css'

function RandomCard({cardValues,setPickedValue}){
    return (
      <>
        {
          cardValues.map((cardValues,index) =>{
            return (
                <div className={myStyles.myStyles} key={index} onClick={() => setPickedValue(cardValues)}> 
                  {cardValues}
                </div>
              );
          })
        }
      </>
    );
}

export default RandomCard