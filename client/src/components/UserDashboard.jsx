import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import { useDispatch, useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import Headers from '../layout/Header.jsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";
import ErrorBoundary from "./ErrorBoundary.jsx";
import BookManagement from "./BookManagement.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {
  const navigate = useNavigate();
  const { settingPopup } = useSelector((state) => state.popup);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    let numberOfTotalBorrowedBooks = userBorrowedBooks.filter((book) => book.returned === false);
    let numberOfTotalReturnBooks = userBorrowedBooks.filter((book) => book.returned === true);
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks);
    setTotalReturnedBooks(numberOfTotalReturnBooks);
  }, [userBorrowedBooks]);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [{
      data: [totalBorrowedBooks.length, totalReturnedBooks.length],
      backgroundColor: ["#3D3E3E", "#151619"],
      hoverOffset: 4,
  }],
  };

  return <>
    <main className="relative flex-1 p-6 ">
      <Headers />
      <div className="flex flex-col-reverse xl:flex-row">
        {/* LEFT SIDE */}
        <div className="flex flex-4 flex-col gap-7 lg:gap-7 lg:py-5 justify-between  xl:min-h-[85.5vh]  ">
          <div className="flex flex-col gap-7 flex-4">
            <div className="flex flex-col lg:flex-row gap-7 overflow-y-hidden">
              <div onClick={() => navigate('/my-borrowed-books')} className="flex items-center gap-3 bg-gray-200 p-5 w-80 h-20 overflow-y-hidden rounded-lg transition hover:shadow-inner hover:bg-gray-300 duration-300 cursor-pointer">
                <span className="w-0.5 bg-black h-20 lg:h-full"></span>
                <span className="bg-gray-300 h-10 lg:h-full min-w-10 flex justify-center items-center rounded-lg">
                  <img src={bookIcon} alt="Book Icon" className="w-8 h-8" />
                </span>
                <p className="text-lg xl:text-xl font-semibold">Your Borrowed Book List</p>
              </div>
              <div onClick={() => navigate('/my-borrowed-books')} className="flex items-center gap-3 bg-gray-200 p-5 w-80 h-20 overflow-y-hidden rounded-lg transition hover:shadow-inner hover:bg-gray-300 duration-300 cursor-pointer">
                <span className="w-0.5 bg-black h-20 lg:h-full"></span>
                <span className="bg-gray-300 h-10 lg:h-full  min-w-10 flex justify-center items-center rounded-lg">
                  <img src={returnIcon} alt="Return Icon" className="w-8 h-8" />
                </span>
                <p className="text-lg xl:text-xl font-semibold">Your Returned Book List</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-7">
              <div onClick={() => navigate('/book-management')} className="flex items-center gap-3 bg-gray-200 p-5 w-80 h-20 overflow-y-hidden rounded-lg transition hover:shadow-inner hover:bg-gray-300 duration-300 cursor-pointer">
                <span className="w-0.5 bg-black h-10 "></span>
                <span className="bg-gray-300 h-10 min-w-10 flex justify-center items-center rounded-lg">
                  <img src={browseIcon} alt="Browse Icon" className="w-8 h-8" />
                </span>
                <p className="text-lg xl:text-xl font-semibold">let's Browse Books Inventory</p>
              </div>
              {/* <img src={logo_with_title} alt="logo" className="hidden lg:block w-auto justify-end" /> */}
            </div>
          </div>
          <div className="bg-gray-300 p-7 text-lg sm:text-xl xl:text-3xl mr-5 2xl:text-4xl min-h-52 font-semibold relative flex-3 flex justify-center items-center rounded-2xl">
            <h4 className="overflow-y-hidden">"Embarking on the Journey of Reading Forsters Personal Growth, Nurturing a Path Towards Excellence and the Refinedment of Character"</h4>
            <p className="text-gray-700 text-sm sm:text-lg absolute right-8.75 sm:right-19.5 bottom-2.5">~ BookWorm Team</p>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex-2 flex-col gap-7 lg:flex-row lg:items-center xl:flex-col
         justify-between xl:gap-20 py-5 ">
          <div className="xl:flex-4 flex items-end w-full content-center h-64 xl:h-96">   
            <Pie data={data} options={{ cutout: 0 }} className="mx-auto lg:mx-0 w-full h-full" />
          </div>
          <div className="flex bg-gray-200 items-center p-8 w-full sm:w-100 xl:w-fit
   mr-5 xl:p-3 2xl:p-6 gap-5 h-fit xl:min-h-37.5 xl:flex-1 rounded-lg  ">
            <img src={logo} alt="logo" className="w-auto h-12 2xl:h-20" />
            <span className="w-0.5 bg-gray-900 h-20 2xl:h-20"></span>
            <div className="flex flex-col gap-5">
              <p className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#3D3E3E]"></span>
                <span>Total Borrowed Books</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#151619]"></span>
                <span>Total Borrowed Books</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>;
};

export default UserDashboard;