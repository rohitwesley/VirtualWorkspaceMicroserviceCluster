import util from 'util'
import path from 'path'
import multer from 'multer'

const dbConfig = require("../config/dbConfig");
// const maxSize = 50 * 1024 * 1024;//~50mb png
// const dbImage = dbConfig.dbImage;//"/DBimage";//"/DBimage";//"/upload";

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(dbConfig.masterDir + dbConfig.dbImage + "/" ));
    // callback(null, path.join(`${__dirname}/../..`+dbImage));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];
    
    if (match.indexOf(file.mimetype) === -1) {
      var message = `<strong>${file.originalname}</strong> is invalid. Only accept png/jpeg.`;
      return callback(null, message);
    }
    // // Validate request
    // if (!req.body.webObjectId) {
    //   var message = `<strong>${req.body.webObjectId}</strong> is invalid. Please pass a valid webObjectId`;
    //   return callback(message, null);
    // }

    console.log(req.body.webObjectId);
    var filename = `${Date.now()}-wesDB-${file.originalname}`;
    // if(req.body.webObjectId != undefined)
    // {
    //   //get file ext:.png/.jpg
    //   let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    //   // filename = `wesDB-${req.body.webObjectId}.${ext}`;
    //   filename = `${Date.now()}-wesDB-${req.body.webObjectId}${ext}`;
    // }
    if(req.params.webObjectId != undefined)
    {
      //get file ext:.png/.jpg
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      filename = `${Date.now()}-wesDB-${req.params.webObjectId}${ext}`;
    }
    // console.log(file.originalname);
    callback(null, filename);
  }
});

var uploadFile = multer({
  storage: storage,
  limits: { fileSize: dbConfig.maxImgSize },
}).single("webObjectURL");
var uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
