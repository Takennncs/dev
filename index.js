const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const app = express();
const PORT = process.env.PORT || 3000;
const GUILD_ID = process.env.GUILD_ID;

client.once('ready', () => {
  console.log(`✅ Bot on aktiivne: ${client.user.tag}`);
});

// API endpoint: kontrollib, kas discordId on serveris
app.get('/check/:discordId', async (req, res) => {
  const discordId = req.params.discordId;
  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    const member = await guild.members.fetch(discordId);
    if (member) {
      res.json({ inServer: true });
    } else {
      res.json({ inServer: false });
    }
  } catch (err) {
    res.json({ inServer: false });
  }
});

app.get('/', (req, res) => {
  res.send('✅ Bot töötab.');
});

// Alusta Express serverit
app.listen(PORT, () => {
  console.log(`🌐 Veebiserver töötab: http://localhost:${PORT}`);
});

// Logi sisse Discordi
client.login(process.env.BOT_TOKEN);
