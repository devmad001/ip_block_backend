const mongoose = require('mongoose');

const blockedIPSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
        unique: true
    },
    reason: {
        type: String,
        required: true
    },
    blockedAt: {
        type: Date,
        default: Date.now
    },
    blockedBy: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('BlockedIP', blockedIPSchema); 