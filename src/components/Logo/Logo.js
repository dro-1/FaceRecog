import React from 'react'
import image from './image.png'
import './Logo.css'

const Logo = () => {
return(
    
    <div className='logo br2 shadow-2'>
        <img alt='logo'src={image}></img>
    </div>
);
}

export default Logo