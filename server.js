const express = require("express");
// const bodyParser = require("body-parser");

/*const key = fs.readFileSync("keys/75482240_192.168.43.115.key", "utf8")
const cert = fs.readFileSync("keys/75482240_192.168.43.115.cert", "utf8")
const creds = {
  key,
  cert
}*/

const app = express();

app.use("/hourcalculator/", express.static("dist/material-hourcalculator"));

const routes = [
  "/hourcalculator/auto",
  "/hourcalculator/pause",
  "/hourcalculator/rmeote"
];

const appGet = route => app.get(route, (_, res) => {
  res.sendFile(__dirname + "/dist/material-hourcalculator/index.html");
});

// app.use(bodyParser.json());

/* app.post('/hourcalculator/post-time', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
}); */

routes.forEach(appGet);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port: " + port);
})
/*const serv = https.createServer(creds, app)
serv.listen(443, "192.168.43.115")*/