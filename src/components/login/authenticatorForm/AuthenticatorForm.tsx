import styles from './AuthenticatorForm.module.css';
import { ReactElement, SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import qrcode from 'qrcode';
// import { Link } from 'react-router-dom';

export const AuthenticatorForm = (props: {
    loginData: {
        id: number;
        secret?: string;
        otpauth_url?: string;
    };
    success: Function;
}) => {
    const [code, setCode] = useState('');
    const [img, setImg] = useState<ReactElement | null>(null);
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

    // console.log('loginData: ', props.loginData);

    useEffect(() => {
        if (props.loginData.otpauth_url) {
            qrcode.toDataURL(props.loginData.otpauth_url, (err, data) => {
                setImg(
                    <img src={data} style={{ width: '100%' }} alt='qrcode' />
                );
            });
        }
    }, [props.loginData.otpauth_url]);

    const submit = async (evt: SyntheticEvent) => {
        evt.preventDefault();
        try {
            const { data, status } = await axios.post(
                'two-factor',
                {
                    ...props.loginData,
                    code,
                },
                { withCredentials: true }
            );
            if (status === 200) {
                props.success();
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${data.token}`;
            } else {
                setMessage('Wrong code. Please try again!');
                setMessageType('danger');
            }
        } catch (error) {
            console.log('Unexpected Authenticator Error: ', error);
        }
    };

    return (
        <main className={`${styles.formAuthCode} w-100 m-auto`}>
            <form onSubmit={submit}>
                <h1 className='h3 mb-3 fw-normal'>
                    Please insert your authenticator code
                </h1>

                <div className={`${styles.formFloating} form-floating`}>
                    <input
                        type='text'
                        className='form-control'
                        id='emailInput'
                        placeholder='6 digits code'
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <label htmlFor='emailInput'>6 digits code</label>
                </div>
                {messageDiv}
                <button
                    className='btn btn-primary w-100 py-2 mt-3'
                    type='submit'
                >
                    Submit
                </button>
            </form>
            {img}
        </main>
    );
};
