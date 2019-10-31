const express = require("express");

const app = express();

app.use(express.static("dist/material-hourcalculator"));

const routes = [
    "/",
    "/auto",
    "/pause"
];

const appGet = route => app.get(route, (_, res) => {
    res.sendFile(__dirname + "/dist/material-hourcalculator/index.html");
});

routes.forEach(appGet);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port: " + port);
});