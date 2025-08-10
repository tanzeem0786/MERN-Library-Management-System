import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
    },
    accountVerified: {
        type: Boolean,
        default: false,
    },
    borrowedBooks: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Borrow",
            },
            returned: {
                type: Boolean,
                default: false,
            },
            bookTitle: String,
            borrowedDate: Date,
            dueDate: Date,
        }
    ],
    avatar: {
        public_ID: String,
        url: String,
    },
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},
    {
        timestamps: true,
    }
);

userSchema.methods.getVerificationCode = function () {
    const generateRandomFiveDigits = () => {
        const firstDigit = Math.floor(Math.random() * 9) + 1;
        const remainingDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return parseInt(firstDigit + remainingDigits);
    };

    const verificationCode = generateRandomFiveDigits(); 
    this.verificationCode = verificationCode;
    this.verificationCodeExpire = Date.now() + 15 * 60 * 1000;
    return verificationCode;
};

userSchema.methods.generateTokens = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    })
};

export const User = mongoose.model("User", userSchema);
