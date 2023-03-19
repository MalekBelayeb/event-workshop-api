const Event = require('../model/event-model')


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

        numPerPage = parseInt(pageSize)
        pageNumber = parseInt(page)

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


module.exports = { createEvent, getEvents, getEventsByTitle }