import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/errorMiddlewares.js';
import { User } from '../models/userModel.js';

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find({ accountVerified: true });
    res.status(200).json({
        success: true,
        users,
    })
});

export const registerNewAdmin = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).lenght === 0) {
        return next(new ErrorHandler("Admin Avatar is Required!", 400));
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(new ErrorHandler("Please Fill All Fields!", 400));
    }
    const isRegistered = await User.findOne({ email, accountVerified: true });
    if (isRegistered) {
        return next(new ErrorHandler("User Already Registered!", 400));
    }
    if (password.lenght < 8 || password.lenght > 16) {
        return next(new ErrorHandler("Password Must be Between 8 to 16 Characters long!", 400));
    }

});
