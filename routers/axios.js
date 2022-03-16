const axios = require('axios');

axios.get('https://api.nasa.gov/planetary/apod?api_key=YCx2VpWdtQgeSnRYat3pkBRBsMSRMjyg2jx3mhxh')
.then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
}).catch(error=>{
    console.log(error);
});


axios.all([
    axios.get('https://api.nasa.gov/planetary/apod?api_key=YCx2VpWdtQgeSnRYat3pkBRBsMSRMjyg2jx3mhxh&date=2017-08-03'),
    axios.get('https://api.nasa.gov/planetary/apod?api_key=YCx2VpWdtQgeSnRYat3pkBRBsMSRMjyg2jx3mhxh&date=2017-08-02')
  ]).then(axios.spread((response1, response2) => {
    console.log('all res1 : ' + response1.data.url);
    console.log('all res2 : ' + response2.data.url);
  })).catch(error => {
    console.log(error);
  });