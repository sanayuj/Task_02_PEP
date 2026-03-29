// src/socket.js

import { io } from "socket.io-client";

const URL = "http://localhost:4000";

// Single socket instance
export const socket = io(URL, {
  autoConnect: false,
});