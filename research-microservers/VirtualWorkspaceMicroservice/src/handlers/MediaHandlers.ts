import { Request, Response, Handler } from 'express'
import { AuthRequest } from '@types'
import { StatusCodes } from 'http-status-codes'

// import uploadSingleFile from '../util/uploadsingle'
const uploadSingleFile = require("../util/uploadsingle");
const uploadMultipleFiles = require("../util/uploadmany");
const fs = require('fs').promises;
const dbConfig = require("../config/dbConfig");
const baseUrl = dbConfig.url//"http://192.168.50.139:3000/upload/";

export class MediaHandlers {
  private static instance: MediaHandlers;

  private constructor() {
  }

  public static getInstance(): MediaHandlers {
    if (!MediaHandlers.instance) {
      MediaHandlers.instance = new MediaHandlers()
    }
    return MediaHandlers.instance
  }

   getHandler: Handler = async (req: AuthRequest, res: Response) => {
    console.info('MediaHandler: req.query:', req.query)
    const utterance = req.query?.utterance
    let accountId = '';
    if (req.auth && req.auth.accessTokenPayload) {
      accountId = req.auth.accessTokenPayload.accountId
    }
    const result = { status: 'OK', utterance: utterance || 'na', accountId }
    res.status(StatusCodes.OK).json(result)
  }

  public postHandler: Handler = async (req: AuthRequest, res: Response) => {
    console.info('MediaHandler: req.body:', req.body)
    const utterance = req.body?.utterance
    let accountId = '';
    if (req.auth && req.auth.accessTokenPayload) {
      accountId = req.auth.accessTokenPayload.accountId
    }
    const result = { status: 'OK', utterance: utterance || 'na', accountId }
    res.status(StatusCodes.OK).json(result)
  }
  
  //----------Stream(Video Mp4.H264/H265) CRUD------------
  //Create(C) in CRUD Single Video-TODO
  public uploadVideoFile = async (req: AuthRequest, res: Response) => {
    try {
      //multer middleware handles file
      await uploadSingleFile(req, res);
      console.log(req.body.file);
      
      // Validate request
      if (req.body.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      
      return res.send(`File has been uploaded.`);
      
    } 
    catch (error) 
    {
      console.log(error);
      let errormessage
      if (error instanceof Error)
      {
        errormessage = error.message;

        if(error.name == "LIMIT_FILE_SIZE") {
          return res.status(500).send({
            message: "File size cannot be larger than 2MB!",
          });
        }

        res.status(500).send({
          message: `Could not upload the file: ${req.body.file.originalname}. ${error.name} : ${errormessage}`,
        });
      } 
      else errormessage = String(error)
      

    }
  };
  //Create(C) in CRUD Multiple Videos-TODO
  //TODO - check for strict file type
  public uploadMultipleVideoFile = async (req: AuthRequest, res: Response) => {
    try {
      await uploadMultipleFiles(req, res);
      console.log(req.body.files);

      if (req.body.files.length <= 0) {
        return res.send(`You must select at least 1 file.`);
      }

      return res.send(`Files has been uploaded.`);
    } 
    catch (error) 
    {
      console.log(error);
      let errormessage
      if (error instanceof Error)
      {
        errormessage = error.message;

        if (error.name === "LIMIT_UNEXPECTED_FILE") {
          return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${errormessage}`);
      } 
      else errormessage = String(error)

    }
  };
  //Read(R) in CRUD Video Meta-TODO
  public getVideoFileMeta = async (req: AuthRequest, res: Response) => {
    const directoryPath = dbConfig.masterDir + dbConfig.dbVideo + "/";
  
    fs.readdir(directoryPath, (error: NodeJS.ErrnoException | null, files: string[]) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          message: "Unable to scan files!",
        });
        return;
      }
  
      let fileInfos: { name: string, url: string }[] = [];
  
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: baseUrl + file,
        });
      });
  
      res.status(200).send(fileInfos);
    });
  };
  //Download Single Video
  public getVideoFile = async (req: AuthRequest, res: Response) => {
    try {
      res.sendFile(dbConfig.masterDir + dbConfig.dbVideo + "/" + req.params.videoname);
      // res.sendFile(path.join(dbConfig.masterDir, "public", req.params.videoname));
      // res.sendFile(path.join(`${__dirname}/../../public/${req.params.videoname}`));
    } catch (error) {
      console.log(error);
        res.status(500).send({
          message: "Could not get video file. " + error,
        });
      res.sendFile(dbConfig.masterDir + dbConfig.dbVideo + "/videosterio.mp4");
    }
  };
  public downloadVideoFile = async (req: AuthRequest, res: Response) => {
    const fileName = req.params.videoname;
    const directoryPath = dbConfig.masterDir + dbConfig.dbVideo +"/";

    res.download(directoryPath + fileName, fileName, (error) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          message: "Could not download video file. " + error,
        });
      }
    });
  };
  //Delete(D) in CRUD Single Video-TODO
  //TODO - check for metadat before deleting
  public deleteVideoFile = async (req: AuthRequest, res: Response) => {
    const fileName = req.params.videoname;
    const directoryPath = dbConfig.masterDir + dbConfig.dbVideo +"/";
    try {
      fs.unlinkSync(directoryPath + fileName)
      return res.status(200).send({
        message: "delete the FILE: "+ fileName,
      });
      // if file deleted delete json info for web object
      // return next();
      //file removed
    } catch(error) {
      console.error(error)
      res.status(500).send({
        message: "Could not delete the FILE: "+ fileName + "Error:" + error,
      });
    }
  };
  
  //----------File(Image PNG/EXR) CRUD------------
  //Download Poster
  public poster = async (req: AuthRequest, res: Response) => {
    try {
      res.sendFile(dbConfig.masterDir + dbConfig.dbImage + "/poster.png");
      // res.sendFile(path.join(dbConfig.masterDir, "public", "poster.jpg"));
      // res.sendFile(path.join(`${__dirname}/../../public/poster.jpg`));
    } 
    catch (error) 
    {
      console.log(error);
        res.status(500).send({
          message: "Could not get poster. " + error,
        });
    }
  };
  //Create(C) in CRUD Single Images-TODO-kinda working
  public uploadImageFile = async (req: AuthRequest, res: Response) => {
    try {
      //multer middleware handles file
      await uploadSingleFile(req, res);
      console.log(req.body.file);
      
      // Validate request
      if (req.body.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      
      return res.send(`File has been uploaded.`);
      
    } 
    catch (error) 
    {
      console.log(error);
      let errormessage
      if (error instanceof Error)
      {
        errormessage = error.message;

        if(error.name == "LIMIT_FILE_SIZE") {
          return res.status(500).send({
            message: "File size cannot be larger than 2MB!",
          });
        }

        res.status(500).send({
          message: `Could not upload the file: ${req.body.file.originalname}. ${error.name} : ${errormessage}`,
        });
      } 
      else errormessage = String(error)
      

    }
  };
  //Create(C) in CRUD Multiple Images
  //TODO - check for strict file type
  public uploadMultipleImageFile = async (req: AuthRequest, res: Response) => {
    try {
      await uploadMultipleFiles(req, res);
      console.log(req.body.files);

      if (req.body.files.length <= 0) {
        return res.send(`You must select at least 1 file.`);
      }

      return res.send(`Files has been uploaded.`);
    } 
    catch (error) 
    {
      console.log(error);
      let errormessage
      if (error instanceof Error)
      {
        errormessage = error.message;

        if (error.name === "LIMIT_UNEXPECTED_FILE") {
          return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${errormessage}`);
      } 
      else errormessage = String(error)

    }
  };
  //Read(R) in CRUD Image Meta
  public getImageFileMeta = async (req: AuthRequest, res: Response) => {
    const directoryPath = dbConfig.masterDir + dbConfig.dbImage + "/";
  
    fs.readdir(directoryPath, (error: NodeJS.ErrnoException | null, files: string[]) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          message: "Unable to scan files!",
        });
        return;
      }
  
      let fileInfos: { name: string, url: string }[] = [];
  
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: baseUrl + file,
        });
      });
  
      res.status(200).send(fileInfos);
    });
  };
  //Download Single Image
  public getImageFile = async (req: AuthRequest, res: Response) => {
    try {
      res.sendFile(dbConfig.masterDir + dbConfig.dbImage + "/" + req.params.imagename);
      // res.sendFile(path.join(dbConfig.masterDir, "public", req.params.imagename));
      // res.sendFile(path.join(`${__dirname}/../../public/${req.params.imagename}`));
    } 
    catch (error) 
    {
      console.log(error);
        res.status(500).send({
          message: "Could not get image file. " + error,
        });
      res.sendFile(dbConfig.masterDir + dbConfig.dbImage + "/posterUHD.png");
    }
  };
  public downloadImageFile = async (req: AuthRequest, res: Response) => {
    const fileName = req.params.imagename;
    const directoryPath = dbConfig.masterDir + dbConfig.dbImage +"/";

    res.download(directoryPath + fileName, fileName, (error) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          message: "Could not download image file. " + error,
        });
      }
    });
  };
  //Delete(D) in CRUD Single Image-TODO
  //TODO - check for metadat before deleting
  public deleteImageFile = async (req: AuthRequest, res: Response) => {
    const fileName = req.params.imagename;
    const directoryPath = dbConfig.masterDir + dbConfig.dbImage +"/";
    try {
      fs.unlinkSync(directoryPath + fileName)
      return res.status(200).send({
        message: "delete the FILE: "+ fileName,
      });
      // if file deleted delete json info for web object
      // return next();
      //file removed
    } catch(error) {
      console.error(error)
      res.status(500).send({
        message: "Could not delete the FILE: "+ fileName + "Error:" + error,
      });
    }
  };

  //----------Tar/7Zip/GZip/CBZ/CBR/PDF...(Document CBZ/CBR) CRUD------------

  //Create(C) in CRUD Single Videos-TODO-kinda working
  public uploadArchiveFile = async (req: AuthRequest, res: Response) => {
    try {
      //multer middleware handles file
      await uploadSingleFile(req, res);
      console.log(req.body.file);
      
      // Validate request
      if (req.body.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      
      return res.send(`File has been uploaded.`);
      
    } 
    catch (error) 
    {
      console.log(error);
      let errormessage
      if (error instanceof Error)
      {
        errormessage = error.message;

        if(error.name == "LIMIT_FILE_SIZE") {
          return res.status(500).send({
            message: "File size cannot be larger than 2MB!",
          });
        }

        res.status(500).send({
          message: `Could not upload the file: ${req.body.file.originalname}. ${error.name} : ${errormessage}`,
        });
      } 
      else errormessage = String(error)
      

    }
  };
  //Create(C) in CRUD Multiple Archives
  //TODO - check for strict file type
  public uploadMultipleArchiveFile = async (req: AuthRequest, res: Response) => {
    try {
      await uploadMultipleFiles(req, res);
      console.log(req.body.files);

      if (req.body.files.length <= 0) {
        return res.send(`You must select at least 1 file.`);
      }

      return res.send(`Files has been uploaded.`);
    } 
    catch (error) 
    {
      console.log(error);
      let errormessage
      if (error instanceof Error)
      {
        errormessage = error.message;

        if (error.name === "LIMIT_UNEXPECTED_FILE") {
          return res.send("Too many files to upload.");
        }
        return res.send(`Error when trying upload many files: ${errormessage}`);
      } 
      else errormessage = String(error)

    }
  };
  //Read(R) in CRUD Archive Meta
  public getArchiveFileMeta = async (req: AuthRequest, res: Response) => {
    const directoryPath = dbConfig.masterDir + dbConfig.dbArchive + "/";
  
    fs.readdir(directoryPath, (error: NodeJS.ErrnoException | null, files: string[]) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          message: "Unable to scan files!",
        });
        return;
      }
  
      let fileInfos: { name: string, url: string }[] = [];
  
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: baseUrl + file,
        });
      });
  
      res.status(200).send(fileInfos);
    });
  };
  //Download Single Archive
  public getArchiveFile = async (req: AuthRequest, res: Response) => {
    try {
      res.sendFile(dbConfig.masterDir + dbConfig.dbArchive + "/" + req.params.imagename);
      // res.sendFile(path.join(dbConfig.masterDir, "public", req.params.imagename));
      // res.sendFile(path.join(`${__dirname}/../../public/${req.params.imagename}`));
    } 
    catch (error) 
    {
      console.log(error);
        res.status(500).send({
          message: "Could not get image file. " + error,
        });
      res.sendFile(dbConfig.masterDir + dbConfig.dbArchive + "/posterUHD.png");
    }
  };
  public downloadArchiveFile = async (req: AuthRequest, res: Response) => {
    const fileName = req.params.imagename;
    const directoryPath = dbConfig.masterDir + dbConfig.dbArchive +"/";

    res.download(directoryPath + fileName, fileName, (error) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          message: "Could not download image file. " + error,
        });
      }
    });
  };
  //Delete(D) in CRUD Single Archive-TODO
  //TODO - check for metadat before deleting
  public deleteArchiveFile = async (req: AuthRequest, res: Response) => {
    const fileName = req.params.imagename;
    const directoryPath = dbConfig.masterDir + dbConfig.dbArchive +"/";
    try {
      fs.unlinkSync(directoryPath + fileName)
      return res.status(200).send({
        message: "delete the FILE: "+ fileName,
      });
      // if file deleted delete json info for web object
      // return next();
      //file removed
    } catch(error) {
      console.error(error)
      res.status(500).send({
        message: "Could not delete the FILE: "+ fileName + "Error:" + error,
      });
    }
  };

  //----------RedisJSON(ComplexDocument) CRUD------------
  public uploadWebobject = async (req: AuthRequest, res: Response) => {
    try {
      //multer middleware handles file
      await uploadSingleFile(req, res);
      
      console.log(
        "file form-data" + 
        "\nwebObjectId:\n"+req.params.webObjectId +
        "\nMetaData:\n"+JSON.stringify(req.body) +
        "\nServer File:\n"+req.body.file.filename+
        "\nClient File:\n"+req.body.file.originalname);
      
      // Validate request
      if (req.body.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      // if (!req.body.webObjectId) {
      if (!req.params.webObjectId) {
        return res.status(400).send({ message: "Please pass a webObjectId with the file!" });
      }
      
      // res.status(200).send({
      //   message: "Uploaded the file successfully: " + req.body.file.originalname,
      // });
      // Debug Client:
      res.status(200).send(
        "file form-data" + 
        "\nwebObjectId:\n"+req.params.webObjectId +
        "\nMetaData:\n"+JSON.stringify(req.body) +
        "\nServer File:\n"+req.body.file.filename+
        "\nClient File:\n"+req.body.file.originalname);
      return;
      
    } 
    catch (error) 
    {
      console.log(error);
      let errormessage
      if (error instanceof Error)
      {
        errormessage = error.message;

        if(error.name == "LIMIT_FILE_SIZE") {
          return res.status(500).send({
            message: "File size cannot be larger than 2MB!",
          });
        }

        res.status(500).send({
          message: `Could not upload the file: ${req.body.file.originalname}. ${error.name} : ${errormessage}`,
        });
      } 
      else errormessage = String(error)
      

    }
  };
  
  //----------RedisPUB/SUB(IOT Sensors) CRUD------------ -

  //----------WebSocket(Streams) CRUD------------
  //Stream Live Video-TODO
  public videoStream = async (req: AuthRequest, res: Response) => {
    // indicates the part of a document that the server should return
    // on this measure in bytes for example: range = 0-6 bytes.
    // Ensure there is a range given for the video
    const  range = req.headers.range;

    if (!range)
    {
      res.sendFile(dbConfig.masterDir + dbConfig.dbVideo + "/videosterio.mp4");
      // res.status(400).send("Range must be provided");
    }
    else
    {

      // get video stats (about 61MB)
      var videoPath = dbConfig.masterDir + dbConfig.dbVideo + dbConfig.placeholderVideo;
      if(req.params.videoname != "")
        videoPath = dbConfig.masterDir + dbConfig.dbVideo + "/" + req.params.videoname;
      // const  videoPath = path.join(dbConfig.masterDir, "public", "video.mp4");
      // const  videoPath = path.join(`${__dirname}/../../public/poster.jpg`);
      // extract video size by using statSyn()
      const  videoSize = fs.statSync(videoPath).size;
      
      // Parse Range
      // Example: "bytes=32324-"
      // 10 powered by 6 equal 1000000bytes = 1mb
      const  chunkSize = 10 ** 6; 
      // calculating video where to start and where to end.
      const  start = Number(range.replace(/\D/g, ""));
      const  end = Math.min(start + chunkSize, videoSize - 1);
      const  contentLength = end - start + 1;
      
      // setup video headers
      const  headers = {
        "Content-Range":  `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges":  "bytes",
        "Content-Length":  contentLength,
        "Content-Type":  "video/mp4",
      };
      
      // HTTP Status 206 for Partial Content
      res.writeHead(206, headers);
      // creating readStream (stdin).
      const  videoStream = fs.createReadStream(videoPath, { start, end });
      
      // create live stream pipe line
      videoStream.pipe(res);

    }
  };

  //----------WebSocket(Streams) CRUD------------
  //Stream Live Video-TODO
  public sceneStream = async (req: AuthRequest, res: Response) => {
    // indicates the part of a document that the server should return
    // on this measure in bytes for example: range = 0-6 bytes.
    // Ensure there is a range given for the video
    const  range = req.headers.range;

    if (!range)
    {
      res.sendFile(dbConfig.masterDir + dbConfig.dbVideo + "/videosterio.mp4");
      res.status(400).send("Range must be provided");
    }
    else
    {

      // get video stats (about 61MB)
      var videoPath = dbConfig.masterDir + dbConfig.dbVideo + dbConfig.placeholderVideo;
      if(req.params.videoname != "")
        videoPath = dbConfig.masterDir + dbConfig.dbVideo + "/" + req.params.videoname;
      // const  videoPath = path.join(dbConfig.masterDir, "public", "video.mp4");
      // const  videoPath = path.join(`${__dirname}/../../public/poster.jpg`);
      // extract video size by using statSyn()
      const  videoSize = fs.statSync(videoPath).size;
      
      // Parse Range
      // Example: "bytes=32324-"
      // 10 powered by 6 equal 1000000bytes = 1mb
      const  chunkSize = 10 ** 6; 
      // calculating video where to start and where to end.
      const  start = Number(range.replace(/\D/g, ""));
      const  end = Math.min(start + chunkSize, videoSize - 1);
      const  contentLength = end - start + 1;
      
      // setup video headers
      const  headers = {
        "Content-Range":  `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges":  "bytes",
        "Content-Length":  contentLength,
        "Content-Type":  "video/mp4",
      };
      
      // HTTP Status 206 for Partial Content
      res.writeHead(206, headers);
      // creating readStream (stdin).
      const  videoStream = fs.createReadStream(videoPath, { start, end });
      
      // create live stream pipe line
      videoStream.pipe(res);

    }
  };

}



