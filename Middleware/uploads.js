const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file,  cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, 'uploads/img/')
        } else if(file.mimetype === 'video/mp4') {
            cb(null, 'uploads/video/')
        }
    },
    filename(req, file, cb) {
        cb(null, `${moment().format('DDMMYYYY-HHmmss_SSS')}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'video/mp4') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({storage, fileFilter, limits: {fileSize: 2024 * 2024 * 10}})