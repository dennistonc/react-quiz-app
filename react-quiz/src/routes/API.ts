import { shuffleArray } from './utils';

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

// this will use the types from the Question but use the QuestionState properties we provide below
export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

// specify the difficulty parameter as 'Difficulty' which contains all levels thanks to TypeScript 'enum'
// double await to fetch itself then to convert to json
export const fetchTriviaQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    // console.log(data);
    // question is specified by the type Question above
    return data.results.map((question: Question) => (
        // spread the question (...) which means to use all the properties that we get from Question, then add new property of answer
        {
            ...question,
            answers: shuffleArray([
                ...question.incorrect_answers, 
                question.correct_answer,
            ]),
            // spread all the incorrect and correct answers, and shuffle them with shuffleArray
        }));
};