const { spawn } = require('child_process');

for (let i = 2801; i <= 3200; i += 1) {
  const size = Math.floor((Math.random() * 3) + 1);
  spawn('mkfile', [`${size}M`, `${i}.mp4`]);
}
