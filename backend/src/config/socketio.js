import { Server } from "socket.io";
import jwt from "jsonwebtoken";

export const configureSocketIO = (server) => {
  const allowedOrigins = process.env.FRONTEND_URL;

  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Authentication required"));
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      socket.user = decoded;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected: " + socket.user?.name || socket.id);

    if (socket.user?.id) {
      socket.join(`user:${socket.user.id}`);
    }

    socket.on("join:conversation", (conversationId) => {
      socket.join(`conversation:${conversationId}`);
      console.log(`${socket.user?.name} joined conversation:${conversationId}`);
    });

    socket.on("leave:conversation", (conversationId) => {
      socket.leave(`conversation:${conversationId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected: " + socket.id);
    });
  });

  return { io };
};
