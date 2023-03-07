const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
require("./db")

const app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('common'))

const user = require("./route/user-route")

app.use('/api', user)


app.listen(process.env.PORT, (err) => {

    if (err) {
        console.log(err)
    } else {
        console.log(`Listening to port ${process.env.PORT}`)
    }

})

app.get('/', (req, res) => {

    res.status(200).send("Server is responding")

})