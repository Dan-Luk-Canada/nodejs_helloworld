const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json()); // use middleware

app.use((req,res,next)=>{
  console.log(`middleware got request from ${req.socket.remoteAddress}`);
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,DELETE");
  next();
});
app.use('/visualpath', express.static('static'));


const lib = require("./lib");
const libdate = require("./date");
const liblog = require("./logtest-winston");
const config = require("./config");

const mysqlrouter = require("./mysql/index");
app.use('/api/mysqlrouter', mysqlrouter);

app.get('/', (req, res) => {
  /*
  res.status(200).send({ 
    message: process.env,
    timestamp: libdate.getdisptimestamp()
  });
  */
  res.status(200).json(process.env);
})

app.get('/:id/:action',(req,res)=>{
  //res.status(200).send('this is select id : '+req.params.id+ ' action : '+req.params.action);
  const dtnow = libdate.getdisptimestamp();
  res.status(200).send({ 
    message:'this is /:id/:action',  
    id : req.params.id, 
    action:req.params.action, 
    timestamp:dtnow 
  });
})

app.post('/:id/post',(req,res)=>{
  const dtnow = libdate.getdisptimestamp();
  const {id} = req.params;
  const {logo} = req.body;
  const {color} = req.body;

  if(!logo){
    res.status(418).send({ message:'we need a logo', timestamp :dtnow});

  }

  res.status(200).send({
    message: `I got logo ${logo} with assigned id ${id}`,
    color : `selected color is ${color}`,
    timestamp: dtnow

  });


});

app.listen(port, () => {
  console.log(`Example app on git. listening on port :${port} ${libdate.getdisptimestamp()}`);
  //const lib = require("./lib");
  //const result = lib.add(4, 4);
  //console.log(result);
  //console.log('while num is : '+lib.num);
  //console.log('mirror hello world : '+lib.reverseString('hello world'));
  liblog.log_info(`Example app listening on port :${port} ${libdate.getdisptimestamp()}`);
  //liblog.log_error('error log pinged at '+libdate.getdisptimestamp());

  //console.log(process.env);
  //const PORT = process.env.PORT || 3000;
  //console.log(`Server is listening on port ${PORT}`);
  //console.log(config.mysql.password);
})