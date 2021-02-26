const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

const embed = new Discord.MessageEmbed()
	.setTitle('Some Title')
	.setColor('#0099ff');

client.once('ready', async () => {
	const channel = client.channels.cache.get('token');
	try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.first();

		await webhook.send('Webhook test', {
			username: 'some-username',
			avatarURL: 'https://i.imgur.com/wSTFkRM.png',
			embeds: [embed],
		});
	} catch (error) {
		console.error('Error trying to send: ', error);
	}
});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

client.login('token');
