module.exports = {
    connect: function(io, PORT){
        console.log("Sockets connected");
        io.on('connection', (socket) => {
            // When a conn req comes in, output to the server console
            console.log(`User connection on port ${PORT} : ${socket.id}`);

            // When a message comes in, emit it back to all sockets with the message.
            socket.on('message', (message) => {
                io.emit('message', message);
            })
        })
    }
}