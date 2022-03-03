const https = require('https')
let slackinfo = {};

let slacklog = async function (msg) {

  const data = JSON.stringify({ text: msg });

  const options = {
    hostname: slackinfo.hostname,
    port: 443,
    path: slackinfo.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const req = await https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()
}

module.exports = { slackinfo, slacklog };