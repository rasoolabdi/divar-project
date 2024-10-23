const multer = require("multer");
const fs = require("fs");
const path = require("path");
const createHttpError = require("http-errors");
const storage = multer.diskStorage({
    destination: function(req,file , cb) {
        fs.mkdirSync(path.join(process.cwd() , "public" , "upload") , {recursive: true});
        cb(null , "public/upload");
    },
    filename: function (req,file ,cb){
        const whiteListFormat = ["image/png" , "image/jpg" , "image/jpeg"];
        if(whiteListFormat.includes(file.mimetype)) {
            const ext = path.extname(file.originalname);
            const filename = new Date().getTime().toString() + ext;
            cb(null , filename);
        }
        else {
            cb(new createHttpError.BadRequest("فرمت تصویر شما نامعتبر می باشد"))
        }

    }
});

const upload = multer({
    storage,
    limits: {
        fieldSize: 3 * 1000 * 1000
    }
});

module.exports = {
    upload
}