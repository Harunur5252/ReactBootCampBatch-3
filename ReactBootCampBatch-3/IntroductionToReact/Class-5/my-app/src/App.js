import { useState } from 'react'
import QuestionCard from './QuestionCard';
import Shuffle from './Utils';
import './App.css'
import ScoreCard from './ScoreCard';

function App() {
 const [quizzes,setQuizzes] = useState(null);
 const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0);
 const [loaded,setLoaded] = useState(false);
 const [correctAnswer,setCorrectAnswer] = useState(null);
 const [startQuiz,setStartQuiz] = useState(false);
 const [endGame,setEndGame] = useState(false)
 const [totalScore,setTotalScore] = useState(0)
 const [userCorrectAnswer,setUserCorrectAnswer] = useState(null)
 const [userPickedAnswer,setUserPickedAnswer] = useState(null)



 // React has optimization features.
 // 1) when react come state update option then it's try to batch update. Batch update means multiple updates and then re-render.
 // when click next button
 const navigateNext = () => {
  const currentQuizIndex = currentQuestionIndex + 1
  const validQuestionIndex =  currentQuizIndex < quizzes.length
  if(validQuestionIndex){
      setCurrentQuestionIndex(currentQuizIndex) // question index is changing  
      const question = quizzes[currentQuizIndex];  // question answer index is changing
      setCorrectAnswer(Shuffle(question));
      // reset picked answer
      setUserPickedAnswer(null)

      // setting correct answer based on question
      setUserCorrectAnswer(question.correct_answer)
  }else{
    setEndGame(true)
  }
 }

 // compare user picked answer with actual answer
 const pickedAnswer = (answer) => {
    setUserPickedAnswer(answer) // user picked answer
    if(answer === userCorrectAnswer){
      setTotalScore(prevScore => prevScore + 1)
    }
 }

 // reset quiz
 const resetQuiz = () => {
    setQuizzes(null)
    setCurrentQuestionIndex(0)
    setLoaded(false)
    setCorrectAnswer(null)
    setStartQuiz(false)
    setEndGame(false)
    setTotalScore(0)
    setUserCorrectAnswer(null)
    setUserPickedAnswer(null)
 }

 
 const fetchQuiz = async () => {
    const res = await fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple');
    const {results} = await res.json();
    setQuizzes(results);
    // getting all answers
    const initialQuestion = results[currentQuestionIndex];
    // const answers = [initialQuestionIndex.correct_answer, ...initialQuestionIndex.incorrect_answers];
    setCorrectAnswer(Shuffle(initialQuestion));
    setUserCorrectAnswer(initialQuestion.correct_answer)
    
    setLoaded(true);
    setStartQuiz(true);
 }


  return (
    <>
        {
          endGame && <ScoreCard totalScore={totalScore} resetQuiz={resetQuiz} />
        }

        {
          ! startQuiz && <button onClick={fetchQuiz} className='button' >Start Quiz</button>
        }
       
       <div className='container'>
          {
            loaded && !endGame && <QuestionCard quiz = {quizzes[currentQuestionIndex]} correctAnswer={correctAnswer}  currentQuestionIndex={currentQuestionIndex} quizzes={quizzes}  navigateNext={navigateNext} pickedAnswer={pickedAnswer} userPickedAnswer={userPickedAnswer}  userCorrectAnswer={userCorrectAnswer} />
          }
       </div>
    </>
  );
}

export default App;
