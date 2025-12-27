import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { forgotPassword, resetAuthSlice } from '../store/slices/authSlice.js'
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const {
        loading,
        error,
        message,
        user,
        isAuthenticated,

    } = useSelector((state) => state.auth);

    const handleForgotPassword = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }
    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(resetAuthSlice());
        }
        if (error) {
            toast.error(error);
            dispatch(resetAuthSlice());
        }
    }, [dispatch, isAuthenticated, error, loading, message]);

    if (isAuthenticated) {
        return <Navigate to={"/"} />;
    }

    return <>
        <div className="flex flex-col justify-center md:flex-row h-screen">
            {/* LEFT SIDE  */}
            <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
                <div className="text-center h-100 mt-22">
                    <div className="flex justify-center mb-12">
                        <img src={logo_with_title} alt="logo" className="h-40 w-auto" />
                    </div>
                    <p className="text-xl text-grey-300 mb-20">"Your premier digital<br />library for borrowing<br />and reading books"</p>
                </div>
            </div>
            {/* RIGHT SIDE  */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
                <div className="max-w-sm w-full">
                    <Link to={"/login"} className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4  fixed top-10 -right-28 hover:bg-black hover:text-white transition duration-300 ">Back</Link>
                    <div className="flex justify-center mb-12 ">
                        <div className="rounded-full flex items-center justify-center">
                            <img src={logo} alt="logo" className="h-24 w-auto" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">Forgot Password</h1>
                    <p className="text-grey-800 text-center mb-12">Please enter your Email.</p>
                    <form onSubmit={handleForgotPassword}>
                        <div className="mb-4">
                            <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" />
                        </div>
                        <button type="submit" className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition mb-3 cursor-pointer" disabled={loading}>RESET PASSWORD</button>
                    </form>
                </div>
            </div>


        </div>
    </>;

}

export default ForgotPassword;