import React, { useState } from "react";
import axios from "axios";
import Question from "./Question";
import Selection from "./Selection.js";
import Answer from "./answer";
import Complete from "./complete";
import currentBG from "../../static/sounds/background music/bg.mp3";
import RightSound from "../../static/sounds/Correct Answer.mp3";
import IntroBG from "../../static/sounds/background music/intro_1.mp3";
import Ready from "./ready"
import WrongSound from "../../static/sounds/Wrong Answer.mp3";
import getIP from "../../config/api";
import BGSelector from "../BGSelector";
import SoundBoard from "./soundBoard";
const MinVolume = .05;
const MaxVolume = .8;
const BGvolumeSteady = .18;
const soundVolume = .8;
const fadeOutLength = 2000;
const Game = () =>{
    const [score, setScore] = useState(0);
    const [penalty, setPenalty] = useState(0);
    const [GameState, setGameState] = useState("Menu")
    // possible GameState values are Menu,Ready, Question, Answer, Complete
    const [quizType, setQuizType] = useState("None")
    // possible quiztypes are "MC" and "F"
    const [questionNumber, setQuestionNumber] = useState(0)
    const [questionText, setQuestionText] = useState("");
    const [quizName, setQuizName] = useState("");
    const [questionAnswer, setQuestionAnswer] = useState("");
    const [questionHint, setQuestionHint] = useState("");
    const [isRight, setIsRight] = useState(null);
    const [quizzes, setQuizzes] = useState(null);
    const [isBGPlaying, setBGPlaying] = useState(false);
    const [BGMusic, setBGMusic] = useState(new Audio(currentBG))
    const [intro, setIntro] = useState(new Audio(IntroBG));
    const [apiURL, setApiUrl] = useState(getIP());
    const fetchNextQuestion = (name, value) =>{
        if (name===undefined)
            name = quizName;
        if (value===undefined)
            value = quizType
        console.log(quizType, quizName, questionNumber)
        const data = {
            "quizType" : value,
            "quizName" : name,
            "idx" : questionNumber
        }
        console.log(data)
        console.log(apiURL)
        axios.get(apiURL+"/question", {params: data}).then(response => {
            console.log("fetchNextQuestion",response)
            console.log(response.data["question"]);
            setQuestionAnswer(response.data["answer"]);
            setQuestionHint(response.data["hint"]);
            setQuestionText(response.data["question"]);
            setQuestionNumber(response.data['idx']);
            if (response.data['isComplete'] !== undefined)
                completeQuiz();
        })
    }
    const playVideo = (isRight) => {
        console.log("playVideo",isRight)
        axios.get(apiURL+"/setVid",{params: {"vidResponse":isRight}})
    }
    const ChangeBGMusic = (musicName) =>{
        setBGMusic(new Audio(musicName));
    }
    const startQuiz = (name, value) => {
        console.log("startQuiz", name, value)
        setQuizType(value);
        setQuizName(name)
        playIntro();

        setGameState("Ready");
        
    }
    const startGame = () =>{
        playBackgroundMusic(MinVolume);
        
        nextQuestion()
    }
    const nextQuestion = (name, value) =>{
        fetchNextQuestion(name, value);
        setGameState("Question")
    }
    const answerRight = (arg) =>{
        console.log("answerRight",arg, score);
        let isTrue = "true"
        if (arg==="Ttrue")
            setScore(score+1);
        if (arg==="Tfalse")
            setScore(score+2);
        if (arg==="Ftrue")
        {
            isTrue = "false"
            setScore(penalty+2);
        }
            
        if (arg==="Ffalse"){
            isTrue = "false"
            setPenalty(penalty+1);
        }
        playSounds(isTrue)
        playVideo(isTrue)
        setIsRight(isTrue);
        setGameState("Answer");

    }
    const playSounds = (isTrue) => {
        
        if (isTrue === "true"){
            
            fadeBackgroundMusic(BGMusic, MinVolume, fadeOutLength/1000)
            setTimeout(() => {
                const sound = playWinSound(soundVolume)
                setTimeout(()=>{

                    unFadeBackgroundMusic(BGMusic, BGvolumeSteady, (fadeOutLength*6)/1000)
                })
            }, fadeOutLength/1.5)

            
        }
        console.log("playSounds", isTrue)
        if (isTrue === "false")
            {
                fadeBackgroundMusic(BGMusic, MinVolume, fadeOutLength/1000)
                setTimeout(() => {
                    const sound = playLoseSound(soundVolume)
                    setTimeout(()=>{
        
                        unFadeBackgroundMusic(BGMusic, BGvolumeSteady, (fadeOutLength*6)/1000)
                    })
                }, fadeOutLength/1.5)
        
            }
        
    }
    const completeQuiz = ()=> {
        setGameState("Complete");
    }
    const setPartyTime = () =>{
        console.log("PartyTime")
        playVideo("PartyTime")
    }
    const resetGame = () =>{
        setScore(0);
        setQuestionNumber(0);
        stopBackgroundMusic()
        setGameState("Menu");
    }
    const playWinSound = (volume) =>{
        const sound = new Audio(RightSound)
        sound.volume = volume;
        sound.play()
        return sound
    }
    const playLoseSound = (volume) => {
        const sound = new Audio(WrongSound);
        sound.volume = volume;
        sound.play();
        return sound;
    }
    const playBackgroundMusic = (volume) =>{
        console.log("BGMusic",BGMusic);
        intro.pause();
        BGMusic.volume = MaxVolume;
        BGMusic.loop =true;
        BGMusic.play()
        fadeBackgroundMusic(BGMusic, volume, 1)
    }
    const fadeBackgroundMusic = (audio, volume, duration) =>{
        console.log('now fading')
        const intervalTime = 20.0;
        const intervalStep = intervalTime / duration /1000.0
        let currentVolume = audio.volume
        const fadeOutInterval = setInterval(()=>{
            if (currentVolume > volume){
            currentVolume -= intervalStep
            audio.volume = currentVolume;
            console.log(audio.volume)
            }
        }, intervalTime)
        setTimeout(() => {
            clearInterval(fadeOutInterval);
            console.log("finished Fading")
    }, [duration*1000])
            
    }
    const unFadeBackgroundMusic = (audio, volume, duration) =>{
        const intervalTime = 6.0;
        const intervalStep = intervalTime / duration/1000
        let currentVolume = audio.volume
        console.log("fadingIn");
        console.log(currentVolume)
        
        const fadeOutInterval = setInterval(()=>{
            if (currentVolume < volume) {
                console.log(currentVolume);
                currentVolume += intervalStep;
                audio.volume = currentVolume;
            }
            
        }, intervalTime);
        setTimeout(() => {
            clearInterval(fadeOutInterval);
        }, [duration*1000])
    }
    const stopBackgroundMusic = () =>{
        BGMusic.pause()
        setBGMusic(new Audio(currentBG));
    }
    const playIntro = ()=>{
        console.log(intro)
        intro.volume = .5;
        intro.play();
        
        //playBackgroundMusic(MaxVolume)
        //setTimeout(()=>{
        //    fadeBackgroundMusic(BGMusic, BGMusic.volume/2, 5.00)
        //}, 8000)
    }
    return (
        <>
        { GameState === "Menu" ? 
        <div>
            <Selection setGameState={(arg)=>(arg)} startQuiz={(arg, arg2)=>startQuiz(arg, arg2)} setQuizName={(arg)=>setQuizName(arg)} quizzes={quizzes}/>
            <BGSelector selectBG={(music)=>{ChangeBGMusic(music)}}/>
        
        </div> :
        GameState === "Ready" ? 
        <Ready startGame={()=>{startGame()}} playMusic={()=>{playIntro()}}/>:
         GameState === "Question" ? 
         <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
         <Question questionText={questionText} questionAnswer = {questionAnswer} isRight={(arg)=>{answerRight(arg)}} setPartyTime={()=>{setPartyTime()}} questionHint ={questionHint} />
         <SoundBoard/>
         </div>:
          GameState === "Answer" ? 
          <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <Answer isRight={isRight} redMarbles={penalty} greenMarbles={score} answer={questionAnswer} setNextQuestion={()=>{nextQuestion()}}/>
          <SoundBoard/>
          </div>
        : GameState === "Complete" ? 
        <Complete score={score} possibleScore={questionNumber} backToMenu={()=>{resetGame()}}/> : <>Somehow this failed to load</>}
        </>
    )
}
export default Game;