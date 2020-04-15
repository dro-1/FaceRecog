import React from 'react';
import './Register.css'

const Register = ({ onRouteChange }) =>{
return(
    <div className='register-container'>
        <form>
            <h2> Register </h2>
            <input type='text' placeholder='Full Name' />
            <input type='email' placeholder='Email Address' />
            <input type='password' placeholder='Password' />
            <input type='password' placeholder='Confirm Password' />
            <button onClick={()=>{onRouteChange('home'); return false;}} >Register</button>
        </form>
    </div>

);

}

export default Register;