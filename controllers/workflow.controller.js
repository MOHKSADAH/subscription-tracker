import { createRequire } from 'module';
import dayjs from 'dayjs';
const require = createRequire(import.meta.url);
import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';

const { serve } = require('@upstash/workflow/express');

const REMINDERS = [7, 5, 2, 1, 0]; // days before renewal

export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== 'active') return;

    const renewalDate = new dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(
            `Renewal date has passed for subscription ${subscription._id}. Stopping Workflow`
        );
    }

    for (const daysBefore of REMINDERS) {
        //
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
        }
        if (dayjs().isSame(reminderDate, 'day')) {
            await triggerReminder(context, `Reminder ${daysBefore} days before`, subscription);
        }
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    // Fetch subscription details from your database
    // Example: const subscription = await Subscription
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    });
};

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder: ${date.toString()}`);
    await context.sleepUntil(label, date.toDate());
};
const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);
        // Logic to send email/SMS notification

        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription,
        });
    });
};
