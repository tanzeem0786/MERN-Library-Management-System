import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { ErrorHandler } from '../middlewares/errorMiddlewares.js'
import express from 'express';
import { Book } from '../models/bookModel.js';


export const addBook = catchAsyncErrors(async (req, res, next) => {
    const { title, author, description, price, quantity } = req.body;
    if (!title || !author || !description || !price || !quantity) {
        return next(new ErrorHandler("Please Fill all Fields!", 400));
    }
    const book = await Book.create({
        title, author, description, price, quantity,
    });
    res.status(201).json({
        success: true,
        message: "Book Added Successfully!",
        book,
    });
});

export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
    const books = await Book.find();
    res.status(200).json({
        success: true,
        books,
    });
});

export const deleteBook = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const book = await Book.findById(id);
    if(!book) {
        return next(new ErrorHandler("Book Not Found!", 400));
    }
    await book.deleteOne();
    res.status(200).json({
        success: true,
        message: "Book Deleted Successfully!",
    })

})
