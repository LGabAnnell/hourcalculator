const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.static("dist/material-hourcalculator"));

app.listen(process.env.PORT || 3000, () => {

});