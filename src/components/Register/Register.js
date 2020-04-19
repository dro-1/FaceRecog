import React from 'react';
import './Register.css'


class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    OnEmailChange =(event)=>{
        this.setState({ email:event.target.value})
    }
    OnNameChange =(event)=>{
        this.setState({ name:event.target.value})
    }
    OnPasswordChange =(event)=>{
        this.setState({ password:event.target.value})
    }
    OnConfirmPasswordChange =(event)=>{
        this.setState({ confirmPassword:event.target.value})
    }

    OnSubmitRegister = (event) =>{
        const { password,confirmPassword,name,email } = this.state;
        event.preventDefault();

        if (password.length>=8 && password===confirmPassword && (name&&email) ){

        const { onRouteChange,loadUser } = this.props;

        fetch('https://agile-atoll-33348.herokuapp.com/register',{
            method:'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(data => {
            loadUser(data);
            onRouteChange('home');
        })
    
    }
    else{
       const passwordInputs = document.querySelectorAll('.password');
        passwordInputs[0].style.border = 'solid 1px #ff0000';
        passwordInputs[1].style.border = 'solid 1px #ff0000';
    }
        
    }

    render(){
        return(
            <div className='register-container'>
                <form>
                    <h2> Register </h2>
                    <input onChange={ this.OnNameChange } type='text' placeholder='Full Name' />
                    <input onChange={ this.OnEmailChange } type='email' placeholder='Email Address' />
                    <input 
                    className='password' 
                    onChange={ this.OnPasswordChange } type='password' placeholder='Password' />
                    <input 
                    className='password' 
                    onChange={ this.OnConfirmPasswordChange } type='password' 
                    placeholder='Confirm Password' />
                    <button onClick={ this.OnSubmitRegister }>Register</button>
                </form>
            </div>
        );
    }
}

export default Register;