
import React, { useState } from "react";
import LetGoodTimesRoll from "../static/sounds/background music/bg.mp3";
import DreamCatcher from "../static/sounds/background music/Dream_Catcher.mp3"
import LeavingHome from "../static/sounds/background music/Leaving Home.mp3";
import Sincerely from "../static/sounds/background music/Tesla Trivia Background Music #1.mp3"
import "./BGSelector.css"
const BGSelector = ({selectBG}) =>{

    const [songs, setSongs] = useState({
        "Let Good Times Roll":LetGoodTimesRoll,
        "Dream Catcher":DreamCatcher,
        "Leaving Home":LeavingHome,
        "Sincerely":Sincerely
});
const select = {
    backgroundColor: "#888",
};
const [songNames, setSongNames] = useState([
    "Let Good Times Roll",
    "Dream Catcher",
    "Leaving Home",
    "Sincerely"
])
    const sendMusic = (event) =>{
        console.log("sendMusic pressed")
        console.log(event.target.outerText)
        selectBG(songs[event.target.outerText]);
    }

    return (
        <div className={"mainCSS"}>
        <div style={{display:"flex",flexDirection:"column"}}>
            <h4>Background Music</h4>
            {
                
                songNames.map((el) => {
                    
                    return (
                        <div className={"buttonCSS"} onClick={sendMusic}>{el}</div>
                    )
                })
            }
        </div>
        </div>
        
    )
}
export default BGSelector;