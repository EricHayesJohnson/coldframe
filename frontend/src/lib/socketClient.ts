import { io } from "socket.io-client";

// Singleton socket instance for the whole app
export const socket = io("http://localhost:4000"); // backend dev server
