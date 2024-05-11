const { SlashCommandBuilder } = require ('@discordjs/builders');
const { PermissionsBitField, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('paymentchange-message')
    .setDescription('use this message to post payment change message in the server')
    .setDMPermission(false),
    async execute(interaction, client){

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Change Payment methods')
            .setCustomId('changepaymentmethods')
            .setStyle(ButtonStyle.Primary),
        )

        const embed = new EmbedBuilder()
        .setColor('#000000')
        .setTitle("**Change your Payment details**")
        .setDescription(`Please Click below to update your Payment details`)
        .setTimestamp()
        .setFooter({ text: 'Created by freewentzy' });
        
        await interaction.reply({ content: "***Sent successfuly***", ephemeral: true})
        await interaction.guild.channels.cache.get('1190178678508884068').send({ embeds: [embed], components: [button]});
    },
};