const { spawn } = require('child_process');

for (let i = 1201; i <= 1600; i += 1) {
  const size = Math.floor((Math.random() * 3) + 1);
  spawn('mkfile', [`${size}M`, `${i}.mp4`]);
}
