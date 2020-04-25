const express = require("express");
const next = require("next");
const httpProxy = require("http-proxy");
const dev = process.env.NODE_ENV.indexOf("development") == -1 ? true : false;
const compression = require("compression");
console.log(dev, "-----dev-------");
const app = next({ dev });
const handle = app.getRequestHandler();
// 新建一个代理 Proxy Server 对象
var proxy = httpProxy.createProxyServer({});
app.prepare().then(() => {
  const server = express();
  server.use(compression());
  //资源文件前缀解决 pc 和 手机 文件冲突
  server.get("/mobile*", (req, res) => {
    req.url = req.url.replace("/mobile", "");
    handle(req, res);
  });
  server.get("/antvip/ant-cgi/*", (req, res) => {
    console.log("client ip GET:" + req.url);

    //return proxy.web(req, res, { target: "http://114.116.119.166" });
    return proxy.web(req, res, { target: "http://47.94.248.148" });
  });

  server.post("/antvip/ant-cgi/*", (req, res) => {
    console.log("client ip POST:" + req.url);
    //return proxy.web(req, res, { target: "http://114.116.119.166" });
    return proxy.web(req, res, { target: "http://47.94.248.148" });
  });
  server.get("*", (req, res) => {
    return handle(req, res);
  });
  server.get("*", (req, res) => {
    if (req.cookies && req.cookies.jeesitesessionid) {
      res.cookie("jeesitesessionid", req.cookies.jeesitesessionid);
    }
    if (req.cookies && req.cookies.token) {
      res.cookie("token", req.cookies.token);
    }
    return handle(req, res);
  });
  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
