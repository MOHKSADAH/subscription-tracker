import Subscription from '../models/subscription.model.js';
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        });

        res.status(201).json({ success: true, data: { subscription, workflowRunId } });
    } catch (e) {
        next(e);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        // Check if the user is the same as the one in the token
        if (req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({ success: true, data: subscriptions });
    } catch (e) {
        next(e);
    }
};

export const getAllSubscriptions = async (req, res, next) => {
    try {
        // Return only the authenticated user's subscriptions
        const subscriptions = await Subscription.find({ user: req.user._id });

        res.status(200).json({ success: true, data: subscriptions });
    } catch (e) {
        next(e);
    }
};

export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        // Verify user owns the subscription
        if (subscription.user.toString() !== req.user.id) {
            const error = new Error('You are not authorized to access this subscription');
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({ success: true, data: subscription });
    } catch (e) {
        next(e);
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        // Verify user owns the subscription
        if (subscription.user.toString() !== req.user.id) {
            const error = new Error('You are not authorized to update this subscription');
            error.statusCode = 403;
            throw error;
        }

        // Update subscription fields
        const updatedSubscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: updatedSubscription });
    } catch (e) {
        next(e);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        // Verify user owns the subscription
        if (subscription.user.toString() !== req.user.id) {
            const error = new Error('You are not authorized to delete this subscription');
            error.statusCode = 403;
            throw error;
        }

        await Subscription.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'Subscription deleted successfully' });
    } catch (e) {
        next(e);
    }
};

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        // Verify user owns the subscription
        if (subscription.user.toString() !== req.user.id) {
            const error = new Error('You are not authorized to cancel this subscription');
            error.statusCode = 403;
            throw error;
        }

        // Update status to cancelled
        subscription.status = 'cancelled';
        await subscription.save();

        res.status(200).json({ success: true, data: subscription });
    } catch (e) {
        next(e);
    }
};

export const getUpcomingRenewals = async (req, res, next) => {
    try {
        // Get days parameter from query string, default to 30 days
        const days = parseInt(req.query.days) || 30;

        // Calculate the date range
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + days);

        // Find active subscriptions with renewal dates in the specified range
        const subscriptions = await Subscription.find({
            user: req.user._id,
            status: 'active',
            renewalDate: {
                $gte: today,
                $lte: futureDate,
            },
        }).sort({ renewalDate: 1 });

        res.status(200).json({ success: true, data: subscriptions });
    } catch (e) {
        next(e);
    }
};
