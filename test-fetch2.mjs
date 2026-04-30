import { exec } from 'child_process';
import http from 'http';

const child = exec('npm run dev');
child.stdout.on('data', console.log);
child.stderr.on('data', console.error);

setTimeout(() => {
  http.get('http://localhost:3000', (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('---RESPONSE---');
      console.log(data);
      console.log('-------------');
      process.exit(0);
    });
  }).on('error', (err) => {
    console.log('Error: ' + err.message);
    process.exit(1);
  });
}, 8000);
