import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'username is required'],
            trim: true,
            minLength: 2,
            maxLength: 50,
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            minLength: 5,
            maxLength: 255,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            minLength: 6,
            maxLength: 1024,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
// {name: 'John Doe', email: 'john@example.com', password: 'securepassword'}
export default User;
