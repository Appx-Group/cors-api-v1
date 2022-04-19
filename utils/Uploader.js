const multer = require('multer')
const path = require('path')


const uploader = multer({ 
    storage: multer.diskStorage({
        destination: path.join(path.dirname(__dirname), 'public'),
        filename: (req, file, callback)=>{
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            callback(null, file.fieldname + '-' + uniqueSuffix + "." + file.originalname.split(".")[1])
        }
    }),

    limits: { fileSize: 10485760 }, // up to 10 MB

    fileFilter: (req, file, callback)=>{
        const fileType = /jpeg|jpg|png|gif|webp|ico/

        const extname = fileType.test(path.extname(file.originalname).toLowerCase())
        const mimetype = fileType.test(file.mimetype)

        if (extname && mimetype) {
            return callback(null, true)
        } else {
            return callback(null, false)
        }
    } 
})

module.exports = uploader