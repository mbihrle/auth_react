import styles from './LoginForm.module.css';
import { SyntheticEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export const LoginForm = (props: {
    loginData: Function;
    success: Function;
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    let messageDiv;

    if (message) {
        messageDiv = (
            <div className={`alert alert-${messageType} role=alert`}>
                {message}
            </div>
        );
    }

    const submit = async (evt: SyntheticEvent) => {
        evt.preventDefault();

        try {
            const res = await axios.post(
                'login',
                {
                    email,
                    password,
                },
                { withCredentials: true }
            );

            const data = res.data;

            // console.log('data: ', data);
            // console.log('response: ', res);
            // console.log('Type: ', typeof res);
            // console.log(Object.getOwnPropertyNames(res));
            // console.log(Object.getOwnPropertyDescriptors(res));

            if (data) {
                console.log('data: ', data);
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${data.token}`;
                props.loginData(data);
            } else {
                setMessage('Wrong credentials. Please try again!');
                setMessageType('danger');
            }
        } catch (error) {
            console.log('Unexpected Login Error: ', error);
        }
    };

    return (
        <main className={`${styles.formLogin} w-100 m-auto`}>
            <form onSubmit={submit}>
                <h1 className='h3 mb-3 fw-normal'>Login</h1>

                <div className={`${styles.formFloating} form-floating`}>
                    <input
                        type='email'
                        className='form-control'
                        id='emailInput'
                        placeholder='email@example.com'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor='emailInput'>Email Address</label>
                </div>
                <div className={`${styles.formFloating} form-floating`}>
                    <input
                        type='password'
                        className='form-control'
                        id='passwordInput'
                        placeholder='Password'
                        autoComplete='on'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor='floatingPassword'>Password</label>
                </div>

                {messageDiv}

                <div className='mb-3'>
                    <Link to='/forgot'>Forgot password?</Link>
                </div>

                <button className='btn btn-primary w-100 py-2' type='submit'>
                    Login
                </button>
                <p className='mt-5 mb-3 text-body-secondary'>© 2022–2023</p>
            </form>
            <GoogleLogin
                ux_mode='popup'
                onSuccess={async (credentialResponse) => {
                    // window.location.reload();
                    console.log('heyho: ', credentialResponse);
                    const { status, data } = await axios.post(
                        'google-auth',
                        {
                            token: credentialResponse.credential,
                        },
                        { withCredentials: true }
                    );

                    axios.defaults.headers.common[
                        'Authorization'
                    ] = `Bearer ${data.token}`;

                    if (status === 200) {
                        props.success();
                    }
                }}
                onError={() => {
                    console.log('Login Failed');
                    alert('Login failed');
                }}
            />
        </main>
    );
};
