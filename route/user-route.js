const router = require('express').Router();
const { verifyToken } = require('../middleware/verify-token')
const { verifyRole } = require('../middleware/verify-role')
const userController = require('../controller/user-controller')

/**
 * as a user i can login  
 */
router.post('/v1/user/login', userController.signinUser);

/**
 * signup a new user  
 */
router.post('/v1/user/signup', userController.signupUser);

/**
 * as an admin i can see all accounts 
 */
router.get('/v1/users', verifyToken, verifyRole(["admin", "user"], true), userController.getUsers);

/**
 * as an admin i can disable or enable an account 
 */
router.put('/v1/user/status/edit', userController.editStatus);


module.exports = router;