import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import authRoutes from './routes/auth.route.js'
import meterRoutes from './routes/meter.route.js'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

dotenv.config()
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
   cors: {
      origin: ['http://localhost:5173'],
   }
})

let interval;
let currentFlow = 0;
let threshold = Infinity;
io.on('connection', (socket) => {
   console.log('New client connected');
   socket.on('startPump', () => {
      clearInterval(interval);
      currentFlow = 0;
      socket.emit('flowUpdate', currentFlow);
      interval = setInterval(() => {
         // simulate flow increment
         currentFlow = parseFloat((currentFlow + Math.random() * 0.1).toFixed(2));
         socket.emit('flowUpdate', currentFlow);
         // auto-stop if threshold reached
         if (currentFlow >= threshold) {
            socket.emit('thresholdReached', threshold);
            clearInterval(interval);
         }
      }, 100); // emit every 100ms
   });

   socket.on('stopPump', () => {
      clearInterval(interval);
   });

   socket.on('setThreshold', (t) => {
      threshold = t;
      socket.emit('thresholdSet', threshold);
   });
   socket.on('disconnect', () => {
      console.log('Client disconnected');
   });
});


app.use(express.json())
app.use(cookieParser())
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true,
}))
app.use("/api/auth", authRoutes)
app.use("/api/meter", meterRoutes)

app.get('/', (req, res) => {
   res.send('Home Page')
})

const __dirname = path.resolve()
const PORT = process.env.PORT
if (process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, '../frontend/dist')))
   app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
   })
}

server.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
   connectDB()
})

