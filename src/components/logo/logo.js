import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import brain from './brain.png';


const Logo = () => {
    return (
        <div className='ma3 mt0'>
        <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa2">
                <img src={brain} alt ='logo'/> 
                <p className="white">{`YBS,\xa0\xa0\xa0Inc.`}</p>
            </div>
        </Tilt>                
        </div> 
    )
}

export default Logo;