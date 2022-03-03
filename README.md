# nodejs_helloworld

install nodemon :
> npm install -g nodemon

install mysql :
> npm install mysql

load required modules after git clone. lookup required modules from package-lock.json
> npm install

For error Nodemon Command Not Working Unauthorized Access
open the Windows PowerShell in Administration Mode
> Get-ExecutionPolicy and press Enter

> Set-ExecutionPolicy Unrestricted press Enter
> press y

docker cmd used :
> docker run -d -p 3306:3306 --name=mysql_con01 --env="MYSQL_ROOT_PASSWORD=abcd1234" mysql

login go mysql cli :
> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'abcd1234';
> FLUSH PRIVILEGES;

Node JS Environment Variables
> https://medium.com/geekculture/node-js-environment-variables-setting-node-app-for-multiple-environments-51351b51c7cd