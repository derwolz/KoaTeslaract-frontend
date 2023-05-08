import React from 'react'
const correctSoundPlayer = () =>{
    return (
        <embed src={CorrectSound} autostart={true} loop={false} volume={100} hidden={true}><bgsound src={CorrectSound}/></embed>
    )
}
export default correctSoundPlayer