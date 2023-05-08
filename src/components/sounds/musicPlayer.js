import React from 'react';
const musicPlayer = () =>{
    return (
        <embed src={bgMusic} autostart={true} loop={true} volume={100} hidden={true}><bgsound src={bgMusic}/></embed>
    );
}
export default musicPlayer


