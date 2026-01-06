import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';
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
    if (!req.files || Object.keys(req.files).length === 0) {
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
    if (password.length < 8 || password.length > 16) {
        return next(new ErrorHandler("Password Must be Between 8 to 16 Characters long!", 400));
    }
    const { avatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(avatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath, {
            folder: "LIBRARY_MANEGEMENT_SYSTEM_ADMIN_AVATARS"
        }
    );
    if(!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:", 
            cloudinaryResponse.error || "Unknown  Cloudinary Error!"
        );
        return next(new ErrorHandler("Failed to Upload Avatar Image to Cloudinary!", 400));
    }
    const admin = await User.create({
        name, 
        email,
        password: hashedPassword,
        role: "Admin",
        accountVerified: true,
        avatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });
    res.status(201).json({
        success: true,
        message: "Admin Registered Successfully!",
        admin,
    });
});
