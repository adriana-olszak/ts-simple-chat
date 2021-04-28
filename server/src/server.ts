import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server, Socket } from 'socket.io'
import { IEmitEvents, IListenEvents } from './shared/types'
import ParticipantsStorage from './storage/ParticipantsStorage'
import MessagesStorage from './storage/MessagesStorage'

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = new Server<IListenEvents, IEmitEvents>(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

// non-production settings
app.use(cors())

app.head('/participant/:username/', (req, res) => {
  const participant = ParticipantsStorage.has(req.params.username)

  if(participant) return res.status(200).send()
  return res.status(204).send()
})

server.listen(port, () => {
  console.log('Server listening at port %d', port)
})

// a bit of a hack. Socket should be extended in custom d.ts file. Simplified.
io.on('connect', (socket: Socket & { username: string | null }) => {
  socket.emit('connected')

  socket.on('add_user', (username) => {
    ParticipantsStorage.upsert(username, { username, connected: true })
    socket.emit('login')
    socket.emit('archive', Array.from(MessagesStorage.values()))
  })

  socket.on('new_message', (data) => {
    MessagesStorage.set(MessagesStorage.id(), data)
    socket.broadcast.emit('new_message', data)
    socket.emit('new_message', data)
  })

  socket.on('disconnect', () => {
    ParticipantsStorage.softDelete(socket.username)
  })
})
