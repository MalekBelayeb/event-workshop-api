const Event = require('../model/event-model')


const createEvent = async(req, res) => {

    try {
        /*
        let { title, description, startDate, endDate, cover } = req.body

        let event = new Event({ title, description, startDate, endDate, cover })

        newEvent = await event.save()*/

        res.status(200).send({ success: true, newEvent: "" })

    } catch (err) {

        console.log(err)
        res.status(404).send({ success: false, message: err })

    }


}



module.exports = { createEvent }