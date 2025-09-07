import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Subscription name is required'],
            trim: true,
            minLength: 2,
            maxLength: 100,
        },
        price: {
            type: Number,
            required: [true, 'Subscription price is required'],
            min: [0, 'Subscription price must be greater than 0'],
        },
        currency: {
            type: String,
            enum: ['SAR', 'EUR', 'USD'],
            default: 'SAR',
        },
        frequency: {
            type: String,
            enum: ['daily', 'weekly', 'monthly', 'yearly'],
        },
        category: {
            type: String,
            enum: ['Food', 'Entertainment', 'Utilities', 'Health'],
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'cancelled', 'pending'],
            default: 'active',
        },
        startDate: {
            type: Date,
            required: true,
            validate: {
                validator: (value) => value <= new Date(),
                message: 'Start date cannot be in the future',
            },
        },
        renewalDate: {
            type: Date,
            validate: {
                validator: function (value) {
                    // Only validate if renewalDate is provided
                    if (!value) return true;
                    return value > this.startDate;
                },
                message: 'Renewal date cannot be before the start date',
            },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

// AUTO CALCULATE renewal date if missing
subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    // auto update Status
    if (this.renewalDate < new Date()) {
        this.status = 'inactive';
    }
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
