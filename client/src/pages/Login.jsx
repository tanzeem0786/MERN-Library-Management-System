import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { getUser, login, resetAuthSlice } from '../store/slices/authSlice.js'
import { toast } from "react-toastify";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();

    const {
        loading,
        error,
        message,
        isAuthenticated,

    } = useSelector((state) => state.auth);
    const handleLogin = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("email",email);
        data.append("password", password);
        dispatch(login(data));

    };
    useEffect(() => {
            if (message) {
                toast.success(message)
                dispatch(getUser());
            }
            if (error) {
                toast.error(error);
                dispatch(resetAuthSlice());
            }
        }, [dispatch, isAuthenticated,message, error, loading]);
    
        if (isAuthenticated) {
            return <Navigate to={"/"} />;
        }
    return <>
            <div className="flex flex-col justify-center md:flex-row h-screen">
                {/* LEFT SIDE  */}
                <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
                    <Link to={"/register"} className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end">Back</Link>
                    <div className="max-w-sm w-full">
                        <div className="flex justify-center mb-12">
                            <div className="rounded-full flex items-center justify-center">
                                <img src={logo} alt="logo" className="h-24 w-auto" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">Welcome Back!</h1>
                        <p className="text-grey-800 text-center mb-12">Please Enter your Credentials to Login.</p>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" />
                            </div>
                            <div className="mb-4">
                                <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" />
                            </div>
                            <Link to={"/password/forgot"} className="font-semibold text-black mb-12 hover:underline">Forgot Password?</Link>
                            <div className="block md:hidden font-semibold mt-5">
                                <p>New to Our Platform? <Link to={"/register"} className="text-sm text-gray-500 hover:underline" >Sign Up</Link> </p>
                            </div>
                            <button type="submit" className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition mb-3 cursor-pointer ">SIGN IN</button>
                        </form>
                    </div>
                </div>
    
                {/* RIGHT SIDE  */}
                <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
                    <div className="text-center h-100">
                        <div className="flex justify-center mb-12">
                            <img src={logo_with_title} alt="logo" />
                        </div>
                        <p className="text-grey-300 mb-12">New to Our Platform? Sign up now.</p>
                        <Link to={"/register"} className="w-full mt-5 bg-black text-white border-2 rounded-lg font-semibold border-white py-2 px-8 hover:bg-white hover:text-black transition">SIGN UP</Link>
                    </div>
                </div>
    
            </div>
        </>;
}

export default Login;
