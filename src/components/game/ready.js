import React from "react"
const Ready  = ({startGame}) =>{
    const ReadyCSS = {
        position: "fixed",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
    return (
        <div style={ReadyCSS} onClick={startGame}>
            <span>Welcome to the</span> <span>TESLARACT</span>
           
        </div>
    )
}
export default Ready;