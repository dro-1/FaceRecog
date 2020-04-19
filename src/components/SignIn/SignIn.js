import React from 'react';
import './SignIn.css';




class SignIn extends React.Component{
    constructor(){
        super();
        this.state = {
            email:'',
            password:''
        }
    }
    
    onFormPwordChange = (event) =>{
        this.setState({ password:event.target.value })
    }

    onFormEmailChange = (event) =>{
        this.setState({ email:event.target.value })
    }

    onSubmitSignIn = (event) =>{
        event.preventDefault();
        const { onRouteChange } = this.props;
        fetch('https://agile-atoll-33348.herokuapp.com/signin',{
            method:'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.state)
        })
        .then(response => response.json() )
        .then(data =>{ 
            if (data === 'Password/Username Mismatch'){
                console.log(data); 
              let inputs = document.querySelectorAll('.sign-in-container input');
              inputs[0].style.border = '1px solid #f33';
              inputs[1].style.border = '1px solid #f33';
            }
            else{
            this.props.loadUser(data) 
            onRouteChange('home'); 
            }
            
        } )
    }
    render(){
        
        return(
            <div className='sign-in-container'>
                <form>
                    <h2> Sign In </h2>
                    <input 
                    onChange={ this.onFormEmailChange } 
                    type='email' placeholder='Email Address' />
                    <input 
                    onChange={ this.onFormPwordChange } 
                    type='password' placeholder='Password' />
                    <button 
                    onClick={ this.onSubmitSignIn }>Sign In</button>
                </form>
            </div>
        );
        }
}

export default SignIn;