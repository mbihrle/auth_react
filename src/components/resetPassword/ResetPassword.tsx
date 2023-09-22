import styles from './ResetPassword.module.css';
import { SyntheticEvent, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { token } = useParams();

    const submit = async (evt: SyntheticEvent) => {
        evt.preventDefault();

        await axios.post('reset', {
            token,
            password,
            password_confirm: passwordConfirm,
        });

        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to='/login' />;
    }

    return (
        <main className={`${styles.formReset} w-100 m-auto`}>
            <form onSubmit={submit}>
                <h1 className='h3 mb-3 fw-normal'>Reset your password</h1>

                <div className={`${styles.formFloating} form-floating`}>
                    <input
                        type='password'
                        className='form-control'
                        id='passwordInput'
                        placeholder='Password'
                        autoComplete='on'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor='passwordInput'>Password</label>
                </div>
                <div className={`${styles.formFloating} form-floating`}>
                    <input
                        type='password'
                        className='form-control'
                        id='passwordConfirmInput'
                        placeholder='Passwort Confirm'
                        autoComplete='on'
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <label htmlFor='passwordConfirmInput'>
                        Passwort Confirm
                    </label>
                </div>

                <button className='btn btn-primary w-100 py-2' type='submit'>
                    Submit
                </button>
            </form>
        </main>
    );
};
