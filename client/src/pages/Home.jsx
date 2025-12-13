import React, { useState } from "react";
import { GiHamburgerMenu } from 'react-icons/gi'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SideBar from '../layout/SideBar.jsx';



const Home = () => {

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [selectedComponents, setSelectedComponents] = useState(false);

    const { user, isAuthenticated } = useSelector((state) => state.auth);
    if (!isAuthenticated) {
        console.log("home rendered");
       return <Navigate to={"/login"} />;
    }
    return <>
        <div className="relative md:pl-64 flex min-h-screen bg-grey-100">
            <div className="md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white ">
                {/* <GiHamburgerMenu className="text-2xl" onClick={setIsSideBarOpen(!isSideBarOpen)} /> */}
            </div>
            <SideBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} setSelectedComponents={setSelectedComponents} />
        </div>
    </>;
};

export default Home;