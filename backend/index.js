// require ('dotenv/config');
import "dotenv/config";
import express from "express";
import http from "http";

import { configureSocketIO } from "./src/config/socketio.js";
import { configureRoutes } from "./src/routes/index.js";
import DatabaseConnection from "./src/config/database.js";
import "./src/config/passport.js"; //Initialize Password strategies
import { configureMiddleware } from "./src/config/middleware.js";

const app = new express();
const server = http.createServer(app);

//Configure middlewaress
configureMiddleware(app);

//Configure routes
configureRoutes(app);

//Configure Socket.IO
const io = configureSocketIO(server);

// Connect with Database
DatabaseConnection();

//Start Server
const backendurl = process.env.BACKEND_URL || "Set up backend url in env";
const port = process.env.PORT;
const host = process.env.HOST;

server.listen(port, host, () => {
  console.log(`🚀 Bhetiyo API server running at ${backendurl}`);
});
