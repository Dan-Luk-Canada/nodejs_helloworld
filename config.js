const config = {};
config.mysql = {};

config.mysql.username = process.env.mysql_user || 'root';
config.mysql.password = process.env.mysql_password || 'abcd1234';
config.mysql.host = process.env.mysql_host || 'localhost';
config.mysql.port = process.env.mysql_port || '3306';
config.mysql.database = process.env.mysql_database || 'cookiejar';
config.mysql.connectionlimit = process.env.mysql_connectionlimit || '10';

module.exports = config;