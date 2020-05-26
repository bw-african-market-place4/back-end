const express = require("express");
const server = express();
const authRouter = require("../auth/auth-router.js");
const itemRouter = require("../items/items-router.js");
const usersRouter = require("../users/users-router.js");
const restricted = require("../auth/authenticate-middlware.js");

const helmet = require("helmet");
const cors = require("cors");


server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/items", restricted, itemRouter);
server.use("/api/users", restricted, usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "the API is up" });
});

module.exports = server;
