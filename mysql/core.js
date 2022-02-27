const mysql = require('mysql');
const config = require("../config");
let mysqldbaccess = {};

//db_pool = mysql.createConnection(db); // pls refer to createConnection vs createPool
const pool = mysql.createPool({
    connectionLimit : config.mysql.connectionlimit,
    host: config.mysql.host,
    port: config.mysql.port,
    password : config.mysql.password,
    user: config.mysql.username,
    //database: config.mysql.database //this doesn't work with create DB
});

mysqldbaccess.top100 = () => {
    return new Promise((resolve,reject)=>{
        pool.query(`select * from cookiejar.favors limit 100`,(err,results) => {
            if(err){
                console.log(err);
                return reject(err);
            }
            return resolve(results);
        })
    });
};

mysqldbaccess.select = (id) => {
    return new Promise((resolve,reject)=>{
        pool.query(`select * from cookiejar.favors where id = ?`, id, (err,results) => {
            if(err){
                console.log(err);
                return reject(err);
            }
            return resolve(results[0]);
        })
    });
};

mysqldbaccess.dbinitial = () => {
    return new Promise((resolve,reject)=>{
        pool.query(`create database cookiejar`,(err,results) => {
            /*
            if(err){
                console.log('err from create db');
                return reject(err);
            }
            */
        });
        pool.query(`create table cookiejar.favors (id int NOT NULL AUTO_INCREMENT, name varchar(50), PRIMARY KEY (id) )`,(err,results) => {
            /*
            if(err){
                console.log('err from create table');
                return reject(err);
            }*/
        });
        pool.query(`insert into cookiejar.favors (name) values ('milk'),('chocolate'),('coffee'),('apple'),('banana'),('birthday')`,(err,results) => {});
        return resolve('db and table created');
    });
};

module.exports = {mysqldbaccess};