import { Server } from "socket.io";

export const configureSocketIO = (server) => {
  const allowedOrigins = process.env.FRONTEND_URL;

  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected: " + socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected: " + socket.id);
    });
  });

  return { io };
};
