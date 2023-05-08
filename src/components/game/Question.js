import React from 'react';
import MCQuestion from "./MCQuestion";
import FQuestion from "./FQuestion";
const Question = ({quizType, questionText, answers, questionHint, isRight, isWrong, setPartyTime }) =>{
return (
    <>
    {quizType === "MC" ? <MCQuestion questionText={questionText} answers={answers} isRight={isRight} isWrong={isWrong}/>:
    <FQuestion questionText={questionText} questionHint={questionHint} isRight={isRight} isWrong={isWrong} setPartyTime={setPartyTime} /> }
    </>
)
}
export default Question;