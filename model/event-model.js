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

    lat: {
        type: Number,
    },

    long: {
        type: Number,
    },

    isVisible: {
        type: Boolean,
        required: true,
    },

})

module.exports = mongoose.model('Event', eventSchema);