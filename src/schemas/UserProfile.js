const { Schema, model } = require('mongoose');

const userProfileSchema = new Schema({
    userId: { type: String, required: true, },
    Cashapp: { type: String, required: false, },
    Paypal: { type: String, required: false, },
    balance: { type: Number, default: 0, required: false, },
    lastUpdate: { type: Date, required: false, },
    },

    {timestamps: true}
);

module.exports = model('UserProfile', userProfileSchema);