import { exec } from 'child_process';

const child = exec('npm run dev');
child.stdout.on('data', console.log);
child.stderr.on('data', console.error);

setTimeout(() => {
  console.log("Shutting down");
  process.exit(0);
}, 10000);
