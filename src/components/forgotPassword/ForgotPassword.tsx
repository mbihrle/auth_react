import styles from './ForgotPassword.module.css';
import { SyntheticEvent, useState } from 'react';
import axios from 'axios';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [notify, setNotify] = useState({
        show: false,
        error: false,
        message: '',
    });

    const submit = async (evt: SyntheticEvent) => {
        evt.preventDefault();

        try {
            await axios.post('forgot', { email });
            setNotify({
                show: true,
                error: false,
                message: 'Please check your email!',
            });
        } catch (e) {
            setNotify({ show: true, error: true, message: 'Error occured!' });
        }
    };

    let info;
    if (notify.show) {
        info = (<div className={notify.error ? 'alert alert-danger' : 'alert alert-success'} role = "alert">
            {notify.message}
        </div>)
    }

    return (
        <main className={`${styles.formForgot} w-100 m-auto`}>
            {info}
            <form onSubmit={submit}>
                <h1 className='h3 mb-3 fw-normal'>Please submit your email!</h1>

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

                <button className='btn btn-primary w-100 py-2' type='submit'>
                    Submit
                </button>
            </form>
        </main>
    );
};
