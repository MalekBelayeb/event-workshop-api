const mongoose = require("mongoose")

const mongoURL = process.env.NODE_ENV == 'prod' ? process.env.DB_PROD : process.env.DB_DEV

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {

    if (err) {
        console.log(err)
    } else {
        console.log("Connected to database")
    }

})