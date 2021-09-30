const express = require("express");
const fs = require("fs")
const https = require("https")
const path = require("path");

/*const key = fs.readFileSync("keys/75482240_192.168.43.115.key", "utf8")
const cert = fs.readFileSync("keys/75482240_192.168.43.115.cert", "utf8")
const creds = {
  key,
  cert
}*/

const app = express();

app.use(express.static("dist/material-hourcalculator"));
app.get('/hourcalculator/favicon.ico', () => {
  res.sendFile(path.resolve(__dirname, "favicon.ico"));
})

const routes = [
  "/hourcalculator",
  "/hourcalculator/auto",
  "/hourcalculator/pause"
];

const appGet = route => app.get(route, (_, res) => {
  res.sendFile(__dirname + "/dist/material-hourcalculator/index.html");
});

routes.forEach(appGet);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port: " + port);
})
/*const serv = https.createServer(creds, app)
serv.listen(443, "192.168.43.115")*/