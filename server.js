const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require("path");
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

 
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/checklists', { useNewUrlParser: true });

require("./sockets/checklist-sockets")(io);
require("./routes/api-routes")(app);

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})

