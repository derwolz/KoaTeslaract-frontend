import React from 'react'

const falseSound = () =>{
    return (
        <embed src={FalseSound} autostart={true} loop={false} volume={100} hidden={true}><bgsound src={FalseSound}/></embed>
    )
}
export default falseSound;