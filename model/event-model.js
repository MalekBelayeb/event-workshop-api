const mongoose = require('mongoose');
var fs = require('fs');

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

eventSchema.pre('findOneAndUpdate', async function(next) {

    if (!this._update.cover) return next()

    const docToUpdate = await this.model.findOne(this.getQuery());
    const pathToFile = `./uploads/${docToUpdate.cover}`
    if (fs.existsSync(pathToFile)) {
        fs.unlinkSync(pathToFile)
    }

    next()

})


module.exports = mongoose.model('Event', eventSchema);