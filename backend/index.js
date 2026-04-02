// require ('dotenv/config'); 
import 'dotenv/config'
import express from 'express'
import http from 'http'
import { configureSocketIO } from './src/config/socketio.js'
import { configureRoutes } from './src/routes/index.js';

const app = new express();
const server = http.createServer(app);

//Configure routes
configureRoutes(app)

//Configure middlewaress


//Configure Socket.IO
const io = configureSocketIO(server);


//Start Server
const port = process.env.PORT
const host = process.env.HOST

app.get('/',(req, res)=>{
  res.send("TEtsing devraj")
})

server.listen(port, host, ()=>{
  console.log(`🚀 Bhetiyo API server running at http://${host}:${port}`)
})

export {io}