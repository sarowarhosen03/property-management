import http from 'http'
import app, { DBconntection } from './src/app.js'
import { PORT } from './src/config/index.js'

const server = http.createServer(app)

server.listen(PORT, () => {
    DBconntection()
    console.log(`server running at ${PORT}`)
})
