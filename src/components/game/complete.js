import React from "react";
import {css} from "@emotion/react";

const Complete = ({score, possibleScore, backToMenu}) => {
    const CompleteCSS = {
        position: "fixed",
        height: "100vh",
        width: "100vw",
        zIndex: "-1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
        }


    return (
        <div style={CompleteCSS} onClick={backToMenu}>
                        <h1>
            Congratulations you got <break/>
            {score} 

            </h1>   
        </div>
    )
}


export default Complete
