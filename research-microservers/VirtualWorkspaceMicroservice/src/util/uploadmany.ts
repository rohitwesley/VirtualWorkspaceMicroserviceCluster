import util from 'util'
import path from 'path'
import multer from 'multer'

const dbConfig = require("../config/dbConfig");
// const dbImage = dbConfig.dbImage;//"/DBimage";//"/DBimage";//"/upload";
// const maxSize = 50 * 1024 * 1024;//~50mb png

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
    console.log(file.originalname);
    var filename = `${Date.now()}-wesDB-${file.originalname}`;
    if(req.body.webObjectId)filename = `${Date.now()}-wesDB-${req.body.webObjectId}`;
    callback(null, filename);
  }
});

var uploadFiles = multer({ 
  storage: storage, 
  limits: { fileSize: dbConfig.maxImgSize } 
}).array("multi-files", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
