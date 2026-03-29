// socket.js

const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    // 📄 Join document room
    socket.on("join-document", (documentId) => {
      socket.join(documentId);
      console.log(`📄 Joined document: ${documentId}`);
    });

    // ✏️ Real-time changes
    socket.on("send-changes", ({ documentId, content }) => {
      socket.to(documentId).emit("receive-changes", content);
    });

    // 💾 Save document (optional)
    socket.on("save-document", async ({ documentId, content }) => {
      try {
        const Document = require("./models/Document");
        await Document.findByIdAndUpdate(documentId, { content });
      } catch (err) {
        console.log("Save error:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });

  return io;
};

// (Optional) access io anywhere
const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initSocket, getIO };