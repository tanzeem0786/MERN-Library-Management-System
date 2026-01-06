import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddBookPopup } from "../store/slices/popupSlice.js";
import { addBook, fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice.js";
import { toast } from "react-toastify";

const AddBookPopup = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const handleAddBook = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("author", author);
    data.append("quantity", quantity);
    data.append("price", price);
    data.append("description", description);
    dispatch(addBook(data));
  };
  
  return <>
    <div className="fixed inset-0 bg-black opacity-95 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg opacity-100 shadow-lg md:w-1/3 ">
        <div className="px-6 ">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold mb-4">Add Book</h3>
            <button className="text-3xl cursor-pointer" onClick={() => dispatch(toggleAddBookPopup())}>&times;</button>
          </div>
          <form onSubmit={handleAddBook}>
            <div className="mb-4">
              <label htmlFor="" className="block text-gray-900 font-medium">Book Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Book Title" className="w-full px-4 py-2 border-2 border-black rounded-md" />
              <label htmlFor="" className="block text-gray-900 font-medium">Author</label>
              <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author's Name" className="w-full px-4 py-2 border-2 border-black rounded-md" />
              <label htmlFor="" className="block text-gray-900 font-medium">Book Quantity</label>
              <input type="number" required value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-4 py-2 border-2 border-black rounded-md" />
              <label htmlFor="" className="block text-gray-900 font-medium">Book Price(Price for Borrowing)</label>
              <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2 border-2 border-black rounded-md" />
              <label htmlFor="" className="block text-gray-900 font-medium">Book Description</label>
              <textarea required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Book's Description" rows={4} className="w-full px-4 py-2 border-2 border-black rounded-md" />
            </div>
            <div className="flex justify-end space-x-4">
              <button type='button' className='px-4 py-2 bg-gray-200   text-black rounded-md hover:bg-gray-400 cursor-pointer' onClick={() => dispatch(toggleAddBookPopup())}>Close</button>
              <button type="submit" className='px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 cursor-pointer'>ADD</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>;
};

export default AddBookPopup;