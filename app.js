const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const artiklar = require('./routes/artiklar')
const auth = require('./routes/auth')
const port = process.env.PORT || 8080;
const dbHandler = require("./models/dbmong");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// Add a route
app.get("/", (req, res) => {
    const data = {
        data: {
            msg: "kolla kolla"
        }
    };

    res.json(data);
});

app.use("/artiklar", artiklar)
app.use("/auth", auth);

const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

io.sockets.on('connection', function(socket) {
    socket.on("create", (data) => {
        socket.join(data[0]);
        socket.to(data[0]).emit("doc", data[1]);
    })
});

// Start up server
const server = httpServer.listen(port, () => {
    console.log('listening on port ' + port);
});

module.exports = server;