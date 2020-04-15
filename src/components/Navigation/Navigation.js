import React from 'react';
import './Navigation.css'

const Navigation = ({ onRouteChange,route }) =>{
    return (
        <nav>
        { route === 'signin' 
          ?  <p onClick={()=>{onRouteChange('register')}} className='link dim black underline pointer'>Register</p>
          : ( route === 'register'
              ? <p onClick={()=>{onRouteChange('signin')}} className='link dim black underline pointer'>Sign In</p>
              :<p onClick={()=>{onRouteChange('signin')}} className='link dim black underline pointer'>Sign Out</p>
          )
        }
        </nav>
    );
}

export default Navigation;