import http from 'http';

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('---RESPONSE---');
    console.log(data.substring(0, 1000));
    console.log('-------------');
    process.exit(0);
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
  process.exit(1);
});
