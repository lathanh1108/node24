const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '_' + file.originalname;
        cb(null, name);
    }
});
const upload = multer({ storage });

module.exports = { upload }