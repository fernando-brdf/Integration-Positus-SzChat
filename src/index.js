const express = require("express");
const routes = require("./routes");
const variables = require("./config/variables");
const app = express();

app.use(express.json());
app.use(routes);

app.listen(variables.port, () => {
    console.log("App start from port " + variables.port);
})
