import React from 'react';
import './SignIn.css';

const SignIn = ({ onRouteChange }) =>{
return(
    <div className='sign-in-container'>
        <form>
            <h2> Sign In </h2>
            <input type='email' placeholder='Email Address' />
            <input type='password' placeholder='Password' />
            <button onClick={()=>{onRouteChange('home'); return false;}}>Sign In</button>
        </form>
    </div>

);

}

export default SignIn;