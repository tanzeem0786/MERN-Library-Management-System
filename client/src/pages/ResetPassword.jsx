import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import {  resetAuthSlice, resetPassword } from '../store/slices/authSlice.js'
import { toast } from "react-toastify";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { token } = useParams();
    const dispatch = useDispatch();

    const {
        loading,
        error,
        message,
        isAuthenticated,

    } = useSelector((state) => state.auth);

    const handleResetPassword = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("password", password);
        data.append("confirmPassword", confirmPassword);
        dispatch(resetPassword(data, token));
    };
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

    return <>
            <div className="flex flex-col justify-center md:flex-row h-screen">
                {/* RIGHT SIDE  */}
                <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
                    <div className="max-w-sm w-full">
                        <Link to={"/login"} className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 text-black fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end">Back</Link>
                        <div className="flex justify-center mb-12 ">
                            <div className="rounded-full flex items-center justify-center">
                                <img src={logo} alt="logo" className="h-24 w-auto" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">Reset Password</h1>
                        <p className="text-grey-800 text-center mb-12">Update your Password</p>
                        <form onSubmit={handleResetPassword}>
                            <div className="mb-4">
                                <input type="text" value={password} required onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" />
                            </div>
                            <div className="mb-4">
                                <input type="text" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" />
                            </div>
                            <button type="submit" className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition mb-3 cursor-pointer" disabled={loading}>UPDATE PASSWORD</button>
                        </form>
                    </div>
                </div>
                {/* LEFT SIDE  */}
                <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
                    <div className="text-center h-100 mt-22">
                        <div className="flex justify-center mb-12">
                            <img src={logo_with_title} alt="logo" className="h-40 w-auto" />
                        </div>
                        <p className="text-xl text-grey-300 mb-20">"Your premier digital<br />library for borrowing<br />and reading books"</p>
                    </div>
                </div>
    
    
            </div>
        </>;
}

export default ResetPassword;
