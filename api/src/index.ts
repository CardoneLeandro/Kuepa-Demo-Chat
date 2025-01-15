import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectDB from "./config/db.config";
import { PORT } from "./config/var.config";
import userRouters from "./routes/user.routes";
import messageRouter from "./routes/message.routes";
import { saveMessage } from "./services/message.service";

connectDB();
const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRouters);
app.use("/messages", messageRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("send_message", async (data) => {
    io.emit("receive_message", data);
    await saveMessage({
      userId: data.user.userId,
      userName: data.user.userName,
      role: data.user.role,
      content: data.content,
    });
  });
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
