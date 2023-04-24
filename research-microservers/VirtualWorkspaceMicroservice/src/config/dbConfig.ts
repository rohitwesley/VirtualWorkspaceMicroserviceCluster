
var ipInfo = require("ip");
var portInfo = parseInt(<string>process.env.SERVER_PORT) || 8000;//process.env.PORT || 3000;

module.exports = {
    // url: "mongodb://localhost:27017/virtualworkspacedb",
    // url: "mongodb://192.168.50.140:27017/virtualworkspacedb",
    // urlext: "mongodb://",
    // defaultHostname: "localhost",
    // port: "27017",
    // dbName: "virtualworkspacedb",
    ip: ipInfo,
    baseDir: __dirname,//'E:/VirtualWorkspace/VirtualWorkspaceNetwork/VirtualWorkspaceMicroService/dist
    masterDir: "E:/VirtualWorkspace/VirtualWorkspaceNetwork/VirtualWorkspaceMicroService/",
    hostname: ipInfo.address(),//'192.168.50.140',
    portHttp: portInfo,
    url: "http://"+ipInfo.address()+":"+portInfo,//"http://localhost:3000",
    portWS: 4000,
    portUDP: 5000,
    dbFile: "/DBFile",//"/public",
    dbVideo: "/DBvideo",//"/public",
    // get video stats (about 61MB)
    placeholderVideo: "/video.mp4",
    dbImage: "/DBimage",//"/DBimage",//"/upload",
    maxImgSize: 50 * 1024 * 1024,//~50mb png
    dbArchive: "/DBarchive",
    
  };