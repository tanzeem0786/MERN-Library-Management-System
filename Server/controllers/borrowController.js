import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/errorMiddlewares.js';
import { Borrow } from '../models/borrowModel.js';
import { Book } from '../models/bookModel.js'
import { User } from '../models/userModel.js';
import { calculateFine } from '../utils/fineCalculate.js';

export const recordBorrowedBooks = catchAsyncErrors(async (req, res, next) => {
    const { bookId } = req.params;
    const { email } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
        return next(new ErrorHandler("Book Not Found!", 400));
    }
    const user = await User.findOne({ email, accountVerified: true });
    if (!user) {
        return next(new ErrorHandler("User Not Found!", 400));
    }
    if (book.quantity === 0) {
        return next(new ErrorHandler("Book Not Available!", 400));
    }
    const isAlreadyBorrowed = user.borrowedBooks.find(
        (b) => b.bookId.toString() === bookId && b.returned === false
    );
    if (isAlreadyBorrowed) {
        return next(new ErrorHandler("Book Already Borrowed!", 400));
    }
    book.quantity -= 1;
    book.availability = book.quantity > 0;
    await book.save();

    user.borrowedBooks.push({
        bookId: book._id,
        bookTitle: book.title,
        borrowedBooks: new Date(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await user.save();
    await Borrow.create({
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        book: book._id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        price: book.price,
    });
    res.status(200).json({
        succuss: true,
        message: "Borrowed Book Recorded Successfully",
    })
});

export const returnBorrowBooks = catchAsyncErrors(async (req, res, next) => {
    const {bookId}  = req.params;
    const { email}  = req.body;
    const book = await Book.findById(bookId);
    if (!book) {
        return next(new ErrorHandler("Book Not Found!", 404));
    }
    const user = await User.findOne({ email, accountVerified: true });
    if (!user) {
        return next(new ErrorHandler("User Not Found!", 404));
    }
    const borrowedBooks = user.borrowedBooks.find(
        (b) => b.bookId.toString() === bookId && b.returned === false
    );
    if (!borrowedBooks) {
        return next(new ErrorHandler("You have not Borrowed this Book!", 400));
    }
    borrowedBooks.returned = true;
    await user.save();

    book.quantity += 1;
    book.availability = book.quantity > 0;
    await book.save();

    const borrow = await Borrow.findOne({
        book: bookId,
        "user.email": email,
        returnDate: null,
    });
    if (!borrow) {
        return next(new ErrorHandler("You have not Borrowed this Book!", 400));
    }
    borrow.returnDate = new Date();
    const fine = calculateFine(borrow.dueDate);
    borrow.fine = fine;
    await borrow.save();
    res.status(200).json({
        success: true,
        message: fine !== 0
            ? `The Book has Been Returned Successfully. The Total Charges, including a fine , are Rs.${fine + book.price}`
            : `The Book has Been Returned Successfully. The Total Charges are Rs.${book.price}`,
    })

});

export const borrowedBooks = catchAsyncErrors(async (req, res, next) => {
    const { borrowedBooks } = req.user;
    res.status(200).json({
        success: true,
        borrowedBooks,
    });

});

export const getBorrowedBooksForAdmin = catchAsyncErrors(async (req, res, next) => {
    const borrowedBooks = await Borrow.find();
    res.status(200).json({
        success: true,
        borrowedBooks,
    })
});

