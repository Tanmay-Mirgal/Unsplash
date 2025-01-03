import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true
        },
        firstName: {
            type: String,
            

        },
        lastName: {
            type: String,
            
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: ''
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],

        twitter: { type: String },
        instagram: { type: String },
        facebook: { type: String },

        website: { type: String },

        location: { type: String },
        bio: { type: String },
        dateOfBirth: Date,
        gender: String,
        verified: {
            type: Boolean,
            default: false
        },
        verifyToken: String,
        verifyTokenExpiry: Date,
        resetPasswordToken: String,
        resetPasswordTokenExpiry: Date
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;

