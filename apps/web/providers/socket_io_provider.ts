import type { ApplicationService } from '@adonisjs/core/types'
import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'
import SocketService from '#common/services/socket_service'

export default class SocketIoProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton(SocketService, async () => new SocketService())
  }

  boot() {
    void this.app.ready(async () => {
      const io = new Server(server.getNodeServer(), {
        cors: {
          origin: ['http://localhost:8081', 'http://localhost:19006', 'exp://localhost:8081'],
          credentials: true,
        },
      })

      const socketService = await this.app.container.make(SocketService)
      socketService.init(io)
    })
  }
}
