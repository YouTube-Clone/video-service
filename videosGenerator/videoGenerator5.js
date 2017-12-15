const { spawn } = require('child_process');

for (let i = 1601; i <= 2000; i += 1) {
  const size = Math.floor((Math.random() * 3) + 1);
  spawn('mkfile', [`${size}M`, `${i}.mp4`]);
}
