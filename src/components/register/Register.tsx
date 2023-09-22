import styles from './Register.module.css';
import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const { data, status } = await axios.post('register', {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                password_confirm: passwordConfirm,
            });

            if (status === 200) {
                setRedirect(true);
            } else {
                // console.log('data: ', data)
                // console.log('status: ', status)
                setMessage(data);
                setMessageType('danger');
            }
        } catch (error) {
            setMessage('Unexpected register error');
            setMessageType('danger');
        }
    };

    if (redirect) {
        return <Navigate to='/login' />;
    }

    let messageDiv;
    if (message) {
        messageDiv = (
            <div className={`alert alert-${messageType} role=alert`}>
                {message}
            </div>
        );
    }

    return (
        <main className={`${styles.formRegister} w-100 m-auto`}>
            <form onSubmit={submit}>
                <h1 className='h3 mb-3 fw-normal'>Register</h1>

                <div className={`${styles.formFloating} form-floating`}>
                    <input
                        type='text'
                        className='form-control'
                        id='firstNameInput'
                        placeholder='First Name'
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor='firstNameInput'>First Name</label>
                </div>
                <div className={`${styles.formFloating} form-floating`}>
                    <input
                        type='text'
                        className='form-control'
                        id='lastNameInput'
                        placeholder='Last name'
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label htmlFor='lastNameInput'>Last Name</label>
                </div>
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

                {/* <div className='form-check text-start my-3'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        value='remember-me'
                        id='flexCheckDefault'
                    />
                    <label
                        className='form-check-label'
                        htmlFor='flexCheckDefault'
                    >
                        Remember Login
                    </label>
                </div> */}
                {messageDiv}
                <button className='btn btn-primary w-100 py-2' type='submit'>
                    Register
                </button>
                <p className='mt-5 mb-3 text-body-secondary'>© 2022–2023</p>
            </form>
        </main>
    );
};
