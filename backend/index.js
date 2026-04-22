// require ('dotenv/config');
import "dotenv/config";
import express from "express";
import http from "http";
import { configureSocketIO } from "./src/config/socketio.js";
import { configureRoutes } from "./src/routes/index.js";
import DatabaseConnection from "./src/config/database.js";
const app = new express();
const server = http.createServer(app);

//Configure routes
configureRoutes(app);

//Configure middlewaress

//Configure Socket.IO
const io = configureSocketIO(server);

// Connect with Database
DatabaseConnection();

//Start Server
const port = process.env.PORT || 5000;
const host = process.env.HOST;

server.listen(port, host, () => {
  console.log(`🚀 Bhetiyo API server running at http://${host}:${port}`);
});

export { io };
