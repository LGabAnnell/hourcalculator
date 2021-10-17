const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use('/hourcalculator/api', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true
}));

app.use("/hourcalculator/", express.static("dist/material-hourcalculator"));

const routes = [
  "/hourcalculator/auto",
  "/hourcalculator/pause",
  "/hourcalculator/remote",
  "/hourcalculator/remote/login",
  "/hourcalculator/remote/register"
];

const appGet = route => app.get(route, (_, res) => {
  res.sendFile(__dirname + "/dist/material-hourcalculator/index.html");
});

routes.forEach(appGet);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port: " + port);
});