import express from 'express'
import http, { Server as httpServer } from 'http'
import * as https from 'https'
import * as fs from 'fs';
import { WebSocketServer } from 'ws'
import { Server as SocketIOServer } from 'socket.io'
import dotenv from 'dotenv'
import * as handlers from '@handlers'
import { ExpressRouterWrapper } from './util/ExpressRouterWrapper'
import { WSSRoutes, setupWebSocketServer  } from './util/WebSocketServerWrapper'
import { SocketIORoutes, setupSocketIOServer  } from './util/WebSocketServerWrapper'

const cookieParser = require("cookie-parser");
const dbConfig = require("./config/dbConfig");

dotenv.config()

const main = async () => {
  const app = express()

  // Set expected Content-Types

  console.log("Starting VirtualWorkspace Server ....   ");
  console.log("Server NodeJS :", process.version);
  console.log("Server Platform :", process.platform);
  console.log("Server Env. User :", process.env.USER);

  // ----- add other middleware -----
  //parses incoming requests as JSON
  // -----------application/x-www-form-urlencoded is a default data format for sending forms:
  app.use(express.urlencoded({ extended: true }));
  // -----------application/json mostly used for AJAX (XMLHttpRequest) requests:
  app.use(express.json());
  
  app.use(express.text())
  app.use(express.static('public'));
  app.use(cookieParser());

  // HealthCheck
  app.get('/healthcheck', handlers.HealthCheckHandler)

  const serviceOptions = { useAuth: false }
  if (process.env.USE_AUTH === 'true') {
    serviceOptions.useAuth = true;
    console.info('(USE_AUTH === true) so using mock JWT auth.')
  } else {
    console.info('(USE_AUTH !== true) so NOT using mock JWT auth.')
  }

  // http routes

  const expressRouterWrapper = new ExpressRouterWrapper('', serviceOptions)
  // expressRouterWrapper.addGetHandler('/get', handlers.ExampleHandlers.getInstance().getHandler, ['vartist:read'])
  // expressRouterWrapper.addPostHandler('/post', handlers.ExampleHandlers.getInstance().postHandler, ['vartist:read'])

  expressRouterWrapper.addGetHandlerNoAuth('/auth', handlers.MockAuthHandlers.getInstance().authHandler)
  expressRouterWrapper.addGetHandlerNoAuth('/refresh', handlers.MockAuthHandlers.getInstance().refreshHandler)
  expressRouterWrapper.addPostHandlerNoAuth('/auth', handlers.MockAuthHandlers.getInstance().authHandler)

  expressRouterWrapper.addGetHandler('/dashboard', handlers.SiteHandlers.getInstance().dashboardHandler, ['vartist:read'])
  expressRouterWrapper.addGetHandler('/console', handlers.SiteHandlers.getInstance().consoleHandler, ['vartist:admin'])                                  
  expressRouterWrapper.addGetHandler('/stream', handlers.SiteHandlers.getInstance().streamHandler, ['vartist:admin'])
  expressRouterWrapper.addGetHandler('/unityGL', handlers.SiteHandlers.getInstance().UnityGLHandler, ['vartist:admin'])
  expressRouterWrapper.addGetHandlerNoAuth('/signin', handlers.SiteHandlers.getInstance().signinHandler)
  expressRouterWrapper.addGetHandlerNoAuth('/forbidden', handlers.SiteHandlers.getInstance().forbiddenHandler)
  expressRouterWrapper.addGetHandlerNoAuth('/', handlers.SiteHandlers.getInstance().redirectToDashboardHandler)

  expressRouterWrapper.addGetHandler('/time', handlers.TimeHandler, ['vartist:read'])

  //----------Video CRUD Routes------------
  //Read(R) in CRUD Single Video
  // access folder by http
  app.use("/videoDirect", express.static(process.cwd() + dbConfig.dbVideo)); //make DBVideo static

  //Create(C) in CRUD Multiple Videos-TODO
  expressRouterWrapper.addPostHandlerNoAuth("/video/batch", handlers.MediaHandlers.getInstance().uploadMultipleVideoFile);
  //Create(C) in CRUD Single Video-TODO
  expressRouterWrapper.addPostHandlerNoAuth("/video/:videoname", handlers.MediaHandlers.getInstance().uploadVideoFile);
  //Read(R) in CRUD Video Meta-TODO
  expressRouterWrapper.addGetHandlerNoAuth("/video/meta", handlers.MediaHandlers.getInstance().getVideoFileMeta);
  //Download Single Video
  expressRouterWrapper.addGetHandlerNoAuth("/video/:videoname", handlers.MediaHandlers.getInstance().getVideoFile);
  expressRouterWrapper.addGetHandlerNoAuth("/videoDownload/:videoname", handlers.MediaHandlers.getInstance().downloadVideoFile);
  // //Update(U) in CRUD Single Video-TODO
  // expressRouterWrapper.addPutHandlerNoAuth("/video/:videoname", handlers.MediaHandlers.getInstance().updateVideoFile);
  //Delete(D) in CRUD Single Video-TODO
  expressRouterWrapper.addDeleteHandlerNoAuth("/video/:videoname", handlers.MediaHandlers.getInstance().deleteVideoFile);
  
  //----------Image CRUD Routes------------
  //Read(R) in CRUD Single Image
  app.use("/imageDirect", express.static("."+dbConfig.dbImage)); // makes uploads folder available
  //Download Poster
  expressRouterWrapper.addGetHandlerNoAuth("/poster", handlers.MediaHandlers.getInstance().poster);

  //Create(C) in CRUD Multiple Images
  expressRouterWrapper.addPostHandlerNoAuth("/image/batch", handlers.MediaHandlers.getInstance().uploadMultipleImageFile);
  //Create(C) in CRUD Single Images-TODO-kinda working
  expressRouterWrapper.addPostHandlerNoAuth("/image/:imagename", handlers.MediaHandlers.getInstance().uploadImageFile);
  //Read(R) in CRUD Image Meta
  expressRouterWrapper.addGetHandlerNoAuth("/image/meta", handlers.MediaHandlers.getInstance().getImageFileMeta);
  //Download Single Image
  expressRouterWrapper.addGetHandlerNoAuth("/image/:imagename", handlers.MediaHandlers.getInstance().getImageFile);
  expressRouterWrapper.addGetHandlerNoAuth("/imageDownload/:imagename", handlers.MediaHandlers.getInstance().downloadImageFile);
  //Update(U) in CRUD Single Image-TODO
  // expressRouterWrapper.addPutHandlerNoAuth("/image/:imagename", handlers.MediaHandlers.getInstance().updateImageFile);
  //Dele 7zipte(D) in CRUD Single Image-TODO
  expressRouterWrapper.addDeleteHandlerNoAuth("/image/:imagename", handlers.MediaHandlers.getInstance().deleteImageFile);

  //----------7Zip(Compressed Archive Document/Metadata CBZ/CBR) CRUD------------
  //Read(R) in CRUD Single Archive
  app.use("/archiveDirect", express.static("."+dbConfig.dbArchive)); // makes uploads folder available

  //Create(C) in CRUD Multiple Archive
  expressRouterWrapper.addPostHandlerNoAuth("/archive/batch", handlers.MediaHandlers.getInstance().uploadMultipleArchiveFile);
  //Create(C) in CRUD Single Archive-TODO-kinda working
  expressRouterWrapper.addPostHandlerNoAuth("/archive/:archivename", handlers.MediaHandlers.getInstance().uploadArchiveFile);
  //Read(R) in CRUD Archive Meta
  expressRouterWrapper.addGetHandlerNoAuth("/archive/meta", handlers.MediaHandlers.getInstance().getArchiveFileMeta);
  //Download Single Archive
  expressRouterWrapper.addGetHandlerNoAuth("/archive/:archivename", handlers.MediaHandlers.getInstance().getArchiveFile);
  expressRouterWrapper.addGetHandlerNoAuth("/archiveDownload/:archivename", handlers.MediaHandlers.getInstance().downloadArchiveFile);
  //Update(U) in CRUD Single Archive-TODO
  // expressRouterWrapper.addPutHandlerNoAuth("/archive/:archivename", handlers.MediaHandlers.getInstance().updateArchiveFile);
  //Delete(D) in CRUD Single Archive-TODO
  expressRouterWrapper.addDeleteHandlerNoAuth("/archive/:archivename", handlers.MediaHandlers.getInstance().deleteArchiveFile);
  
  //----------RedisJSON(ComplexDocument) CRUD------------
  
  //----------RedisPUB/SUB(IOT Sensors) CRUD------------
  
  //----------WebSocket(Streams) CRUD------------
  //Stream Videao-TODO
  expressRouterWrapper.addGetHandlerNoAuth("/videostream/:videoname", handlers.MediaHandlers.getInstance().videoStream);
  // expressRouterWrapper.addGetHandlerNoAuth("/imagestream/:imagename", handlers.MediaHandlers.getInstance().imageStream);
  // expressRouterWrapper.addGetHandlerNoAuth("/archivestream/:archivename", handlers.MediaHandlers.getInstance().archiveStream);
  // expressRouterWrapper.addGetHandlerNoAuth("/camstream/:camname", handlers.MediaHandlers.getInstance().camStream);
  expressRouterWrapper.addGetHandlerNoAuth("/scenestream/:scenename", handlers.MediaHandlers.getInstance().sceneStream);

  if (expressRouterWrapper) {
    const routerPath = expressRouterWrapper.path !== '' ? `/${expressRouterWrapper.path}` : ''
    app.use(`${routerPath}`, expressRouterWrapper.getRouter())
  }

  const port = parseInt(<string>process.env.SERVER_PORT) || 8000
  const httpServer: httpServer = http.createServer(app)

  //TODO setup https server with SSL certificate
  // const options = {
  //   key: fs.readFileSync('server.key'),
  //   cert: fs.readFileSync('server.crt')
  // };
  // const httpsServer = https.createServer(options, app);

  // socket routes

  const wssRoutes: WSSRoutes = [
    { path: '/ws-echo', handler: handlers.wsEchoHandler, permissions: ['vartist:read'] },
    { path: '/ws-silent', handler: handlers.wsSilentHandler, permissions: ['vartist:read'] },
    { path: '/ws-unityStream', handler: handlers.wsUnityStreamHandler, permissions: ['vartist:read'] }
    // { path: '/ws-sceneInfo', handler: handlers.wsSceneInfoHandler, permissions: ['vartist:read'] },
    // { path: '/ws-userInfo', handler: handlers.wsUserInfoHandler, permissions: ['vartist:read'] }
  ]
  const websocketserver: WebSocketServer = setupWebSocketServer(httpServer, wssRoutes, serviceOptions)
  
  const socketIORoutes: SocketIORoutes = [
    { path: '/ws-virtualMessageStream', handler: handlers.wsMessageStreamHandler, permissions: ['vartist:read'] },
    { path: '/ws-virtualMediaStream', handler: handlers.wsMediaStreamHandler, permissions: ['vartist:read'] },
    { path: '/ws-virtualDesktopStream', handler: handlers.wsDesktopStreamHandler, permissions: ['vartist:read'] },
    // { path: '/ws-virtualWebBrowserStream', handler: handlers.wsWebBrowserStreamHandler, permissions: ['vartist:read'] },
    { path: '/ws-virtualSceneUserInteractionStream', handler: handlers.wsUserInteractionStreamHandler, permissions: ['vartist:read'] },
    { path: '/ws-virtualSceneUserInterfaceStream', handler: handlers.wsUserInterfaceStreamHandler, permissions: ['vartist:read'] },
    { path: '/ws-virtualLiveVideoStream', handler: handlers.wsLiveVideoStreamHandler, permissions: ['vartist:read'] },
    // { path: '/ws-virtualSceneSpatialAudioStream', handler: handlers.wsSpatialAudioStreamHandler, permissions: ['vartist:read'] },
    // { path: '/ws-virtualSceneSterioCameraFrameStream', handler: handlers.wsSterioCameraFrameStreamHandler, permissions: ['vartist:read'] },
    // { path: '/ws-virtualSceneDeepCanvasStream', handler: handlers.wsDeepCanvasStreamHandler, permissions: ['vartist:read'] },
    // { path: '/ws-virtualSceneMetaDataStream', handler: handlers.wsMetaDataStreamHandler, permissions: ['vartist:read'] },
    // { path: '/ws-virtualSceneVolumeVoxelStream', handler: handlers.wsVolumeVoxelStreamHandler, permissions: ['vartist:read'] },
    // { path: '/ws-virtualSceneTextureTileStream', handler: handlers.wsTextureTileStreamHandler, permissions: ['vartist:read'] },
    // { path: '/ws-virtualSceneMaterialStream', handler: handlers.wsMaterialStreamHandler, permissions: ['vartist:read'] },
    // { path: '/ws-virtualSceneMeshClusterStream', handler: handlers.wsMeshClusterStreamHandler, permissions: ['vartist:read'] },
  ]
  const socketIOServer: SocketIOServer = setupSocketIOServer(httpServer, socketIORoutes, serviceOptions)
  
  process.on('SIGINT', () => {
    console.warn('Received interrupt, shutting down')
    httpServer.close()
    process.exit(0)
  })

  httpServer.listen(port, () => {
    console.info(`HTTP/WS server is ready and listening at port ${port}!`)
  })
}

main().catch((error) => {
  console.error('Detected an unrecoverable error. Stopping!')
  console.error(error)
})
