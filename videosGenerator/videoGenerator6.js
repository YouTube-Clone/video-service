const { spawn } = require('child_process');

for (let i = 2001; i <= 2400; i += 1) {
  const size = Math.floor((Math.random() * 3) + 1);
  spawn('mkfile', [`${size}M`, `${i}.mp4`]);
}
