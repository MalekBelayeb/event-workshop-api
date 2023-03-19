const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
    },

    startDate: {
        type: Date,
    },

    endDate: {
        type: Date,
    },

    cover: {
        type: String,
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lat: {
        type: Number,
    },

    long: {
        type: Number,
    },

    isVisible: {
        type: Boolean,
        default: false
    },

})

module.exports = mongoose.model('Event', eventSchema);