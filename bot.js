const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: process.env.MC_HOST,
  port: parseInt(process.env.MC_PORT) || 25565,
  username: process.env.MC_USERNAME || 'GUARDIAN',
  version: false // Auto-detect kar lega server ka version
});

bot.on('spawn', () => {
  console.log("🔥 Bot successfully server ke andar spawn ho gaya hai!");
  
  // Real player ki tarah movement loop
  setInterval(() => {
    const actions = ['forward', 'back', 'left', 'right'];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    
    bot.setControlState(randomAction, true);
    setTimeout(() => {
      bot.setControlState(randomAction, false);
    }, 1500);

    if (Math.random() > 0.5) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }

    const yaw = Math.random() * Math.PI * 2;
    const pitch = (Math.random() * Math.PI) - (Math.PI / 2);
    bot.look(yaw, pitch, true);

  }, 10000);
});

bot.on('kicked', (reason) => {
  console.log(`❌ Bot kick ho gaya: ${reason}`);
});

bot.on('error', (err) => {
  console.log(`⚠️ Connection Error: ${err}`);
});
