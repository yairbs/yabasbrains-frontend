import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageurl, boxes }) => {
    return (
        <div className="center ma"> 
            <div className="absolute mt2"> 
                <img id = 'inputimage' alt = '' src = {imageurl} width = '500px' height='auto'/>
                {boxes.map(box => <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}> </div>)}    
                {/* <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}> </div>  */}
            </div> 
        </div>
    )
}

export default FaceRecognition;