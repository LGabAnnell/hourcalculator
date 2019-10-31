const express = require("express");

const app = express();

app.use(express.static("dist/material-hourcalculator"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port: " + port);
});