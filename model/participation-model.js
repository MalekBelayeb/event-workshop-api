const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },
    status: {
        type: String,
        enum: ['accepted', 'pending', 'refused']
    },

})

module.exports = mongoose.model('Participation', participationSchema);