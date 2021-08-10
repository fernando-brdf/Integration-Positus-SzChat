const express = require("express");
const messageController = require("./controllers/message");

const routes = express.Router();

routes.get("/", (req, res) => {
    console.log("start rota!");

    return res.json({ "status": "ok" })
})


routes.post("/receive/positus", messageController.receivePositus);
routes.post("/receive/sz", messageController.receiveSzChat);


module.exports = routes;