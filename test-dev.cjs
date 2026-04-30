const { spawn } = require('child_process');
const http = require('http');

console.log('Spawning next dev on 3001...');
const cp = spawn('npm', ['run', 'dev'], { 
  stdio: 'pipe',
  env: { ...process.env, PORT: '3001' }
});

cp.stdout.on('data', (data) => process.stdout.write('OUT: ' + data.toString()));
cp.stderr.on('data', (data) => process.stderr.write('ERR: ' + data.toString()));

let fetched = false;
setInterval(() => {
  if (fetched) return;
  console.log('Sending fetch request...');
  http.get('http://127.0.0.1:3000', (res) => {
    console.log('Status: ' + res.statusCode);
    res.resume();
    fetched = true;
    res.on('end', () => {
      console.log('Request ended');
    });
  }).on('error', (e) => {
  });
}, 2000);

setTimeout(() => {
  console.log('Script timeout');
  cp.kill();
  process.exit(1);
}, 60000);
