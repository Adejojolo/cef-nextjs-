import { exec } from 'child_process';
import http from 'http';

const child = exec('npm run dev');
// child.stdout.on('data', d => console.log('DEV:', d));
child.stderr.on('data', d => console.log('DEV-ERR:', d));

setTimeout(() => {
  http.get('http://127.0.0.1:3000', (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('---RESPONSE---');
      console.log(data.substring(0, 500));
      process.exit(0);
    });
  }).on('error', (err) => {
    console.log('Error: ' + err.message);
    process.exit(1);
  });
}, 5000);
