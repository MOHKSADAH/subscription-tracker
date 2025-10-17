import User from '../models/user.model.js';
import Subscription from '../models/subscription.model.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// FETCH Users from the database
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error('User already exists with this email');
            error.statusCode = 400;
            throw error;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Remove password from response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: userResponse,
        });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        // Verify user can only update their own account
        if (req.user.id !== req.params.id) {
            const error = new Error('You are not authorized to update this user');
            error.statusCode = 403;
            throw error;
        }

        const { name, email, password } = req.body;
        const updateData = {};

        // Check if email is being changed and if it's unique
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
            if (existingUser) {
                const error = new Error('Email already in use');
                error.statusCode = 400;
                throw error;
            }
            updateData.email = email;
        }

        if (name) {
            updateData.name = name;
        }

        // Hash new password if provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        }).select('-password');

        if (!updatedUser) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Verify user can only delete their own account
        if (req.user.id !== req.params.id) {
            const error = new Error('You are not authorized to delete this user');
            error.statusCode = 403;
            throw error;
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        // Delete all user's subscriptions
        await Subscription.deleteMany({ user: req.params.id }, { session });

        // Delete the user
        await User.findByIdAndDelete(req.params.id, { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: 'User and all associated subscriptions deleted successfully',
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};
