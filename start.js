const { spawn } = require('child_process');

const env = { ...process.env, NODE_OPTIONS: '--openssl-legacy-provider' };

const child = spawn('react-scripts', ['start'], { env, stdio: 'inherit' });

child.on('close', (code) => {
  process.exit(code);
});
