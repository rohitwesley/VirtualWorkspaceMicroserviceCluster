import { IncomingMessage } from 'http'
import ws, { WebSocketServer } from 'ws'

import { Server as SocketIOServer, Socket } from 'socket.io';
import redis from 'redis';
import { promisify } from 'util';


export const wsUnityStreamHandler = (wss: WebSocketServer, ws: ws, req: IncomingMessage, token?: any) => {
  console.info(`wsUnityStreamHandler connected`);
  ws.send(`wsUnityStreamHandler connected`);

  // ws.on('unitySocket-stream', (message: string | Buffer, binary: boolean) => {
  //   console.info(`wsUnityStreamHandler: ${binary} * ${message}`)
  //   ws.send(`${message}`)
  // })
};

export const wsMessageStreamHandler = (socketIOServer: SocketIOServer, socketIO: Socket, req: IncomingMessage, token?: any) => {
  console.info(`wsMessageStreamHandler connected`);
  // socketIO.emit(`wsMessageStreamHandler connected`);
  
  // socketIO.on('message-stream', (message: string | Buffer, binary: boolean) => {
  //   console.info(`wsMessageStreamHandler: ${binary} * ${message}`)
  //   socketIO.emit(`${message}`)
  // })
  // var models = ['comments', 'posts'];
  //   for (var i = 0; i < models.length; i++) {
  //       require('../model/' + models[i])(socketIO);
  //       // require('./controllers/' + controllers[i] + '.controller')(socketIO);
  //   }
  var comments = [{
      user: 'Batman',
      comment: 'Great post!'
  }, {
      user: 'Robin',
      comment: 'Interesting ideas...'
  }, {
      user: 'Joker',
      comment: 'Thanks, Batman!'
  }, {
      user: 'Bruce Wayne',
      comment: 'I agree with Batman'
  }];
  // Recent Comments
  for (var i = 0; i < comments.length; i++) {
    socketIOServer.emit('comment.add', comments[i]);
    socketIOServer.emit('comments.count', {
        count: i + 1
  });

  var posts = [{
      user: 'Two-Face',
      title: 'How to Flip a Coin'
  }, {
      user: 'Joker',
      title: 'Top 5 Jokes of 2015'
  }];
  // Recent Posts
  for (var i = 0; i < posts.length; i++) {
    socketIOServer.emit('post.add', posts[i]);
    socketIOServer.emit('posts.count', {
        count: i + 1
    });
}
}


};

export const wsLiveVideoStreamHandler = (socketIOServer: SocketIOServer, socketIO: Socket, req: IncomingMessage, token?: any) => {
  console.info(`wsLiveVideoStreamHandler connected`);
  socketIO.emit(`wsLiveVideoStreamHandler connected`);
  
  socketIO.on('live-stream', (message: string | Buffer, binary: boolean) => {
    console.info(`wsLiveVideoStreamHandler: ${binary} * ${message}`)
    socketIO.emit(`${message}`)
  })

};

export const wsMediaStreamHandler = (socketIOServer: SocketIOServer, socketIO: Socket, req: IncomingMessage, token?: any) => {
  console.info(`wsMediaStreamHandler connected`);
  
  console.log('Client connected');

  // // Subscribe to updates to Redis stack JSON
  // const pubsub = redis.createClient();
  // pubsub.subscribe('wsimages');

  // var subscriber = redis.createClient();
  // subscriber.on('message', function (channel, req) {
  // console.log('Message: ' + req + ' on channel: ' + channel + ' is arrive!');
  // });
  // subscriber.subscribe('notification');

  // pubsub.on('message', (channel, req) => {
  //   if (channel === 'wsimages') {
  //     socketIO.emit('wsimage-updated', JSON.parse(req));
  //   }
  // });

  // socketIO.on('disconnect', () => {
  //   console.log('Client disconnected');
  //   pubsub.unsubscribe('wsimages');
  //   pubsub.quit();
  // });


};

export const wsUserInteractionStreamHandler = (socketIOServer: SocketIOServer, socketIO: Socket, req: IncomingMessage, token?: any) => {
  console.info(`wsUserInteractionStreamHandler connected`);
  socketIO.emit(`wsUserInteractionStreamHandler connected`);
  
  socketIO.on('interaction-stream', (message: string | Buffer, binary: boolean) => {
    console.info(`wsUserInteractionStreamHandler: ${binary} * ${message}`)
    socketIO.emit(`${message}`)
  })

};

export const wsUserInterfaceStreamHandler = (socketIOServer: SocketIOServer, socketIO: Socket, req: IncomingMessage, token?: any) => {
  console.info(`wsUserInterfaceStreamHandler connected`);
  socketIO.emit(`wsUserInterfaceStreamHandler connected`);
  
  socketIO.on('button-tap', function (btn) {
    socketIOServer.sockets.emit('button-tapped', btn);
  });

};


export const wsDesktopStreamHandler = (socketIOServer: SocketIOServer, socketIO: Socket, req: IncomingMessage, token?: any) => {
  // console.info(`wsDesktopStreamHandler connected`);
  socketIO.emit(`wsDesktopStreamHandler connected`);
  console.log("wsDesktopStreamHandler connection:", socketIO.id);

  // Create a Redis client
  const redisClient = redis.createClient();
  // Promisify Redis client methods
  // const redisXRangeAsync = promisify(redisClient.xRange).bind(redisClient);
  const redisSubscribeAsync = promisify(redisClient.subscribe).bind(redisClient);
  const redisUnsubscribeAsync = promisify(redisClient.unsubscribe).bind(redisClient);

                    // // Listen for Redis stream data
                    // const stream = redisXRangeAsync("desktop_stream", "-", "+");
                    // stream.on("data", (entries) => {
                    //   // Emit each frame to all connected clients as a Base64-encoded string
                    //   for (const entry of entries) {
                    //     const frame = entry[1].data;
                    //     socketIO.emit("frame", frame.toString("base64"));
                    //   }
                    // });
                    // // const stream = redisClient.xread([['desktop_stream', '$']], (err, reply) => {
                    // //   if (err) {
                    // //     console.error('Redis stream error:', err);
                    // //   } else {
                    // //     // Emit each frame to all connected clients as a Base64-encoded string
                    // //     for (const entry of reply[0][1]) {
                    // //       const frame = entry[1];
                    // //       socketIO.emit('frame', frame.toString('base64'));
                    // //     }
                    // //   }
                    // // });

                    // stream.on('error', (error) => {
                    //   console.error('Redis stream error:', error);
                    // });

  // Listen for Redis Pub/Sub messages
  // const pubsub = redis.createClient();
  // pubsub.on('message', (channel, message) => {
  redisClient.on('message', (channel, message) => {
    if (channel === 'desktop_control') {
      try {
        const control = JSON.parse(message);
        // Emit the control message as a Socket.IO event to all connected clients
        socketIO.emit('control', control);
      } catch (error) {
        console.error('Error parsing control message:', error);
      }
    }
  });
  // pubsub.subscribe('desktop_control');
  redisSubscribeAsync("desktop_control");

  // Stop listening for Redis Pub/Sub messages when all clients disconnect
  socketIO.on('disconnect', () => {
    // pubsub.unsubscribe('desktop_control');
    redisUnsubscribeAsync("desktop_control");
    // pubsub.quit();
    redisClient.quit();
  });

};