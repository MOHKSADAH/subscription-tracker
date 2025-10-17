import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import {
    createSubscription,
    getUserSubscriptions,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
    cancelSubscription,
    getUpcomingRenewals,
} from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

// Order matters: specific routes before parameterized routes
subscriptionRouter.get('/upcoming-renewals', authorize, getUpcomingRenewals);
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.get('/', authorize, getAllSubscriptions);
subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.get('/:id', authorize, getSubscriptionById);
subscriptionRouter.put('/:id', authorize, updateSubscription);
subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

export default subscriptionRouter;
