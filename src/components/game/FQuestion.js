import React, {useState, useEffect} from 'react';
import {css} from '@emotion/react';
const RightButton = {
    minHeight: "15vh",
    minWidth: "40vw",
    backgroundColor: "#4f4",
    margin: "4px",
    borderRadius: "5px",
    boxShadow:"-3px -3px 1px 1px inset #333",
    borderWidth: "1px",
    borderStyle: "solid"
}
const WrongButton = {
    minHeight: "15vh",
    minWidth: "40vw",
    backgroundColor: "#f44",
    margin: "4px",
    borderRadius: "5px",
    boxShadow:"-3px -3px 1px 1px inset #333",
    borderWidth: "1px",
    borderStyle: "solid"
}
const PartyButton = {
    minHeight: "15vh",
    minWidth: "40vw",
    margin: "4px",
    borderRadius: "5px",
    boxShadow:"-3px -3px 1px 1px inset #333",
    borderWidth: "1px",
    borderStyle: "solid"
}
const HintButton = {
    minHeight: "15vh",
    minWidth: "40vw",
    backgroundColor: "#dd3",
    margin: "4px",
    borderRadius: "5px",
    boxShadow:"-3px -3px 1px 1px inset #333",
    borderWidth: "1px",
    borderStyle: "solid"
}
const AnswerRow = {
    display: "flex",
    flexDirection: "row",
    flexFlow: "wrap",
    justifyContent: "center",
    alignItems: "center",
}

const FQuestion = ({questionText, questionHint, isRight, setPartyTime, isWrong, incHint}) =>{
    const [hint, setHint] = useState(false)
    const [timer, setTimer] = useState(45);
    const getRandomColor = () =>{

        return {backgroundColor: "rgb("+ Math.random() * 255+","+Math.random() * 255+","+Math.random() * 255+")"};
        
    }
    const [color, setColor] = useState("red");

    useEffect(() => {
      const intervalId = setInterval(() => {
        setColor(generateRandomColor());
        
      }, 500);
      const intervalTimer = setInterval(() => {
        setTimer(timer=>timer-1);
      }, 1000)
      return () => clearInterval(intervalTimer);

    }
    
    , []);
  
    function generateRandomColor() {
      const colors = ["red", "green", "blue", "yellow", "purple"];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    }
    const setIsRight = (event) =>{
        console.log(questionText, questionHint)
        console.log(event.target.value)
        isRight(event.target.value);
    }
    const showHint = () =>{
        setHint(true);
        incHint();
    }
    
    return (
        <div style={AnswerRow}>
        <h1>{questionText}</h1>
        <h3 style={{minWidth:"100%", textAlign:"center"}}>{timer} seconds remaining</h3>
        <button style={RightButton} onClick={setIsRight} value={"T"+hint}>
            ✅
        </button>
        <button style={WrongButton} onClick={setIsRight} value={"F"+hint}>
            ❌
        </button>
        {hint === false ? <button style={HintButton} onClick={showHint}>show hint</button>:<h1><div style={{width:"41vw", textAlign:"center"}}>{questionHint}</div></h1>}
        <button style={{...PartyButton, backgroundColor:color}} onClick={()=>{setPartyTime()}}>PartyTime</button>
        </div>
    )
}
export default FQuestion;