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


const Home = () => {

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [selectedComponents, setSelectedComponents] = useState("dashboard");
    const [loading, setLoading] = useState(true);

    const { user, isAuthenticated } = useSelector((state) => state.auth);

    // Authentication check
    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    // if (!isAuthenticated) {
    //     return <Navigate to={"/login"} />;
    // }

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    // // Close sidebar on mobile when component is selected
    // const handleComponentSelect = (component) => {
    //     setSelectedComponents(component);
    //     setIsSideBarOpen(false);
    // };
    return (
        <>
            <div className="relative md:pl-64 flex min-h-screen bg-grey-100">
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
                    // setSelectedComponents={handleComponentSelect}
                />

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
                            if (user.role === "Admin") {
                                return <Catalog />
                            }
                            break;
                        case "Users":
                            if (user.role === "Admin") {
                                return <Users />
                            }
                            break;
                        case "My Borrowed Books":
                            if (user.role === "Admin") {
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
                {/* Main Content Area */}
                <div className="flex-1 p-4 md:p-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || "User"}!</h1>
                        <p className="text-gray-600">Selected: {selectedComponents}</p>
                        {/* Add your dashboard or other components here based on selectedComponents */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;