const express = require('express');
const db = require('./core');

const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).send(
        {
            message: `Hello World from mysql index.js`
        }
    );
});

router.get('/select/top100',async (req,res) => {
    try{
        const results = await db.top100();
        res.status(200).json(results);
    }catch(e){
        res.status(501).send({message: e});
    }
});

router.get('/initialdb',async (req,res) => {
    try{
        const results = await db.dbinitial();
        res.status(200).json(results);
    }catch(e){
        res.status(500).send({message: e});
    }
});

router.get('/select/:id', async (req,res)=>{
    const {id} = req.params;
    try{
        const results = await db.select(id);
        res.status(200).json(results);
    }catch(e){
        res.status(500).send({message: e});
    }    
});

module.exports = router;