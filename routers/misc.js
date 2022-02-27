const express = require('express');
const libdate = require("../date");
const config = require("../config");

const MiscRouter = express.Router();
module.exports = MiscRouter;

MiscRouter.get('/', (req, res, next) => {
    res.json('this is / of routers/misc.js');
    //res.status(200).json(process.env);
  });

MiscRouter.get('/:id/:action',(req,res)=>{
    //res.status(200).send('this is select id : '+req.params.id+ ' action : '+req.params.action);
  
    const queryparams = req.query; //eg /123/update?name=peter&age=33
  
    if(!Number.isInteger(Number(req.params.id)))
    {
        res.status('400').json('id need to be a number.');
    }

    const dtnow = libdate.getdisptimestamp();
    res.status(200).send({ 
      message:'this is /:id/:action',  
      id : req.params.id, 
      action:req.params.action, 
      timestamp:dtnow,
      query : queryparams,
      name : queryparams.name,
      age : queryparams.age,
    });
  });

  MiscRouter.post('/:id/post',(req,res)=>{
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