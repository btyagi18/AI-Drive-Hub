const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { initSockets } = require("./sockets");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://new_bhumi20:FBkJZt72ispYHsYT@cluster0.eid6bdv.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const server = http.createServer(app);

// Initialize sockets
initSockets(server);

app.get("/", (req, res) => {
    res.send("Ride System Backend Running");
});

server.listen(3000, () => console.log("Server running on 3000"));
