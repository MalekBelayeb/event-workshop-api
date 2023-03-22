const Event = require('../model/event-model')
var ObjectId = require('mongoose').Types.ObjectId;

const createEvent = async(req, res) => {

    try {

        let { title, description, startDate, endDate } = req.body
        let event = new Event({ title, description, startDate, endDate, cover: req.file.filename, organizer: req.user.id })
        newEvent = await event.save()

        res.status(200).send({ success: true, newEvent })

    } catch (err) {

        console.log(err)
        res.status(404).send({ success: false, message: err })

    }
}


const getEvents = async(req, res) => {

    try {

        let { pageSize, page } = req.query

        numPerPage = parseInt(pageSize) // 5
        pageNumber = parseInt(page) // 6

        const events = await Event.find().populate('organizer').sort('startDate').limit(numPerPage).skip(pageNumber * numPerPage)
        const total = await Event.find()

        res.status(200).send({ success: true, total: total.length, events })

    } catch (err) {

        console.log(err)
        res.status(404).send({ success: false, message: err })

    }

}


const getEventsByTitle = async(req, res) => {

    try {

        let { title } = req.params

        const events = await Event.find({ title: { $regex: title, $options: 'i' } }).populate('organizer')

        res.status(200).send({ success: true, total: events.length, events })

    } catch (err) {

        console.log(err)
        res.status(404).send({ success: false, message: err })

    }

}

const getEventById = async(req, res) => {

    try {

        let { id } = req.params

        const event = await Event.findById(id).populate('organizer')

        res.status(200).send({ success: true, event })

    } catch (err) {

        console.log(err)
        res.status(404).send({ success: false, message: err })

    }

}




const updateEvent = async(req, res) => {

    try {

        let { id, title, description, startDate, endDate } = req.body
        let cover = req.file.filename

        if (!ObjectId.isValid(id)) return res.status(404).send({ success: false, message: "Missing or wrong id format" })

        let updatedEvent = await Event.findOneAndUpdate({ _id: id }, { title, description, startDate, endDate, cover }, { new: true })

        return res.status(200).send({ success: true, updatedEvent })

    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: err })
    }
}

module.exports = { createEvent, getEvents, getEventsByTitle, updateEvent, getEventById }