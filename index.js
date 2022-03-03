const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json()); // use middleware

app.use((req, res, next) => {
  console.log(`middleware got request from ${req.socket.remoteAddress}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,DELETE");
  next();
});
app.use('/visualpath', express.static('static'));


const lib = require("./lib");
const libdate = require("./date");
const liblog = require("./logtest-winston");
const config = require("./config");
const slackmsg = require('./slack');

const mysqlrouter = require("./mysql/index");

app.use('/api/mysqlrouter', mysqlrouter);

const miscrouter = require('./routers/misc');
app.use('/', miscrouter);

app.listen(port, () => {
  slackmsg.slackinfo.hostname = config.slack.hostname;
  slackmsg.slackinfo.path = config.slack.path;
  slackmsg.slacklog(`nodejs_helloworld listening on port :${port} ${libdate.getdisptimestamp()}`);

  console.log(`Example app on git. listening on port :${port} ${libdate.getdisptimestamp()}`);
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