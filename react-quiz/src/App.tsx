import React, { useState } from 'react';
import { fetchTriviaQuestions } from './routes/API';
import QuestionCard from './components/QuestionCard';
import { QuestionState, Difficulty } from './routes/API';

type AnswerObject = {
  question: string;
  answer: string;
  // answer is what the user chooses
  correct: boolean;
  correctAnswer: string;
  // correctAnswer is the actual correct answer
}

const TOTAL_QUESTIONS = 10;

// using hooks, we don't need to have one big state, we can have a few of them instead
// states set below starting on line 20 with 'loading state'
const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([]); //not set initially, until we set up API route -- once API route is done,
  // we can set it in <> with empty [] telling typescript that the empty array (set up before hand) ([]) will be set as <QuestionState>
  // have to create this type for answer object as well
  const [number, setNumber] = useState(0); // start at 0
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  // after setting these, we give the questionCard component its props

  // console.log(fetchTriviaQuestions(TOTAL_QUESTIONS, Difficulty.EASY));
  console.log(questions);

  // here we start going down the const App states 
  const startTrivia = async () => {
    setLoading(true);
    // clicking the start button triggers API fetch, so set the loading and game over to true and false, respectively
    setGameOver(false);

    const newQuestions = await fetchTriviaQuestions(
      // from console.log above
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    try {
      setQuestions(newQuestions);
    } catch (err) {
      console.error(err);
    }
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    // once this is all done setLoading to false since it's not loading anymore
    setLoading(false);
  };

  // TypeScript needs specification for 'e' what type of event, so we tell it it's a MouseEvent and specified EVEN MORE as an HTMLButtonElement
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  // Both the buttons below have the onClick handlers (specified above) to tell each button what to do
  // below, we give the questionCard its props
  // for question, it takes a number from all questions, and then shows the actual question text after, using .question
  // for userAnswers, uses ternary operator '?' grab correct answer by specifying the number, otherwise it is undefined
  // for button, it will only display if game is over OR || user answers the last question, otherwise : we return null
  // for score, only want to show if !not in gameOver mode, otherwise : null as well
  return (
    <div className="App">
      <h1>Trivia</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      ) : null}
      {!gameOver ? <p className="score">Score:</p> : null}
      {loading && <p>Loading Questions . . .</p>}
      {!loading && !gameOver && (
      <QuestionCard 
        questionNum={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
      )}
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
}

export default App;
