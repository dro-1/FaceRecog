import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageURL,box }) =>{
    return(
           <div className='image-container'>
               <img id='image' alt='Detected' src={imageURL}>
               </img>
               <div style={{inset:box}} className='bounding-box'></div>
           </div>
    )
}

export default FaceRecognition