import { io, Socket } from "socket.io-client";
import { useAuth } from "@/store/data/auth";
import api from "@/api/client";

let socket: Socket | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;

export const getSocket = (): Socket | null => socket;

async function getValidToken(): Promise<string | null> {
  let token = useAuth.getState().token;
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000;
    if (Date.now() >= exp - 10000) {
      const refreshToken = useAuth.getState().refreshToken;
      if (refreshToken) {
        const { data } = await api.post("/auth/refresh", {
          refreshToken,
        });
        useAuth.getState().setToken(data.accessToken);
        useAuth.getState().setRefreshToken(data.refreshToken);
        token = data.accessToken;
      }
    }
  } catch {
    return token;
  }

  return token;
}

export const connectSocket = async () => {
  if (socket?.connected) return socket;

  const token = await getValidToken();
  if (!token) return null;

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
  }

  socket = io(API_BASE_URL, {
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  socket.on("connect", () => {
    console.log("Socket connected");
    reconnectAttempts = 0;
  });

  socket.on("connect_error", async (err) => {
    console.error("Socket connection error:", err.message);
    reconnectAttempts++;
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      const newToken = await getValidToken();
      if (newToken && socket) {
        socket.auth = { token: newToken };
        socket.connect();
        reconnectAttempts = 0;
      }
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
  reconnectAttempts = 0;
};

export const ensureSocketConnected = async (): Promise<Socket | null> => {
  const s = await connectSocket();
  if (!s) return null;
  if (s.connected) return s;

  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(null), 5000);
    s.once("connect", () => {
      clearTimeout(timeout);
      resolve(s);
    });
  });
};

export const joinConversation = async (conversationId: number) => {
  const s = await ensureSocketConnected();
  if (s) {
    s.emit("join:conversation", conversationId);
  }
};

export const leaveConversation = (conversationId: number) => {
  if (socket?.connected) {
    socket.emit("leave:conversation", conversationId);
  }
};
