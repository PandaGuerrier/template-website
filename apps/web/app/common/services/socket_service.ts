import type { Server, Socket } from 'socket.io'

export default class SocketService {
  declare io: Server

  init(io: Server) {
    this.io = io

    this.io.use((socket: Socket, next) => {
      socket.data.userUuid = socket.handshake.auth?.userUuid ?? null
      next()
    })

    this.io.on('connection', (socket: Socket) => {
      socket.join('posts')

      if (socket.data.userUuid) {
        socket.join(`user:${socket.data.userUuid}`)
      }

      socket.on('join:channel', (uuid: any | string) => {
        const chanUuid = typeof uuid === 'string' ? uuid : uuid.channelUuid
        socket.join(`channel:${chanUuid}`)
      })

      socket.on('leave:channel', (uuid: string) => {
        socket.leave(`channel:${uuid}`)
      })
    })
  }

  broadcast(room: string, event: string, data: unknown) {
    this.io.to(room).emit(event, data)
  }
}
