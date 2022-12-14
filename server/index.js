const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io')

app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{ origin:"http://localhost:3000", 
    methods: ["GET", "POST"]
}
})

io.on("connect", (socket) => {
    console.log(socket.id);

    socket.on("join_room", (room =>{
        socket.join(room);
        console.log(`user ${socket.id} joined room ${room}`)
    }))

    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.room).emit("receive_msg", data)
    })
    socket.on("disconnect", ()=> {
        console.log(`${socket.id} has left`)
    })
})



server.listen(3001, () => {
    console.log ("server running on port 3001")
})