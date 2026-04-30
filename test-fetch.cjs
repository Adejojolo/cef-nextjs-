const http = require('http');

let attempts = 0;
function check() {
  attempts++;
  console.log(`Attempt ${attempts}`);
  const req = http.get('http://127.0.0.1:3000/', (res) => {
    console.log('Got response:', res.statusCode);
    res.resume();
    res.on('end', () => process.exit(0));
  }).on('error', (e) => {
    console.log('Error:', e.message);
  });
  req.end();
}

setInterval(check, 5000);
setTimeout(() => {
  console.log('Timeout');
  process.exit(1);
}, 60000);
