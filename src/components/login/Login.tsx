import styles from './Login.module.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from './loginForm/LoginForm';
import { AuthenticatorForm } from './authenticatorForm/AuthenticatorForm';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/authSlice';

export const Login = () => {
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const [loginData, setLoginData] = useState<{
        id: number;
        secret?: string;
        otpauth_url?: string;
    }>({id: 0});

    const success = () => {
        setRedirect(true)
        dispatch(setAuth(true))
    }

    if (redirect) {
        return <Navigate to='/' />;
    }

    let form;

    if (loginData?.id === 0) {
        form = <LoginForm loginData={setLoginData} success={success} />;
    } else {
        form = <AuthenticatorForm loginData={loginData} success={success} />;
    }

    return <main className={`${styles.formSignin} w-100 m-auto`}>{form}</main>;
};
