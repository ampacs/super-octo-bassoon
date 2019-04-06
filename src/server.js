var express = require('express');
var app = express();
var server = require('http').Server(app);

//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile('index.html');
    //res.sendFile(__dirname + '/index.html');
    //res.sendFile(__dirname + '/game.js');
});

server.listen(8081, function () {
   console.log(`Listening on ${server.address().port}`);
});

/*
express = require("express");
path = require("path");
//import * as path from "path";

const app = express();
app.set("port", process.env.PORT || 9001);

let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./dist/client/index.html"));
})

io.on("connection", function(socket) {
    console.log("Client connected!");
    socket.on("msg", function(msg) {
      console.log(msg);
    })
})

http.listen(9001, function() {
    console.log("listening on *:9001");
})*/
