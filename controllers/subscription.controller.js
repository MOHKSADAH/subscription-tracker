import Subscription from '../models/subscription.model.js';

// Create a new subscription
export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: 'Subscription created successfully',
            data: subscription,
        });
    } catch (e) {
        next(e);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        // check if the user is authorized to access this account
        if (req.user.id !== req.params.id) {
            const error = new Error('Not authorized to access this account');
            error.statusCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json;

        res.status(200).json({ success: true, data: subscriptions });
    } catch (e) {
        next(e);
    }
};
