import { IncomingMessage, Server as createServer } from 'http'
import { WebSocketServer } from 'ws'
import { Socket, Server as SocketIOServer } from 'socket.io';
import { Duplex } from 'stream'
import { checkPermissions } from '../auth/ExpressAuthFunctions'
import { socketAuthorization, sendErrorAndDestroySocket } from '../auth/ExpressAuthFunctions'
import * as errors from '@errors'

export interface WSSRoute {
    path: string
    handler: any
    permissions: string[]
}

export type WSSRoutes = WSSRoute[]

export type SocketIORoutes = WSSRoute[]

export const setupWebSocketServer = (httpServer: createServer, wssRoutes: WSSRoutes, serviceOptions?: any): WebSocketServer => {
    const wss = new WebSocketServer({ noServer: true })
    httpServer.on('upgrade', async (req: IncomingMessage, socket: Duplex, head: Buffer) => {
        const location = new URL(req.url as string, `http://${req.headers.host}`)
        const path = location.pathname
        const currentRoute = wssRoutes.find(route => route.path === path)
        if (currentRoute) {
            let token: any
            if (serviceOptions.useAuth) {
                try {
                    token = socketAuthorization(req)
                    checkPermissions(currentRoute.permissions, token)
                } catch (error: any) {
                    sendErrorAndDestroySocket(wss, req, socket, head, error)
                    return
                }
            }
            wss.handleUpgrade(req, socket, head, (ws, req) => {
                currentRoute.handler(wss, ws, req, token)
                wss.emit('connection', ws, req, token)
            })
        } else {
            sendErrorAndDestroySocket(wss, req, socket, head, errors.NotFoundError())
        }
    })

    return wss
}

export const setupSocketIOServer = (httpServer: createServer, socketIORoutes: SocketIORoutes, serviceOptions?: any): SocketIOServer => {
  const socketIOServer = new SocketIOServer(httpServer);

  socketIOServer.on('connect', async (socket: Socket) => {
    const path = socket.handshake.url.split('?')[0];
    const currentRoute = socketIORoutes.find((route) => route.path === path);
    if (currentRoute) {
      let token: any;
      if (serviceOptions.useAuth) {
        try {
          token = socketAuthorization(socket.request);
          checkPermissions(currentRoute.permissions, token);
        } catch (error: any) {
          socket.emit('error', error);
          return;
        }
      }
      currentRoute.handler(socketIOServer, socket, socket.request, token);
    } else {
      socket.emit('error', errors.NotFoundError());
    }
  });

  return socketIOServer;
};