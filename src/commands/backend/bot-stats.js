const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-stats1')
        .setDescription('Replies latency and response time(s) of WentzyBot'),
    async execute(interaction) {

     const embed1 = new EmbedBuilder()
    .setTitle('***Pinging. . . ***')
    .setColor('Red');

    const sent = await interaction.reply({ embeds: [embed1], fetchReply: true });

    const embed2 = new EmbedBuilder()
    .setTitle('**Bot stats**')
    .setDescription(`
*Uptime:* ${Math.round(interaction.client.uptime / 60000)} **minutes**

*Connection latency:* ${interaction.client.ws.ping} **ms**

*Roundtrip latency:* ${sent.createdTimestamp - interaction.createdTimestamp} **ms**`)
.setFooter({ text: 'Created by freewentzy'})
.setTimestamp()
.setColor('Blue');

        await interaction.editReply({ embeds: [embed2]});
    },
};