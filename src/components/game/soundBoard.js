import React, {useState} from "react";
import greenMarble from "../../static/sounds/Green Marble.mp3";
import redMarble from "../../static/sounds/Red Marble.mp3";
import laugh from "../../static/sounds/Crowd Laughter.mp3";
import jackpot from "../../static/sounds/Jackpot.mp3";
import lamePrize from "../../static/sounds/Lame Prize Open.mp3";
import wahWah from "../../static/sounds/Wah Wah Wah Wahhhhh.mp3";
import correctAnswer from "../../static/sounds/Correct Answer.mp3";
import wrongAnswer from "../../static/sounds/Wrong Answer.mp3";
import "./soundBoard.css";
const SoundBoard = () =>{
    const [sounds, setSounds] = useState({
        "Green Marble": greenMarble,
        "Red Marble":redMarble,
        "Laugh": laugh,
        "Jackpot": jackpot,
        "LamePrize": lamePrize,
        "wahWah": wahWah,
        "Correct Answer": correctAnswer,
        "WrongAnswer": wrongAnswer,
    })
    const [soundNames, setSoundNames] = useState([
        "Green Marble",
        "Red Marble",
        "Laugh",
        "Jackpot",
        "LamePrize",
        "wahWah",
        "Correct Answer",
        "WrongAnswer"
    ])
    const PlaySound = (event) =>{
        const playedSound = new Audio(sounds[event.target.outerText])
        playedSound.play();
    };
    return (
        <div className={"SoundGrid"}>{
            soundNames.map((sound) => {
                return (
                    <div className={"soundButton"} onClick={PlaySound}>
                {sound}
                </div>
                )
            })
        }
            
            
        </div>
    )
}
export default SoundBoard;