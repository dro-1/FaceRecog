import React from 'react';
import './FaceRecognition.css'




const FaceRecognition = ({ imageURL }) =>{
    
    return(
           <div className='image-container'>
               <img id='image' alt='' src={imageURL}>
               </img>
            </div>
    )
}

export default FaceRecognition;