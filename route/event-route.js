const router = require('express').Router();
const { verifyToken } = require('../middleware/verify-token')
const { verifyRole } = require('../middleware/verify-role')
const { uploadFile } = require('../middleware/upload-file')

const eventController = require('../controller/event-controller')

/**
 * as a user i can create new event  
 */

router.post('/v1/event/create', uploadFile(), verifyToken, eventController.createEvent);

/**
 * as a user i can get all events  
 */

router.get('/v1/events', verifyToken, eventController.getEvents);

/**
 * as a user i can search for events by title  
 */

router.get('/v1/events/title/:title', verifyToken, eventController.getEventsByTitle);


module.exports = router