import React from 'react';

const Answer = ({isRight, answer,redMarbles, greenMarbles, setNextQuestion}) =>{
    console.log("isRight",isRight, typeof(isRight))
    const isRightCSS = {position: "fixed", minWidth:"100vw", minHeight:"200vh", backgroundColor:"green", zIndex:-1}
    const answerContainer = {
        display:"flex", 
        flexDirection: "column",justifyContent:"center", alignItems:"center"
    }
    const nextQuestion = {
        minWidth: "10em",
        minHeight: "3em",
        backgroundColor: "#393",
        borderRadius: "4px",
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: "-3px -3px 1px 1px inset #333"
    }
    
    const isWrongCSS = {position: "fixed", minWidth:"100vw", minHeight:"200vh", backgroundColor:"red", zIndex: -1};
    const redCSS = {
        backgroundColor:"red",
        color:"black"
    }
    const greenCSS = {
        backgroundColor: "#0f7",
        color: "black",
    }
    const returnHome = () =>{
        console.log("return")
        window.location.reload(true);
        
    };
    const returnButton = {
        width: "8em",
        height: "6em",
        backgroundColor: "#600",
        borderRadius: "4px",
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: "-3px -3px 1px 1px inset #333"
    }
return (
    <div style={answerContainer} >
        <div style={isRight==="true" ? isRightCSS : isWrongCSS}
        />
        <h1>The correct answer is {answer}!</h1>
        <h3>You currently have<span style={redCSS}> {redMarbles} </span> red Marbles</h3>
        <h3>You currently have<span style={greenCSS}> {greenMarbles} </span> green Marbles</h3>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", minWidth: "60vw"}}>
            <button style={returnButton}onClick={()=>{returnHome()}}>Finish Game</button>
            <button style={nextQuestion} onClick={()=>{setNextQuestion()}}>Next Question</button>
        </div>
    </div>
)
}
export default Answer;