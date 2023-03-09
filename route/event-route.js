const router = require('express').Router();
const { verifyToken } = require('../middleware/verify-token')
const { verifyRole } = require('../middleware/verify-role')
const { uploadFile } = require('../middleware/upload-file')

const eventController = require('../controller/event-controller')

/**
 * as a user i can create new event  
 */
router.post('/v1/event/create', uploadFile(), eventController.createEvent);


module.exports = router