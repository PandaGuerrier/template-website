import app from '@adonisjs/core/services/app'
import SocketService from '#common/services/socket_service'

let socket: SocketService

await app.booted(async () => {
  socket = await app.container.make(SocketService)
})

export { socket as default }
