import { send } from 'process';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/errorMiddlewares.js';
import { User } from '../models/userModel.js';
import bcrypt from "bcrypt";
import crypto from 'crypto';
import { sendVerificationCode } from '../utils/sendVerificationCode.js';

export  const register = catchAsyncErrors(async(req, res, next) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return next(new ErrorHandler("Please Enter All Fields!", 400));

        }
        const isRegistered = await User.findOne({email, accountVerified: true});
        if(isRegistered) {
            return next(new ErrorHandler("User Already Exist", 400));
        }
        const registrationAttemptByUser = await User.find({email, accountVerified: true});
        if(registrationAttemptByUser.length >= 5) {
            return next(new ErrorHandler("You Have Exceeded The Number of Registration Attempts!, Please Contact Support Team.", 400));
        }
        if(password.length < 8 || password.length > 16) {
            return next(new ErrorHandler("Password Must be Between 8 and 16 Characters!", 400));

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, 
            email,
            password: hashedPassword,
        });
        const verificationCode = await user.getVerificationCode();
        console.log(verificationCode);
        
        await user.save(); 
        sendVerificationCode(verificationCode, email, res);

    } catch (err) {
        next(err);
    }
});