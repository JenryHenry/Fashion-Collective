import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Login = () => {
    // useState hook to switch between login and signup form
    // default state is set to true so the login form will appear upon page load
    const [activeForm, setActiveForm] = useState(true);

    return (
        <>
        {   activeForm ?
            (<LoginForm switchForm={() => setActiveForm(false)}></LoginForm>) :
            (<SignupForm switchForm={() => setActiveForm(true)}></SignupForm>)
        } 
        </>
    );    
};

export default Login;