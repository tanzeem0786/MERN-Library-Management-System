import React from 'react'
import { useDispatch } from 'react-redux';
import {recordBorrowBook} from '../store/slices/borrowSlice.js'
import { useState } from 'react';
import { toggleRecordBookPopup } from '../store/slices/popupSlice';

const RecordBookPopup = ({bookId}) => {
  const [borrowerEmail, setBorrowerEmail] = useState("");
  const dispatch = useDispatch();

  const handleRecordBook = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("borroweEmail", borrowerEmail)   
    dispatch(recordBorrowBook(borrowerEmail, bookId))
  }

  return <>
    <div className="fixed inset-0 bg-black opacity-95 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg opacity-100 shadow-lg md:w-1/3 ">
      <div className="px-6 ">
        <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold mb-4">Record Book</h3>
        <button className="text-3xl cursor-pointer" onClick={() => dispatch(toggleRecordBookPopup())}>&times;</button>
        </div>
        <form onSubmit={handleRecordBook}>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-900 font-medium">User Email</label>
            <input type="email" required value={borrowerEmail} onChange={(e) => setBorrowerEmail(e.target.value)} placeholder="Borrower's Email" className="w-full px-4 py-2 border-2 border-black rounded-md" />
          </div>
          <div className="flex justify-end space-x-4">
            <button type='button' className='px-4 py-2 bg-gray-200   text-black rounded-md hover:bg-gray-400 cursor-pointer' onClick={() => dispatch(toggleRecordBookPopup())}>Close</button>
            <button type='submit' className='px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 cursor-pointer'>Record</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  </>;
}

export default RecordBookPopup;