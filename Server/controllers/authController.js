import { send } from 'process';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/errorMiddlewares.js';
import { User } from '../models/userModel.js';
import bcrypt from "bcrypt";
import crypto from 'crypto';
import { sendVerificationCode } from '../utils/sendVerificationCode.js';
import { sendToken } from '../utils/sendTokens.js';

export const register = catchAsyncErrors(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return next(new ErrorHandler("Please Enter All Fields!", 400));

        }
        const isRegistered = await User.findOne({ email, accountVerified: true });
        if (isRegistered) {
            return next(new ErrorHandler("User Already Exist", 400));
        }
        const registrationAttemptByUser = await User.find({ email, accountVerified: true });
        if (registrationAttemptByUser.length >= 5) {
            return next(new ErrorHandler("You Have Exceeded The Number of Registration Attempts! Please Contact Support Team.", 400));
        }
        if (password.length < 8 || password.length > 16) {
            return next(new ErrorHandler("Password Must be Between 8 and 16 Characters!", 400));

        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const verificationCode = await user.getVerificationCode();
        await user.save();
        sendVerificationCode(verificationCode, email, res);

    } catch (err) {
        next(err);
    }
});

export const verifyOtp = catchAsyncErrors(async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp)
        return next(new ErrorHandler("Email or Otp is Missing!", 400))

    try {
        const userAllEntries = await User.find({
            email,
            accountVerified: false
        }).sort({ createdAt: -1 })
        if (!userAllEntries || userAllEntries.length === 0) {
            return next(new ErrorHandler("No OTP request found for this email.", 404));
        }
        let user;
        if (userAllEntries.length > 1) {
            user = userAllEntries[0];
            await User.deleteMany({
                _id: { $ne: user._id },
                email,
                accountVerified: false
            })
        } else {
            user = userAllEntries[0];
        }

        if (user.verificationCode !== Number(otp)) {
            return next(new ErrorHandler("Invalid Otp!", 400));
        }

        const currentTime = Date.now();

        const verificationCodeExpire = new Date(
            user.verificationCodeExpire
        ).getTime();

        if (currentTime > verificationCodeExpire) {
            return next(new ErrorHandler("Otp Expired!", 400))
        }
        user.accountVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpire = null;
        await user.save({ validateModifiedOnly: true });

        sendToken(user, 200, "Account Verified", res)
        console.log("Selected User:", user);
        console.log("User Entries Found:", userAllEntries);

    } catch (err) {
        console.log("Request Body:", req.body);

        console.error("Otp Error: ", err)
        return next(new ErrorHandler("Internal Server Error!", 500))
    }
});

export const login = catchAsyncErrors(async(req, res, next) => {
    const {email, password} = req.body;
    if( !email || !password ) {
        return next(new ErrorHandler("Please Enter All Fields!", 400));
    }
    const user = await User.findOne({email, accountVerified: true}).select("+password");
    if(!user) {
        return next(new ErrorHandler("Invalid email or password!", 400))
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password!", 400))
    }
    sendToken(user, 200, "User is Login Successfully.", res);

});

export const logOut = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        messaga: "Logged Out Successfully.",
    })
});

export const getUser = catchAsyncErrors(async(req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});