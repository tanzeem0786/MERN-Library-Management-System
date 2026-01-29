import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminIcon from "../assets/user.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import logo from "../assets/black-logo.png";
import {  useSelector } from "react-redux";
import Header from "../layout/Header.jsx";
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);
  // const { settingPopup } = useSelector((state) => state.popup);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState((books && books.length) || 0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    let numberOfUsers = users.filter((user) => user.role === "User");
    let numberOfAdmins = users.filter((user) => user.role === "Admin");
    setTotalUsers(numberOfUsers.length);
    setTotalAdmin(numberOfAdmins.length);
    let numberOfTotalBorrowedBooks = allBorrowedBooks.filter((book) => book.returnDate === null);
    let numberOfTotalReturnBooks = allBorrowedBooks.filter((book) => book.returnDate !== null);
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks);
    setTotalReturnedBooks(numberOfTotalReturnBooks);
  }, [users, allBorrowedBooks]);
  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks.length, totalReturnedBooks.length],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 4,
      }
    ],
  };



  return <>
    <main className="relative flex-1 p-6 ">
      <Header />
      <div className="flex flex-col-reverse xl:flex-row">
        {/* LEFT SIDE */}
        <div className="flex-2 flex-col gap-7 lg:flex-row flex lg:items-center xl:flex-col justify-between xl:gap-20 py-5">
          <div className="xl:flex-4 flex items-end w-full content-center">
            <Pie data={data} options={{ cutout: 0 }} className="mx-auto lg:mx-0 w-full h-auto" />
          </div>
          <div className="flex bg-gray-100 items-center p-8 w-full sm:w-100 xl:w-fit
   mr-5 xl:p-3 2xl:p-6 gap-5 h-fit xl:min-h-37.5 xl:flex-1 rounded-lg" >
            <img src={logo} alt="logo" className="w-auto xl:flex-1 rounded-lg" />
            <span className="w-0.5 bg-black h-full"></span>
            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#3D3E3E]"></span>
                <span>Total Borrowed Books</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#151619]"></span>
                <span>Total Returned Books</span>
              </p>
            </div>

          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex flex-4 flex-col gap-7 lg:gap-7 lg:py-5 justify-between  xl:min-h-[85.5vh]">
          <div className="flex flex-col-reverse lg:flex-row  gap-7 flex-4">
            <div className="flex flex-col gap-7 flex-1">
              <div onClick={() => navigate('/users')} className="flex items-center gap-3 bg-gray-100 p-5 max-h-30 overflow-y-hidden rounded-lg transition hover:shadow-inner hover:bg-gray-200 duration-300 w-full lg:max-w-90 cursor-pointer">
                <span className="bg-gray-300 h-10 min-w-10 flex justify-center items-center rounded-lg">
                  <img src={usersIcon} alt="userIcon" className="w-8 h-8" />
                </span>
                <span className="bg-black w-0.5 h-20 lg:h-full "></span>
                <div className="flex flex-col items-center gap-2">
                  <h4 className="font-black text-3xl ">{totalUsers}</h4>
                  <p className="font-semibold text-gray-700 text-sm">Total User Base</p>
                </div>

              </div>
              <div onClick={() => navigate('/book-management')} className="flex items-center gap-3 bg-gray-100 p-5 max-h-30 overflow-y-hidden rounded-lg transition hover:shadow-inner hover:bg-gray-200 duration-300 w-full lg:max-w-90 cursor-pointer">
                <span className="bg-gray-300 h-10 min-w-10 flex justify-center items-center rounded-lg">
                  <img src={bookIcon} alt="Book Icon" className="w-8 h-8" />
                </span>
                <span className="bg-black w-0.5 h-20 lg:h-full "></span>
                <div className="flex flex-col items-center gap-2">
                  <h4 className="font-black text-3xl ">{totalBooks}</h4>
                  <p className="font-semibold text-gray-700 text-sm">Total Books Count</p>
                </div>

              </div>
              <div className="flex items-center gap-3 bg-gray-100 p-5 max-h-30 overflow-y-hidden rounded-lg   duration-300 w-full lg:max-w-90 ">
                <span className="bg-gray-300 h-10 min-w-10 flex justify-center items-center rounded-lg">
                  <img src={adminIcon} alt="Admin Icon" className="w-8 h-8" />
                </span>
                <span className="bg-black w-0.5 h-20 lg:h-full "></span>
                <div className="flex flex-col items-center gap-2">
                  <h4 className="font-black text-3xl ">{totalAdmin}</h4>
                  <p className="font-semibold text-gray-700 text-sm">Total Admin</p>
                </div>

              </div>
            </div>
            <div className="flex flex-col lg:flex-row flex-1">
              <div className="flex flex-col lg:flex-row flex-1 items-center justify-center">
                <div className="bg-gray-100 p-5 rounded-lg shadow-lg h-full flex flex-col justify-center items-center gap-4">
                  <img src={user && user.avatar?.url} alt="avatar" className="rounded-full w-32 h-32 object-cover" />
                  <h2 className="text-xl 2xl:text-2xl font-semibold text-center">{user && user.name}</h2>
                  <p className="text-gray-600 text-sm 2xl:text-base text-center">Welcome to your Admin Dashboard. Here You can manage all the Settings and Monitor the Statistics.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:flex bg-gray-100 p-7 text-lg sm:text-xl xl:text-3xl 2xl:text-4xl min-h-52 font-semibold relative flex-3 justify-center items-center rounded-2xl">
            <h4 className="overflow-y-hidden">"Embarking on the Journey of Reading Forsters Personal Growth, Nurturing a Path Towards Excellence and the Refinedment of Character"</h4>
            <p className="text-gray-700 text-sm sm:text-lg absolute right-8.75 sm:right-19.5 bottom-2.5">~ BookWorm Team</p>
          </div>


        </div>
      </div>

    </main>
  </>;
};

export default AdminDashboard;