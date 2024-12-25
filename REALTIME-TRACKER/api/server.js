const cors = require("cors");
const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const PORT = 4000;

app.use(cors({origin:"*"}));
app.set("views", path.join(__dirname, "../views")); 
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));

const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("recive-location", { id: socket.id, ...data });
    });
    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id);
    });
});


app.get("/", (req, res) => {
    res.render("index");
});

server.listen(PORT, () => console.log(`Server is Started At PORT: ${PORT}`));