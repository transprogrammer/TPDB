const Discord = require('discord.js');

const commands = require('./commands');
const config = require('./config/config.json');

const handleMemberLeave = require('./events/member-leave');
const handleMemberJoin = require('./events/member-join');
const handleMessage = require('./events/message');

const client = new Discord.Client();
client.commands = commands.loadCommands();

client.on('guildMemberAdd', (member) => handleMemberJoin(member, config.welcome));
client.on('guildMemberRemove', (member) => handleMemberLeave(member, config.leave));
client.on('message', (message) => handleMessage(message, config, client.commands, commands.handleCommand));
client.on('ready', () => client.user.setActivity(config.activity.name, { type: config.activity.type }));

client.on('error', (error) => console.log(error));
process.on('unhandledRejection', function (reason, p) {
  console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
});

client.login(config.token);
