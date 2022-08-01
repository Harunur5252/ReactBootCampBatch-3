import React from 'react'

export default function ScoreCard({totalScore,resetQuiz}) {
  return (
    <>
       <div className='resultPage'>
          <h3 className='scoreHeading'>Result Page</h3>
          <p className='scoreColor'>Score : {totalScore} </p>
          <button className='reset-quizBtn' onClick={resetQuiz}>Reset Quiz</button>
       </div>
    </>
  )
}
