import React from 'react';
import './App.css';
import { Home } from './components/home/Home';
import { Login } from './components/login/Login';
// import  {LoginForm } from './components/login/LoginForm'
import { Register } from './components/register/Register';
import { ForgotPassword } from './components/forgotPassword/ForgotPassword';
import  {ResetPassword} from './components/resetPassword/ResetPassword'
import { Nav } from './components/nav/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                {/* <Route path='/logout' element={<Home />} /> */}
                <Route path='/forgot' element={<ForgotPassword />} />
                <Route path='/reset/:token' element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
