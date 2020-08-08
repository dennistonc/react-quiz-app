import React from 'react';
import { AnswerObject } from '../App';
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

// doesn't HAVE to have the name 'Props', but for examples' sake rn we will be calling it this
type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNum: number;
    totalQuestions: number;
}

// this has to be rendered as a functional component, so after function name, use colon to specify and 'React.FC' which stands for, and renders this as, a Functional Component
// type Prop name 'Props' in angled brackets, then define them all that will be used by this component in ({})
// changed original div to Wrapper for styling purposes, and button div to ButtonWrapper
// the "?" after userAnswer (called optional chaining in TS) will make it undefined if there is no answer
const QuestionCard: React.FC<Props> = ({ 
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNum, 
    totalQuestions
 }) => (
    <Wrapper>
        <p className="number">
            Question: {questionNum} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {answers.map(answer => (
                <ButtonWrapper 
                  key={answer}
                  correct={userAnswer?.correctAnswer === answer}
                  userClicked={userAnswer?.answer === answer}
                  >
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} /> 
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);

// notes: 'dangerouslySetInnerHTML' IS dangerous because you are never sure what will be injected into there if using HTML so try to mostly avoid this
// double set of curly brackets for both dangerouslySetInnerHTMLs are objects, so that's why the second set of {} is used
// answers.map(answer) -- so we map through all the answers to find and use the correct answer, and use "implicit return" which is arrow funtion => (paranthesis)
// answer button is disabled until it is shown that the user has answered something

export default QuestionCard;