const express = require('express');
var helmet = require('helmet');
const app = express();
const port = process.env.PORT || 3000;

const log = (arg) => console.log(arg)

app.use(express.json()); // use middleware

app.use((req, res, next) => {
  console.log(`middleware got request from ${req.socket.remoteAddress}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,DELETE");
  next();
});
app.use('/visualpath', express.static('static'));
app.use('/http_temp_server', express.static('http_temp_server'));
app.use(helmet());

const lib = require("./lib");
const libdate = require("./date");
const liblog = require("./logtest-winston");
const config = require("./config");
const slackmsg = require('./slack');
const { job } = require('./routers/cronjob');
job.start();

const mysqlrouter = require("./mysql/index");

app.use('/api/mysqlrouter', mysqlrouter);

const miscrouter = require('./routers/misc');
app.use('/', miscrouter);

//https://medium.com/@furkandursun947/creating-a-web-server-with-node-js-using-http-module-and-logging-the-requests-76e9b60323ba
app.listen(port, (req,res) => {
  slackmsg.slackinfo.hostname = config.slack.hostname;
  slackmsg.slackinfo.path = config.slack.path;
  slackmsg.slacklog(`nodejs_helloworld listening on port :${port} ${libdate.getdisptimestamp()}`);

  log(`Example app on git. listening on port :${port} ${libdate.getdisptimestamp()}`);
  //const lib = require("./lib");
  //const result = lib.add(4, 4);
  //console.log(result);
  //console.log('while num is : '+lib.num);
  //console.log('mirror hello world : '+lib.reverseString('hello world'));
  liblog.log_info(`nodejs_helloworld on port :${port} ${libdate.getdisptimestamp()}`);
  //liblog.log_error('error log pinged at '+libdate.getdisptimestamp());

  //console.log(process.env);
  //const PORT = process.env.PORT || 3000;
  //console.log(`Server is listening on port ${PORT}`);
  //console.log(config.mysql.password);


})