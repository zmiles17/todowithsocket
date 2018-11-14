const users = {}


module.exports = function (io) {
    io.on("connection", function (socket) {
        //SOCKET ROUTES
        socket.on("new-message", function (data) {
            io.emit("emit-message", data);
        })

        // socket.on("new-name", function (data) {
        //     users[data.name] = socket;
        //     io.emit("emit-users", Object.keys(users));
        // })

        // socket.on("new-change", function(newData){
        //     const socket1 = users[newData.user1];
        //     const socket2 = users[newData.user2];
        //     socket1.emit("emit-message", newData);
        //     socket2.emit('emit-message', newData);
        // })
    })
}