const User = require('../model/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const signupUser = async(req, res) => {

    try {

        let { email, password, firstname, lastname } = req.body
        const user = await User.findOne({ email })

        if (user) {
            return res.status(404).send({ success: false, message: "User already exists" })
        }

        const newUser = new User({ email, password, firstname, lastname })
        const createdUser = await newUser.save()

        return res.status(200).send({ success: true, message: "Account created successfully, Welcome to our platform", user: createdUser })

    } catch (err) {
        console.log(err)
        return res.status(404).send({ success: false, message: err })
    }


}

const signinUser = async(req, res) => {

    try {
        let { email, password } = req.body

        if (!email || !password) {
            return res.status(404).send({ success: false, message: "All fields are required" })
        }

        let user = await User.findOne({ email }).select('+password').select('+isActive')


        if (!user) {

            return res.status(404).send({ success: false, message: "Account doesn't exists" })

        } else {

            let isCorrectPassword = await bcrypt.compare(password, user.password)
            if (isCorrectPassword) {

                delete user._doc.password
                if (!user.isActive) return res.status(200).send({ success: false, message: 'Your account is inactive, Please contact your administrator' })

                const token = jwt.sign({ iduser: user._id, role: user.role }, process.env.SECRET, { expiresIn: "1h", })

                return res.status(200).send({ success: true, user, token })

            } else {

                return res.status(404).send({ success: false, message: "Please verify your credentials" })

            }

        }

    } catch (err) {
        return res.status(404).send({ success: false, message: err.message })
    }

}

const getUsers = async(req, res) => {

    try {

        let { field, value } = req.body

        if (field) {

            users = await User.find({ role: 'user' }).where(field).equals(value)

        } else {

            users = await User.find({ role: 'user' })

        }

        return res.status(200).send({ success: true, users })

    } catch (err) {

        return res.status(404).send({ success: false, message: err })

    }

}

const editStatus = async(req, res) => {

    try {

        let { idUser } = req.body
        let user = await User.findById(idUser).select('+isActive')
        user.isActive = !user.isActive
        user.save()

        res.status(200).send({ success: true, user })

    } catch (err) {

        return res.status(404).send({ success: false, message: err })

    }

}

module.exports = { signinUser, signupUser, getUsers, editStatus }