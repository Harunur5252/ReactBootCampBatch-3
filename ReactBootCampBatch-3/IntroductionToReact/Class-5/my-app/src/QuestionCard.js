import React from 'react'
import AnswerCard from './AnswerCard'


function QuestionCard({quiz,correctAnswer,currentQuestionIndex,quizzes,navigateNext,pickedAnswer,userPickedAnswer,userCorrectAnswer}) {

  return (
    <>
       <div className='question-card'>
           <p className='questionIndex'>Question : <span className='countNumber'>{currentQuestionIndex + 1} / {quizzes.length}</span> </p>
           <h3 className='question'>{quiz.question}</h3>
            {correctAnswer.map((answer,index) => {
               return <AnswerCard key={index} answer={answer}  pickedAnswer={pickedAnswer} userPickedAnswer={userPickedAnswer}  userCorrectAnswer={userCorrectAnswer} />
            })}
            <button onClick={navigateNext} className='nextButton'>Next</button>
       </div>
    </>
  )
}

export default QuestionCard
