import React from 'react';
import { connect } from 'react-redux'; 
import { Redirect } from 'react-router-dom';

import Loader from '../Loader/Loader';
import { auth } from '../../actions';
import './Auth.css';



class Auth extends React.Component{
    state = {email: '', password: '', isSignUp: true};

    onEmailChange = (e) =>{
        this.setState({email: e.target.value});
    }

    onPasswordChange = (e) =>{
        this.setState({password: e.target.value});
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.auth(this.state.email, this.state.password, this.state.isSignUp);
    }

    switchAuthHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        });
    }

    render(){

        let errorMessage = null;
        if (this.props.error){
            errorMessage = (
                <p className="error">{this.props.error.message}</p>
            );
        }

        let form = (
            <form onSubmit={this.onFormSubmit}>
                <div>
                    <label>
                        <span>Your Email:</span>
                        <input type="email" autoComplete="on" required onChange={this.onEmailChange} value={this.state.email} />
                    </label>
                    <label>
                        <span>Password:</span>
                        <input type="password" required onChange={this.onPasswordChange} value={this.state.password} />
                    </label>
                </div>
                <button type="submit">Submit</button>
                <span onClick={this.switchAuthHandler}>Switch to {this.state.isSignUp ? 'Sign in': 'Sign up'}</span>
            </form>
        );
    
        if (this.props.loading){
            form = <Loader />
        }

        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to='/' />
        }

        return(
            <div className="login-form">
                {authRedirect}
                {errorMessage}
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.loading, 
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps, { auth })(Auth);