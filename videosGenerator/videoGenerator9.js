const { spawn } = require('child_process');

for (let i = 3201; i <= 3600; i += 1) {
  const size = Math.floor((Math.random() * 3) + 1);
  spawn('mkfile', [`${size}M`, `${i}.mp4`]);
}
