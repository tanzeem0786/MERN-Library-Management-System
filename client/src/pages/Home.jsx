import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from 'react-icons/gi'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SideBar from '../layout/SideBar.jsx';
import UserDashboard from '../components/UserDashboard.jsx';
import AdminDashboard from '../components/AdminDashboard.jsx';
import BookManagement from '../components/BookManagement.jsx';
import Users from '../components/Users.jsx';
import Catalog from '../components/Catalog.jsx';
import MyBorrowedBooks from '../components/MyBorrowedBooks.jsx';
import ErrorBoundary from "../components/ErrorBoundary.jsx";
import Register from "./Register.jsx";


const Home = () => {

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [selectedComponents, setSelectedComponents] = useState("dashboard");
    const [loading, setLoading] = useState(true);

    const { user, isAuthenticated} = useSelector((state) => state.auth);

    // Authentication check
    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false);
            return <Navigate to={"/login"} />;
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);
    
    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }
    // if (!isAuthenticated) {
    //     return <Navigate to={"/login"} />;
    // }


    return (
        <>
            <div className="relative md:pl-64 flex flex-row min-h-screen overflow-y-auto bg-grey-100">
                {/* Mobile Hamburger Menu */}
                <div className="md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white cursor-pointer hover:bg-gray-800 transition">
                    <GiHamburgerMenu
                        className="text-2xl"
                        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                    />
                </div>
                {/* Sidebar */}
                <SideBar
                    isSideBarOpen={isSideBarOpen}
                    setIsSideBarOpen={setIsSideBarOpen}
                    setSelectedComponent={setSelectedComponents}
                />
                {/* <div className="flex-1 overflow-y-auto overflow-hidden overflow-x-scroll"> */}

                    {(() => {
                        switch (selectedComponents) {
                            case "Dashboard":
                                return user?.role === "User" ? (
                                    <UserDashboard />
                                ) : (
                                    <AdminDashboard />
                                );
                                break;
                            case "Books":
                                return <BookManagement />;
                                break;
                            case "Catalog":
                                if (user?.role === "Admin") {
                                    return <Catalog />
                                }
                                break;
                            case "Users":
                                if (user?.role === "Admin") {
                                    return <Users />
                                }
                                break;
                            case "My Borrowed Books":
                                if (user?.role === "User") {
                                    return <MyBorrowedBooks />
                                }
                                break;
                            default:
                                return user?.role === "User" ? (
                                    <UserDashboard />
                                ) : (
                                    <AdminDashboard />
                                );
                                break;
                        }
                    })()}
                {/* </div> */}
            </div>
        </>
    );
};

export default Home;