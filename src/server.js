const express = require("express");
const path = require("path");
const route = require("./route.js");

const server = express();

server.set("view engine", "ejs");

server.use(express.static("public"));

server.set("views", path.join(__dirname, "views"));

server.use(express.urlencoded({ extended: true }));

server.use(route);

const port = process.env.PORT || 3000;

server.listen(port);
