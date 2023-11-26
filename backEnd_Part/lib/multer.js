
const multer = require("multer")

// // // Define the storage location for the uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${process.cwd()}/uploads`)
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)

        // console.log(file)
    }
});

// const storage = multer.memoryStorage()


// // // File filter ----------->

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "video/mp4" ) {
        cb(null, true);
    } else {
        cb(
            {
                message: "Unsupported File Format",
            },
            false
        );
    }
};




// Initialize multer middleware
const upload = multer({ 
    storage , 
    // fileFilter ,
    limits: {
        fieldNameSize: 200,
        fileSize: 30 * 1024 * 1024,
    },
}) ;

module.exports = upload