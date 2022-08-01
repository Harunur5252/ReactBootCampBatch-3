import React from 'react'

function AnswerCard({answer,pickedAnswer,userPickedAnswer,userCorrectAnswer}) {
  // user selected answer
     // 1) picked answer 
  // correct_answer

  const isRightAnswer =   userPickedAnswer  &&  answer  === userCorrectAnswer
  const isWrongAnswer =   userPickedAnswer  &&  answer  === userPickedAnswer && userPickedAnswer !== userCorrectAnswer
  const correctClass  =   isRightAnswer ? 'correct-class' : ''
  const wrongCLass    =   isWrongAnswer ? 'incorrect-class' : ''
  const disableClass  =   userPickedAnswer  && 'disable-answer'

  return (
    <>
        <div className='answer'>
           <p className={`list-item ${correctClass} ${wrongCLass} ${disableClass}`} onClick={() => pickedAnswer(answer)}>{answer}</p>
        </div>
    </>
  )
}

export default AnswerCard
