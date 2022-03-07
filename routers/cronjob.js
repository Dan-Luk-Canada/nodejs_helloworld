const {CronJob } = require('cron');

console.log('log before job installation');

//job run at 0, 15th, 30th, 45th second
const job = new CronJob ('0,15,30,45 * * * * *',() => {
    console.log('cron is running : ', new Date());
})
console.log('log after job installation');

module.exports = {job};