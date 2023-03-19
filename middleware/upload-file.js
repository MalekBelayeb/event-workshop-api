const multer = require("multer")
const path = require("path")
const fs = require('fs')

const uploadFile = ({ folder = "./uploads", acceptedTypes = [".jpg", ".png", ".jpeg"], fieldName = "image", fileName = "image", multiple = false, maxCount = 5 } = {}) => {

    var storage = multer.diskStorage({

        destination: function(req, file, cb) {

            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder);
            }
            cb(null, folder);

        },
        filename: function(req, file, cb) {

            if (!acceptedTypes.includes(path.extname(file.originalname))) {
                return cb(new Error('Bad file format'));
            }
            cb(null, fileName + '-' + Date.now() + path.extname(file.originalname));
        
        }

    })

    return multiple ? multer({ storage }).array(fieldName, maxCount) : multer({ storage }).single(fieldName)

}


module.exports = { uploadFile }