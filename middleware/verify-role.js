const User = require('../model/user-model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/**
 * 
 * Middleware function that verify user's role and check for his account status
 *  
 * @param { string } user.id - Id user received from previous middleware 
 * @param { string[] } acceptedRoles - Array that contain allowed roles to accept
 * @param { boolean } checkStatus - Flag used to check for user's account status (active: true | false)
 * 
 * @return 
 * @status 403 User id has an invalid format
 * @status 403 User account does not exists
 * @status 403 User not allowed for this action
 * @status 403 User account is not active
 * 
 */

const verifyRole = function(acceptedRoles, checkStatus) {

    return (req, res, next) => {

        if (!ObjectId.isValid(req.user.id)) {

            return res.status(403).send({ success: false, message: "User id has an invalid format" })

        } else {

            let user = User.findById(user.id)
            if (!user) return res.status(403).send({ success: false, message: "User account does not exists" })
            if (checkStatus) {
                if (!user.isActive) return res.status(403).send({ success: false, message: "User account is not active" })
            }

            if (Array.isArray(acceptedRoles)) {

                if (acceptedRoles.includes(user.role)) {
                    next()
                } else {
                    res.status(403).send({ success: false, message: "User role not allowed for this action" })
                }

            } else {
                res.status(403).send({ success: false, message: "Server error try later" })
            }

        }

    }

}

module.exports = { verifyRole }