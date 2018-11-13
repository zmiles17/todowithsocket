const express = require("express");
const app = express();
const server = require("http").createServer(app);
// const io = require("socket.io")(server);
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

mongoose.Promise = Promise;  
mongoose.connect("mongodb://localhost/checklist", { useNewUrlParser: true });

// require("./sockets/checklist-sockets")(io);
require("./routes/api-routes")(app);

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})

