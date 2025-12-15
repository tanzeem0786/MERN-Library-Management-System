import express from 'express';
import { borrowedBooks, getBorrowedBooksForAdmin, recordBorrowedBooks, returnBorrowBooks } from '../controllers/borrowController.js';
import { isAuthenticated, isAuthorized } from '../middlewares/authMIddlewares.js';

const router = express.Router();

router.post('/record-borrow-book/:bookId', isAuthenticated, isAuthorized("Admin"), recordBorrowedBooks);

router.get('/borrowed-books-by-users', isAuthenticated, isAuthorized("Admin"), getBorrowedBooksForAdmin);

router.get('/my-borrowed-books', isAuthenticated, borrowedBooks);

router.put('/return-borrowed-book/:bookId', isAuthenticated, isAuthorized("Admin"), returnBorrowBooks);

export default router;
